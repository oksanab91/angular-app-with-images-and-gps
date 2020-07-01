import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightFilter, City, Iata } from '@models/models';
import { RestApiService } from './rest-api.service';
import configRapidapi from 'src/app/config.rapidapi';


@Injectable({
  providedIn: 'root'
})
export class ApiFlightWidgetService {
  constructor(private http: HttpClient) {
  }

  fetchChipFlights(filter: FlightFilter) {    
    const api = new RestApiService(this.http, 'chip-flights-search.json', configRapidapi.environment);
    api.apiKey = configRapidapi.x_rapidapi_key
    api.apiHost = configRapidapi.x_rapidapi_flight_host;
    api.accessToken = configRapidapi.x_access_token;
    api.url_devpath = configRapidapi.url_devpath;
    api.setHeaders();
    api. url = `https://${api.apiHost}/v1/prices/cheap?&destination=${filter.destination || '-'}&origin=${filter.origin}` +
      `&depart_date=${filter.depart_date || ''}&return_date=${filter.return_date  || ''}&currency=${filter.currency || 'USD'}&page=${filter.page || 'None'}`;   

    return api.fetch();
  }

  fetchDirectFlights(filter: FlightFilter) {
    const api = new RestApiService(this.http, 'flights-search.json', configRapidapi.environment);
    api.apiKey = configRapidapi.x_rapidapi_key
    api.apiHost = configRapidapi.x_rapidapi_flight_host;
    api.accessToken = configRapidapi.x_access_token;
    api.url_devpath = configRapidapi.url_devpath;
    api.setHeaders();
    api.url = `https://${api.apiHost}/v1/prices/direct/?` +
      `return_date=${filter.return_date || ''}&depart_date=${filter.depart_date || ''}&destination=${filter.destination}&origin=${filter.origin}`;
        
    return api.fetch();
  }

  fetchIata() {
    const api = new RestApiService(this.http, 'iata-search.json', configRapidapi.environment);
    api.apiKey = configRapidapi.x_rapidapi_key
    api.apiHost = configRapidapi.x_rapidapi_iata_host;
    api.url_devpath = configRapidapi.url_devpath;
    api.url = `https://${api.apiHost}/airlines`;    
    api.setHeadersShort();
    
    return api.fetch<Iata[]>();
  }
  
  fetchCities() {    
    const api = new RestApiService(this.http, 'city-search.json', configRapidapi.environment);
    api.apiKey = configRapidapi.x_rapidapi_key
    api.apiHost = configRapidapi.x_rapidapi_flight_host;
    api.accessToken = configRapidapi.x_access_token;
    api.url_devpath = configRapidapi.url_devpath;
    api.setHeaders();
    api.url = `https://${api.apiHost}/data/en-GB/cities.json`;
        
    return api.fetch<City[]>();
  }

  getMappedCityUrl(city: City): string {
    let url = '';
    if(city.coordinates) url = `${configRapidapi.city_map_url}?api=1&query=${city.coordinates.lat},${city.coordinates.lon}`;
    return url;
  }

  fetchAutoCompleteCity() {
   
  }  

  getAutocompleteCity() {

  }  

// Offers
// https://${api.apiHost}/v2/prices/special-offers
// fetch("https://${api.apiHost}/v2/prices/special-offers", {
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