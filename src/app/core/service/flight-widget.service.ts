import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Flight, FlightFilter, IFlights } from '@models/models';
import configRapidapi from 'src/app/config.rapidapi';


@Injectable({
  providedIn: 'root'
})
export class FlightWidgetService {
  private headers: HttpHeaders;
  private x_rapidapi_host: string;
  private x_rapidapi_key: string;
  private x_access_token: string;

  constructor(private http: HttpClient) {
    this.x_access_token = configRapidapi.x_access_token;
    this.x_rapidapi_host = configRapidapi.x_rapidapi_flight_host;
    this.x_rapidapi_key = configRapidapi.x_rapidapi_key;
   }

   private setHeaders() {
    this.headers = new HttpHeaders({      
      "x-rapidapi-host": this.x_rapidapi_host,
      "x-rapidapi-key": this.x_rapidapi_key,
      "x-access-token": this.x_access_token      
    });
   }

  fetchChipFlights(filter: FlightFilter) {    
    this.setHeaders();
    let url = "../../assets/chip-flights-search.json";

    // const url = 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=-&origin=TLV' +
    // '&depart_date=2020-05&return_date=2020-05&currency=USD&page=2';
    if(configRapidapi.environment != 'dev') 
      url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=-&origin=${filter.origin}` +
      `&depart_date=${filter.depart_date || ''}&return_date=${filter.return_date  || ''}&currency=${filter.currency || 'USD'}&page=${filter.page || 'None'}`;

    return this.http.get(url,  {headers: this.headers});
  }

  fetchDirectFlights(filter: FlightFilter) {    
    this.setHeaders();
    let url = "../../assets/flights-search.json";
        
    // const url = 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?destination=HRK&origin=TLV';
    if(configRapidapi.environment != 'dev') 
      url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?` +
        `return_date=${filter.return_date || ''}&depart_date=${filter.depart_date || ''}&destination=${filter.destination}&origin=${filter.origin}`;
    
    return this.http.get(url,  {headers: this.headers});
  }

  fetchIata() {   
    this.headers = new HttpHeaders({
      "x-rapidapi-host": configRapidapi.x_rapidapi_iata_host,
      "x-rapidapi-key": this.x_rapidapi_key
    });
    const url = 'https://iata-and-icao-codes.p.rapidapi.com/airlines';
    
    return this.http.get(url,  {headers: this.headers});
  }

//   {
//     "success": true,
//     "data": {},
//     "error": null,
//     "currency": "RUB"
// }

//SYD, TLV, HRK, yyyy-mm
// https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=-&origin=TLV
// &depart_date=2020-05&return_date=2020-05&currency=USD&page=None

  getChipFlights(filter: FlightFilter) {
    return this.fetchChipFlights(filter).pipe(map(
      response => {
        // console.log(response);

        if(response['success']) {                      
          const data = response['data'];
          const flightsCollect = this.mapFlightsCollection(data, filter);

          return flightsCollect;
        }            
        else{
          return "Server returned error " + response['error'];
        }    
      }
    ),
    catchError(error => { 
      console.log('error ', error);
      return of(null); })    
    );
  }

  // https://2ality.com/2015/08/es6-map-json.html ??
  getDirectFlights(filter: FlightFilter) {    
    return this.fetchDirectFlights(filter).pipe(map(
      response => {
          // console.log(response);

          if(response['success']) {            
            const data = response['data'];
            const flightsCollect = this.mapFlightsCollection(data, filter);
          
            return flightsCollect;
          }            
          else{
            return "Server returned error " + response['error'];
          }    
      }
    ),
    catchError(error => { 
      console.log('error ', error);
      return of(null); })    
    );
  }  

  private mapFlightsCollection(data: JSON, filter: FlightFilter) {
    let flightsArr: Flight[] = [];
    let flightsCollect: IFlights[] = [];
    let mapCollect = new Map<string, Object>()
    let mapFlights = new Map<string, Flight>();
                
    for (let value in data) {  
      mapCollect.set(value, data[value]);  
    }
    // console.log(mapCollect);

    mapCollect.forEach((value, key) => {
      let flights: Flight[] = [];

      for (let key in value) {  
        mapFlights.set(key, value[key]);                
      }
      // console.log(mapFlights);
    
      mapFlights.forEach((flight: Flight, k: string) => {
        flights = [...flights, {...flight, destination: key, origin: filter.origin}];
      });

      // console.log(flights);

      flightsCollect = [...flightsCollect, {destination: key, flights: flights}];
      flightsArr = [...flightsArr, ...flights];

    });

    return flightsArr;
  }

  getIata() {
    return this.fetchIata().pipe(map(
      response => {
          console.log(response);
          return response;     
      }
    ),
    catchError(error => { 
      console.log('error ', error);
      return of(null); })    
    );
  }

// Offers
// https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/special-offers
// fetch("https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/special-offers", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": this.x_rapidapi_host,
// 		"x-rapidapi-key": this.x_rapidapi_key,
// 		"x-access-token": this.x_access_token
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });

}

