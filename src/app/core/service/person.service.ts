import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { Person, GpsCoordinate, Address, Alert } from '@models/models';
import { map, catchError, concatMap,  mergeMap,  toArray, shareReplay } from 'rxjs/operators';
import { GpsCoordinateService } from './gps-coordinate.service';


class PersonMapped
{
    person: Person;
    callGps: () => Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {  
  private personListShortCache: Person[] = [];  //without gps filled  
  private personListFullCache: Person[] = [];  //with gps filled
  private readonly subject = new BehaviorSubject(this.personListFullCache);
  readonly sharedPersonList$ = this.subject.asObservable();
  
  private headers: HttpHeaders;
  
  constructor(private http: HttpClient, private gpsService: GpsCoordinateService) {
    this.fetchAll();    
  }  

  public search(filter: string) {    
    if (!filter.trim()) this.sharedList = [];

    return this.personListFull.pipe(
      map(items => {       
        const rx = new RegExp(filter, 'i');
        const filtered = items.filter(item => { return rx.test(item.name) });
        this.sharedList = [...filtered];
        return filtered;
      })      
    );        
  }

  async fetchAll() {
    this.sharedList = await this.personListFull.toPromise();
  }

  // the getter will return the last value emitted in the subject (sharedPersonList)
  get sharedList(): Person[] {
    return this.subject.getValue();
  }

  // assigning a value to this.subject will push it onto the observable 
  // and down to all of its subsribers
  set sharedList(val: Person[]) {
    this.subject.next(val);
  }

  //=================================
  private addToList(person: Person) {
    this.sharedList = [
      ...this.sharedList, 
      person
    ];
  }

  private removeFromList(id: number) {
    this.sharedList = this.sharedList.filter(item => item.id !== id);
  }

  private updateList(ind: number, item: Person) {
    this.sharedList[ind] = item;
    this.sharedList = [...this.sharedList];
  }
  //=================================


  //============ list data ===========
  get personListFull(): Observable<Person[]> {    
    if (this.personListFullCache.length > 0) return of(this.personListFullCache);
    return this.fetchFull();
  }

  get personListShort() {
    if (this.personListShortCache.length > 0) return of(this.personListShortCache);
    return this.fetch();  
  }  

  fetch(): Observable<Person[]> {
    const url = "../../assets/people.json";    

    return this.http.get<Person[]>(url)
    .pipe(map(data => { 
        return this.personListShortCache = [...data];
       }),      
      catchError(error => {
        alert('No data to display'); 
        return of(null)}),
      shareReplay(10)
    );    
  }

  fetchFull(): Observable<Person[]> {    
    return this.getFull().pipe(
      map(items => { return this.personListFullCache = [...items]; })
      ,shareReplay(10) // for subscribing to the same observable by many components
    );
  }  

  getFull(): Observable<Person[]> {
    const data = this.mapPersonList();
    const listData = data.pipe( mergeMap(item => { return from(item); } ));

    const observableFull = listData.pipe( 
      mergeMap((item: PersonMapped) => {
        return item.callGps.call(item.person.address).pipe(
          map((gps: GpsCoordinate) => { return this.set(item, gps) })
        )        
      })
      ,toArray<Person>()    
    );
   
    return observableFull;    
  } 
  //=================================

  //============ per item ===========
  get(id: number): Person {
    if (id < 0) return null;
    return this.sharedList.find(item => item.id == id);       
  }

  findIndex(id: number): number {
    if(!id) return -1; //??
    return this.sharedList.findIndex(item => item.id == id);
  }

  set(personMapped: PersonMapped, gps: GpsCoordinate): Person {
    const url = `https://www.google.com/maps/search/?api=1&query=${gps.lat},${gps.lng}`;                
    const person: Person = {...personMapped.person, gpsCoordinate: gps, googleMapUrl: url };    
  
    return person;
  }

  add(person: Person): Observable<Alert> {    
    const personId = this.sharedList.length > 0 ? Math.max(...this.sharedList.map(item => item.id)) + 1 : 11;    

    let added: Person = { ...person, id: personId, gpsCoordinate: new GpsCoordinate(), googleMapUrl: "" };
    const mapped =  this.mapPerson(added);
   
    return mapped.callGps.call(mapped.person.address).pipe(
      map((gps: GpsCoordinate) => {
        added = this.set(mapped, gps);
        this.addToList(added);
        // this.sharedList = [...this.sharedList,  added];        
        return {type: 'success', message: `Thank you for adding ${added.name}`};
      }
      ),
      catchError(error => { return of({type: 'danger', message: `Error adding`}) })
    );   
  
  }

  update(person: Person): Observable<Alert>{   
    if(!person.id) return;
    
    const updated: Person = { ...person, gpsCoordinate: new GpsCoordinate(), googleMapUrl: "" };
    const mapped =  this.mapPerson(updated);  
    const ind = this.findIndex(person.id);

    return mapped.callGps.call(mapped.person.address).pipe(
      map((gps: GpsCoordinate) => {
        this.updateList(ind, this.set(mapped, gps));
        return {type: 'success', message: `Thank you for updating ${updated.name}`};
      }
      ),
      catchError(error => { return of({type: 'danger', message: `Error updating`}) })
    );
    
  }

  remove(id: number, name: string): Alert{
    if(this.findIndex(id) < 0) return {type: 'danger', message: `error deleting ${name}`};

    this.removeFromList(id);
    return {type: 'warning', message: `${name} deleted successfully`};
  }  

  buildShortAddress(address: Address): string {
    if(!address || !address.street) return '';
    
    let shortAddress = '';
    shortAddress = (address.street !== '' ? `${address.street}` : '');
    shortAddress += (address.city && address.city !== '' ? `, ${address.city}` : '');    
    shortAddress += (address.state && address.state !== '' ? `, ${address.state}` : '');
    shortAddress += (address.country && address.country !== '' ? `, ${address.country}` : '');
    shortAddress += (address.postalcode && address.postalcode !== '' ? ` ${address.postalcode}` : '');

    return shortAddress;
  }
  //=================================
  
  //============= mapping ====================
  private mapPerson(item: Person): PersonMapped {    
    if(!item) return null;
  
    const shortAddress = item.shortAddress || this.buildShortAddress(item.address);    
    const addressFormated = this.formatAddress(item);
    const picture = {...item.picture};
    if(!picture.url.includes('/')) picture.url = `assets/${item.picture.url}`;
    
    return {
      person:  { ...item, shortAddress: shortAddress, picture: picture },
      callGps: () => { return this.gpsService.getGps(addressFormated); }
    };    
  }  

  private mapPersonList(): Observable<PersonMapped[]> {    
    const data = this.personListShort;

    const dataMapped = data.pipe(
      concatMap(item => {
        return from(item).pipe(
          map(i => { return this.mapPerson(i) })                          
        ) 
      }),      
      toArray()      
    )

    return dataMapped;
  }
  //=================================

  private formatAddress(person: Person): string {
    let formated = '';    
    formated = (person.address.street !== '' ? `${this.formatAddressField(person.address.street)}` : '');
    formated += (person.address.city !== '' ? `+${this.formatAddressField(person.address.city)}` : '');    
    formated += (person.address.state !== '' ? `+${person.address.state}` : '');
    formated += (person.address.country !== '' ? `+${this.formatAddressField(person.address.country)}` : '');

    return formated;
  }

  private formatAddressField(field: string): string {
    return field.replace(/,/g, ',+').replace(/\s/g, '+');
  }

  // ============== http calls ===========
  // add(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.post(url, payload, {headers: this.headers});
  // }

  // delete(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.delete(url + '/' + payload.id, {headers: this.headers});
  // }

  // save(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.put(url + '/' + payload.id, payload, {headers: this.headers});
  // }
  // =========================  

}
