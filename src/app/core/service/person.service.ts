import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { Person, GpsCoordinate, PersonMapped, Address } from '@models/models';
import { map, catchError, concatMap,  mergeMap,  toArray, shareReplay, take } from 'rxjs/operators';
import { GpsCoordinateService } from './gps-coordinate.service';
// import { Address } from '../../models/address';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private observablePersonListCache: Observable<Person[]>; //without gps filled
  private personListCache: Person[] = [];  //without gps filled
  private observablePersonListFullCache: Observable<Person[]>; //with gps filled, to display on Person List page
  private personListFullCache: Person[] = [];  //with gps filled
  private subject = new BehaviorSubject(this.personListFullCache);  
  sharedPersonList = this.subject.asObservable();
  
  private headers: HttpHeaders;
  
  constructor(private http: HttpClient, private gpsService: GpsCoordinateService) {    
    this.getSubject();    
  }
  
  public getSubject() {    
    this.personListFull.pipe(take(1)).subscribe(items => this.subject.next(items));      
  }

  public search(filter: string): Observable<Person[]> {    
    if (!filter.trim()) this.subject.next([]);

    return this.personListFull.pipe(
      map(items => {       
        const rx = new RegExp(filter, 'i');
        const filtered = items.filter(item => { return rx.test(item.name) });
        this.subject.next(filtered);
        return filtered;
      })      
    );        
  }

  get personListFull() {
    // Data available
    if (this.personListFullCache.length > 0) return of(this.personListFullCache);
    // Request pending
    else if (this.observablePersonListFullCache) return this.observablePersonListFullCache;
    // New request needed
    else this.observablePersonListFullCache = this.fetchFull();   

    return this.observablePersonListFullCache;
  }

  get personList() {
    if (this.personListCache.length > 0) return of(this.personListCache);
    else if (this.observablePersonListCache) return this.observablePersonListCache;
    else this.observablePersonListCache = this.fetch();

    return this.observablePersonListCache;  
  }  

  fetch(): Observable<Person[]> {
    const url = "../../assets/people.json";    

    return this.http.get<Person[]>(url)
    .pipe(map(data => { 
        return this.mapCachedPersonList(data);
       }),      
      catchError(error => {
        alert('No data to display'); 
        return of(null)}),
      shareReplay(10)
    );    
  }

  fetchFull(): Observable<Person[]> {    
    return this.getFull().pipe(
      map(items => { return this.mapCachedPersonListFull(items) })
      ,shareReplay(10) // for subscribing to the same observable by many components
    );
  }  

  getFull(): Observable<Person[]> {
    const data = this.mapPersonList();

    const listData = data.pipe( mergeMap(item => { return from(item); } ));

    this.observablePersonListFullCache = listData.pipe( 
      mergeMap((item: PersonMapped) => {
        return item.callGps.call(item.person.address).pipe(
          map((gps: GpsCoordinate) => { return this.set(item, gps) })
        )        
      })
      ,toArray<Person>()    
    );
   
    return this.observablePersonListFullCache;    
  }
 
  get(id: number): Observable<Person> {
    if (id < 0) return null;

    return this.personListFull.pipe(
      map(data => { return data.find(item => item.id == id) }));    
  }

  set(personMapped: PersonMapped, gps: GpsCoordinate): Person {
    const url = `https://www.google.com/maps/search/?api=1&query=${gps.lat},${gps.lng}`;                
    const person: Person = {...personMapped.person, gpsCoordinate: gps, googleMapUrl: url };    
  
    return person;
  }

  update(person: Person): Observable<Person>{    
    let personId = 11;
    if (person.id) personId = person.id;
    else personId = this.personListFullCache.length > 0 ? Math.max(...this.personListFullCache.map(item => item.id)) + 1 : personId;    

    let updated: Person = { ...person, id: personId, gpsCoordinate: new GpsCoordinate(), googleMapUrl: "" };
    let mapped =  this.mapPerson(updated);
   
    let ind = this.personListFullCache.findIndex(item => item.id == personId);

    return mapped.callGps.call(mapped.person.address).pipe(
      map((gps: GpsCoordinate) => { 
        updated = this.set(mapped, gps);

        if(ind >= 0) this.personListFullCache[ind] = updated;
        else this.personListFullCache = [...this.personListFullCache,  updated];

        this.getSubject();
        return updated;
      }
    ));
  
  }

  remove(id: number){
    if(this.personListFullCache.findIndex(h => h.id === id) < 0) return null;

    this.personListFullCache = this.personListFullCache.filter(h => h.id !== id);
    this.getSubject();
    return id;
  }

  buildShortAddress(address: Address) {
    if(!address || !address.street) return '';
    
    let shortAddress = '';
    shortAddress = (address.street !== '' ? `${address.street}` : '');
    shortAddress += (address.city && address.city !== '' ? `, ${address.city}` : '');    
    shortAddress += (address.state && address.state !== '' ? `, ${address.state}` : '');
    shortAddress += (address.country && address.country !== '' ? `, ${address.country}` : '');
    shortAddress += (address.postalcode && address.postalcode !== '' ? ` ${address.postalcode}` : '');

    return shortAddress;
  }

  // ============== http calls ===========
  add(payload) {
    const url = "../../assets/people.json";
    return this.http.post(url, payload, {headers: this.headers});
  }

  delete(payload) {
    const url = "../../assets/people.json";
    return this.http.delete(url + '/' + payload.id, {headers: this.headers});
  }

  save(payload) {
    const url = "../../assets/people.json";
    return this.http.put(url + '/' + payload.id, payload, {headers: this.headers});
  }
  // =========================

  private mapCachedPersonListFull(list: Person[]) {
    this.observablePersonListFullCache = null;
    this.personListFullCache = [...list];
        
    return this.personListFullCache;
  }

  private mapCachedPersonList(list: Person[]) {
    this.observablePersonListCache = null;
    this.personListCache = [...list];
        
    return this.personListCache;
  }
  
  private mapPerson(item: Person) {    
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

  private formatAddress(person: Person) {
    let formated = '';    
    formated = (person.address.street !== '' ? `${this.formatAddressField(person.address.street)}` : '');
    formated += (person.address.city !== '' ? `+${this.formatAddressField(person.address.city)}` : '');    
    formated += (person.address.state !== '' ? `+${person.address.state}` : '');
    formated += (person.address.country !== '' ? `+${this.formatAddressField(person.address.country)}` : '');

    return formated;
  }

  private formatAddressField(field: string) {
    return field.replace(/,/g, ',+').replace(/\s/g, '+');
  }

  private mapPersonList(): Observable<PersonMapped[]> {    
    const data = this.personList;

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

}
