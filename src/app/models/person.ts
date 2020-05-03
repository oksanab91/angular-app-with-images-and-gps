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

    constructor() {
        this.picture = new Picture();
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
    lng: number;
}

export class Picture
{
    url: string;
    caption: string;
}