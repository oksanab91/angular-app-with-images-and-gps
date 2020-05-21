import { Person, Alert, Picture, Flight, FlightFilter, City, Iata } from '@models/models';

export class PersonListState {
    list: Person[] = [];
    message: Alert = null;
    person: Person = null;
  }

export class PersonState {
    person: Person = null;
    message: Alert = null;
}

export class ModalImageState {
  image: Picture = null;
  show: boolean;
  message: string;
}

export class WidgetFlightState {
  flights: Flight[];  
  filter: FlightFilter;
  cities: City[] = [];
  iata: Iata[] = [];
  citiesLoaded: boolean;
  message: string;
  show: boolean;
}