import { Address } from './address';
import { Observable } from 'rxjs';

export class Person {
    id?: number;
    name: string;
    company: string;
    position: string;
    picture: Picture;
    shortAddress: string;
    address: Address;
    phone: string;
    gpsCoordinate: GpsCoordinate;
    googleMapUrl: string;

    constructor(image?: Picture) {        
        this.picture = new Picture();
        if(image) this.picture = image;
        this.gpsCoordinate = new GpsCoordinate();        
    }
}

export class PersonMapped
{
    person: Person;
    callGps: () => Observable<any>;
}

export class GpsCoordinate {
    lat: number;
    lon: number;
}

export class Picture
{
    url: string;
    caption: string;
}