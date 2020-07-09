import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GpsCoordinate } from '@models/models';
import { map, catchError, shareReplay } from 'rxjs/operators';
import configApi from 'src/app/config.gps';

@Injectable({
  providedIn: 'root'
})
export class GpsCoordinateService {
  private observableGpsCache: { [key: string]: Observable<GpsCoordinate> } = {};
  private gpsCache: { [key: string]: GpsCoordinate } = {};

  constructor(private http: HttpClient) { }

  getGps(address: string) {
    // Data available
    if (this.gpsCache[address]) return of(this.gpsCache[address]);
    // Request pending
     else if (this.observableGpsCache[address]) return this.observableGpsCache[address];
    // New request needed
    else this.observableGpsCache[address] = this.fetch(address)    

    return this.observableGpsCache[address];
  }

  private mapCachedGps(key: string, gps: GpsCoordinate) {    
    this.gpsCache[key] = {...gps};
    this.observableGpsCache[key] = of(this.gpsCache[key]);
        
    return this.gpsCache[key];
  }

  fetch(address: string): Observable<GpsCoordinate> {           
    return this.index(address).pipe(
      map((data: any) => {        
        let gpsData = null;        
        if(data.length>0) gpsData = {lat: data[0].lat, lon: data[0].lon};
        
        return this.mapCachedGps(address, gpsData as GpsCoordinate);      
      }),
      catchError(error => {
        alert('error'); 
        return of(null)}),
      shareReplay(1) // for subscribing to the same observable by many components 
    );
  }

  index(address: string) {    
    let url = '';
   
    if(configApi.environment === 'dev') url = configApi.url_devpath + 'search.json';
    else url = `https://${configApi.open_map_host}/search?format=json&q=${address}`;
            
    return this.http.get(url);
  }
  
}
