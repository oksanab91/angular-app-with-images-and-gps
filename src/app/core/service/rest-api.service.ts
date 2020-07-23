import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {  
  private headers: HttpHeaders = new HttpHeaders()
  apiHost: string
  apiKey: string
  accessToken: string
  url_devpath: string 
  private apiUrl: string
    
  constructor(private http: HttpClient, private json: string, private environment: string) {    
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

  setHeadersTxt(): void {    
    this.headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=UTF-8'
    });
  }

  setHeadersJson(): void {    
    this.headers = new HttpHeaders({
     'Content-Type': 'application/json'      
    });
  }
  
  set url(url: string) {    
    if(this.environment === 'dev') this.apiUrl = this.url_devpath + this.json;
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
