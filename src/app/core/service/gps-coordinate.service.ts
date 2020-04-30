import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GpsCoordinate } from '@models/models';
import { map, catchError, shareReplay } from 'rxjs/operators';

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
    else this.observableGpsCache[address] = this.fetchGps(address)    

    return this.observableGpsCache[address];
  }

  private mapCachedGps(key: string, gps: GpsCoordinate) {
    this.observableGpsCache[key] = null;
    this.gpsCache[key] = {...gps};
        
    return this.gpsCache[key];
  }

  fetchGps(address: string): Observable<GpsCoordinate> {
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8
    //https://nominatim.openstreetmap.org/search?format=json&q=1600+Amphitheatre+Parkway+Mountain+View+CA+USA
    //https://nominatim.openstreetmap.org/search?format=json&q=58+La+Guardia+Tel-Aviv+Israel
    const url = "../../assets/search.json";  
   
    // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
        
    return this.http.get(url).pipe(
      map((data: any) => {        
        let gpsData = null;
        
        if(data.length>0) gpsData = {lat: data[0].lat, lng: data[0].lon};
        
        return this.mapCachedGps(address, gpsData as GpsCoordinate);      
      }),
      catchError(error => {
        alert('error'); 
        return of(null)}),
      shareReplay(1) // for subscribing to the same observable by many components 
    );
  }
  
}
