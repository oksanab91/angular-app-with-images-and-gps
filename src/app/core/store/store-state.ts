import { Person, Alert, Picture } from '@models/models';

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