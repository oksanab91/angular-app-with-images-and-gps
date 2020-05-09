import { Person, Alert, Picture, Flight, FlightFilter } from '@models/models';
import { Observable } from 'rxjs';

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
  flights$: Observable<Flight[]>;
  filter: FlightFilter;
  message: string;
}