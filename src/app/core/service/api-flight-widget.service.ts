import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlightFilter, City, Iata } from '@models/models';
import configRapidapi from 'src/app/config.rapidapi';


@Injectable({
  providedIn: 'root'
})
export class ApiFlightWidgetService {
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

    if(configRapidapi.environment != 'dev') 
      url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=-&origin=${filter.origin}` +
      `&depart_date=${filter.depart_date || ''}&return_date=${filter.return_date  || ''}&currency=${filter.currency || 'USD'}&page=${filter.page || 'None'}`;

    return this.http.get(url,  {headers: this.headers});
  }

  fetchDirectFlights(filter: FlightFilter) {    
    this.setHeaders();
    let url = "../../assets/flights-search.json";
    
    if(configRapidapi.environment != 'dev') 
      url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?` +
        `return_date=${filter.return_date || ''}&depart_date=${filter.depart_date || ''}&destination=${filter.destination}&origin=${filter.origin}`;
    
    return this.http.get(url,  {headers: this.headers});
  }

  fetchIata() {
    let url = "../../assets/iata-search.json";
    this.headers = new HttpHeaders({
      "x-rapidapi-host": configRapidapi.x_rapidapi_iata_host,
      "x-rapidapi-key": this.x_rapidapi_key
    });

    if(configRapidapi.environment != 'dev') 
      url = 'https://iata-and-icao-codes.p.rapidapi.com/airlines';
    
    return this.http.get<Iata[]>(url,  {headers: this.headers});
  }
  
  fetchCities() {
    this.setHeaders();
    let url = "../../assets/city-search.json";

    if(configRapidapi.environment != 'dev')
      url = `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/cities.json`;

    return this.http.get<City[]>(url, {headers: this.headers});
  }

  fetchAutoCompleteCity() {
    // http://autocomplete.travelpayouts.com/places2?term=Tel-Avi&locale=en&types[]=city
    // http://autocomplete.travelpayouts.com/places2?term=TLV&locale=en&types[]=city,airport
  }  

  getAutocompleteCity() {

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