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
