import { Person, GpsCoordinate } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { PersonService } from './person.service';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private listShort: Person[] = [];  //without gps filled  
    private listFull: Person[] = [];   //with gps filled
 

    constructor(private personService: PersonService) {        
        // this.fetchAll();    
    }

    //============== mutators ===============
    findIndex(id: number): number {
        if(!id) return -1;
        return this.listFull.findIndex(item => item.id == id);
    }

    get(id: number): Person {
        if (id < 0) return null;        
        return this.listFull.find(item => item.id == id);       
    }

    add(person: Person): Observable<Person> {    
        const personId = this.listFull.length > 0 ? Math.max(...this.listFull.map(item => item.id)) + 1 : 11;    
    
        let added: Person = { ...person, id: personId, gpsCoordinate: new GpsCoordinate(), googleMapUrl: "" };
        const mapped =  this.personService.mapPerson(added);
       
        return mapped.callGps.call(mapped.person.address).pipe(
          map((gps: GpsCoordinate) => {
            added = this.personService.setPerson(mapped, gps);
            this.listFull = [...this.listFull, added];

            return added;
          }
          ),
          catchError(error => { return of(null) })
        );
    }

    update(person: Person): Observable<Person>{
        if(!person.id) return;
        
        let updated: Person = { ...person, gpsCoordinate: new GpsCoordinate(), googleMapUrl: '' };
        const mapped =  this.personService.mapPerson(updated);  
        const ind = this.findIndex(person.id);
        
        return mapped.callGps.call(mapped.person.address).pipe(
            map((gps: GpsCoordinate) => {
                updated = this.personService.setPerson(mapped, gps);                
                this.updateList(ind, updated);
                
                return updated;
            }
            ),
            catchError(error => { return of(null) })
        );    
    }

    search(filter: string): Observable<Person[]> {        
        this.resetAll();
                
        return this.personListFull.pipe(
            map(items => {       
            const rx = new RegExp(filter, 'i');
            const filtered = items.filter(item => { return rx.test(item.name) });
            
            this.listFull = [...filtered];            
            return filtered;
            })      
        );        
    }
    //==================================

    //============ list data ===========
    async fetchAll() {
        this.listFull = await this.personListFull.toPromise();
    }

    resetAll() {
        this.listShort = [];
        this.listFull = [];
        this.fetchAll();
    }

    load(): Observable<Person[]> {
        return this.personListFull;
    }

    fetch(): Observable<Person[]> {
        return this.personService.index().pipe(map(data => { 
            return this.listShort = [...data];
            }),      
            catchError(error => {
                alert('No data to display'); 
                return of(null)}),
            shareReplay(10)
        );    
    }  

    fetchFull(): Observable<Person[]> {
        const data = this.personListShort;

        return this.personService.mapPersonList(data).pipe(
            map(items => {
                this.listFull = [...items];                
                return this.listFull; 
            }),
            shareReplay(10) // for subscribing to the same observable by many components
        );
    }
    //=================================
    
    private updateList(ind: number, item: Person) {
        this.listFull[ind] = item;
        this.listFull = [...this.listFull];
    }
    
    private get personListFull(): Observable<Person[]> {        
        if (this.listFull.length > 0) return of(this.listFull);
        return this.fetchFull();
    }

    private get personListShort() {
        if (this.listShort.length > 0) return of(this.listShort);
        return this.fetch();  
    }    
  
}