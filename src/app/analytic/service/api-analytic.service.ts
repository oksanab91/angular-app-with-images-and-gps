import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from '@core/service/rest-api.service';
import configRapidapi from 'src/app/config.rapidapi';
import { CurrencyQuake, CurrConverterFilter, ICurrConverterJson } from '@models/models';
import { HelperService } from '../helper.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAnalyticService {

  constructor(private http: HttpClient, private helper: HelperService) {    
  }

  fetchCurrencyQuake() {
    const api = new RestApiService(this.http, 'currency-quake.json');
    
    api.apiHost = configRapidapi.x_rapisapi_currency_quake_host;    
    api.url = `https://currency-quake.p.rapidapi.com/pairs/h1/`;
    api.setHeadersShort();
        
    return api.fetch<CurrencyQuake[]>();  
  }

  fetchCurrencyConverter(filter: CurrConverterFilter) {
    const api = new RestApiService(this.http, 'currency-convert.json');
    
    api.apiHost = configRapidapi.x_rapidapi_currency_conv_host;    
    api.url = `https://currency-converter5.p.rapidapi.com/currency/historical/${filter.date}?from=${filter.from_currency_code}&amount=${filter.amount}&format=json&to=${filter.to_currency_code}`;
    api.setHeadersShort();

    return api.fetch<ICurrConverterJson>();
  }

  fetchInsuranceDynamics(filter: string) {    
    const api = new RestApiService(this.http, `analytic/insurance${filter}.xml`)
    api.url = ''
    api.setHeadersXML()
   
    return api.get().pipe(map((xml: string) => this.helper.xmlToJson(xml) ))    
  }

}