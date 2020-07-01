import { GpsCoordinate } from '.';

export interface IFlights {
    destination: string;
    flights: Flight[];
}
  
export class Flight {
    destination: string;
    origin: string;
    price: number;
    airline: string;
    flight_number: number;
    departure_at: string; //2020-10-10T09:10:00Z,
    return_at: string; //2020-10-17T19:20:00Z,
    expires_at: string; //2020-05-10T12:16:00Z
    cityOrigin: City;
    cityDestination?: City;
    currency: string;
}

export class FlightFilter {
    destination: string;
    origin: string;
    depart_date: string;
    return_date: string;
    currency: string;
    page: number;
    displayCount: number;
}

export class City {
    time_zone: string;
    name?: string;
    coordinates: GpsCoordinate;
    code: string;
    name_translations: {key: string, value: string};
    country_code: string;
    googleMapUrl: string;
}

export interface Iata {
    iata_code: string;
    name: string;
    icao_code: string;
}