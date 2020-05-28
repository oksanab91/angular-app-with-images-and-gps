import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import configRapidapi from 'src/app/config.rapidapi';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {  
  private headers: HttpHeaders
  apiHost: string
  apiKey: string
  accessToken: string
  private apiUrl: string
    
  constructor(private http: HttpClient, private json: string) {    
    this.apiKey = configRapidapi.x_rapidapi_key;
  }  

  setHeaders(): void {
    this.headers = new HttpHeaders({      
      "x-rapidapi-host": this.apiHost,
      "x-rapidapi-key": this.apiKey,
      "x-access-token": this.accessToken
    });
  }

  setHeadersShort(): void {
    this.headers = new HttpHeaders({
      "x-rapidapi-host": this.apiHost,
      "x-rapidapi-key": this.apiKey
    });
  }

  setHeadersXML(): void {    
    this.headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'application/xml'     
    });
  }

  set url(url: string) {
    if(configRapidapi.environment === 'dev') this.apiUrl = configRapidapi.url_devpath + this.json;
    else this.apiUrl = url;    
  }

  get url(): string {
    return this.apiUrl
  }

  fetch<T>(): Observable<T> {
    return this.http.get<T>(this.url,  {headers: this.headers});
  }

  get(): Observable<string> {    
    return this.http.request('GET', this.url, {headers: this.headers, responseType:'text'});
  }

}
