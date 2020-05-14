import { Injectable } from '@angular/core';
import { City, FlightFilter, Flight, IFlights, Iata } from '@models/models';
import { ApiFlightWidgetService } from './api-flight-widget.service';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WidgetStoreService {
  private cities: City[] = [];
  private iata: Iata[] = [];
  private cities$: Observable<City[]> = null;
  private iata$: Observable<Iata[]> = null;

  constructor(private widgetService: ApiFlightWidgetService) {
  }

  getIata(code: string): Iata {
    if(!code) return null;
    return this.iata.find(item => item.iata_code == code);
  }

  getCity(code: string): City {    
    if (!code) return null;        
    return this.cities.find(item => item.code == code);       
  }

  loadCities(): Observable<City[]> {
    return this.cityList;
  }

  loadIatas(): Observable<Iata[]> {
    return this.iataList;
  }

  private get cityList(): Observable<City[]> {    
    if (this.cities.length > 0) return of(this.cities);
    else if(this.cities$) return this.cities$;

    this.cities$ = this.getCities();
    return this.cities$;
  }

  private get iataList(): Observable<Iata[]> {       
    if (this.iata.length > 0) return of(this.iata);
    else if(this.iata$) return this.iata$;

    this.iata$ = this.getIatas();
    return this.iata$;
  }

  //============= Flights ===================
  mapCity(city: City): City {
    const url = `https://www.google.com/maps/search/?api=1&query=${city.coordinates.lat},${city.coordinates.lon}`;  
    return {...city, googleMapUrl: url };
  } 
  getChipFlights(filter: FlightFilter) {
    return this.widgetService.fetchChipFlights(filter).pipe(map(
      response => {
        if(response['success']) {                      
          const data = response['data'];
          const flightsCollect = this.mapFlightsCollection(data, filter);

          return this.filterFlights(flightsCollect, filter.displayCount);
        }            
        else{
          return "Server returned error " + response['error'];
        }    
      }
    ),
    catchError(error => { return of(null); })
    );
  }

  getDirectFlights(filter: FlightFilter) {    
    return this.widgetService.fetchDirectFlights(filter).pipe(map(
      response => {         
          if(response['success']) {            
            const data = response['data'];
            const flightsCollect = this.mapFlightsCollection(data, filter);
          
            return this.filterFlights(flightsCollect, filter.displayCount);
          }            
          else{
            return "Server returned error " + response['error'];
          }    
      }
    ),
    catchError(error => { return of(null); })
    );
  }  

  private getCities(): Observable<City[]> {
    return this.widgetService.fetchCities().pipe(
      map(response => {        
        const data = response.map(item => this.mapCity(item));
        this.cities = [...data];

        return this.cities;
      }),
      shareReplay(),    
      catchError(error => { return of(null); })
    );
  }

  getIatas(): Observable<Iata[]> {
    return this.widgetService.fetchIata().pipe(
      map(response => {        
        this.iata = [...response];

        return this.iata;
      }),
    catchError(error => { return of(null); })
    );
  }

  // ====================================  
  private mapFlightsCollection(data: JSON, filter: FlightFilter) {
    let flightsArr: Flight[] = [];
    let flightsCollect: IFlights[] = [];
    let mapCollect = new Map<string, Object>()
    let mapFlights = new Map<string, Flight>();
                
    for (let value in data) {  
      mapCollect.set(value, data[value]);  
    }
    
    mapCollect.forEach((value, key) => {
      let flights: Flight[] = [];

      for (let key in value) {  
        mapFlights.set(key, value[key]);                
      }      
    
      mapFlights.forEach((flight: Flight, k: string) => {
        const cityOrigin = this.getCity(filter.origin);
        const cityDest = this.getCity(key);
        const airline = this.getIata(flight.airline)?.name;
        
        flights = [...flights, 
          {...flight, 
            destination: key, origin: filter.origin, cityOrigin: cityOrigin, 
            cityDestination: cityDest, currency: filter.currency, airline: airline}
        ];
      });

      flightsCollect = [...flightsCollect, {destination: key, flights: flights}];
      flightsArr = [...flightsArr, ...flights];
    });

    return flightsArr;
  }

  private filterFlights(collect: Flight[], count?: number) {
    count = (count && count > collect.length) ? collect.length : count || 0 ;    
    const cl=[...collect.slice(0, count)];
    const list = cl.sort((a, b) => {return a.price - b.price});

    return list;
  }
  
}
