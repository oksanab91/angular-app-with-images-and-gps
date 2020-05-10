import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Person, GpsCoordinate, Address, PersonMapped } from '@models/models';
import { GpsCoordinateService } from './gps-coordinate.service';
import { mergeMap, toArray, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private headers: HttpHeaders;
  
  constructor(private http: HttpClient, private gpsService: GpsCoordinateService) {    
  }  

  setPerson(personMapped: PersonMapped, gps: GpsCoordinate): Person {
    const url = `https://www.google.com/maps/search/?api=1&query=${gps.lat},${gps.lon}`;                
    const person: Person = {...personMapped.person, gpsCoordinate: gps, googleMapUrl: url };    
  
    return person;
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
  //=================================================
  
  //============ mapping & formatting ===============
  mapPerson(item: Person): PersonMapped {    
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

  mapPersonList(data: Observable<Person[]>): Observable<Person[]> {
    const dataMapped = data.pipe(mergeMap(item => { return item.map(item => { return this.mapPerson(item) }) }),      
        toArray());

    const listData = dataMapped.pipe( mergeMap(item => { return from(item) } ));

    const observableFull = listData.pipe( 
    mergeMap((item: PersonMapped) => {
        return item.callGps.call(item.person.address).pipe(
        map((gps: GpsCoordinate) => { return this.setPerson(item, gps) })
        )        
    })
    ,toArray<Person>()    
    );

    return observableFull;    
  }

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
  index(): Observable<Person[]> {
    const url = "../../assets/people.json";
    return this.http.get<Person[]>(url);        
  }

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
