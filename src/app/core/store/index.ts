import { Store } from './store';
import { PersonListStore, personListSelect, messageSelect, personSelect, pictureSelect } from './person-list.store';
import { ModalImageStore } from './modal-image.store';
import { PersonListState, PersonState, ModalImageState, WidgetFlightState } from './store-state';
import { flightsSelect, citiesSelect, iataSelect, showSelect$, showSelect } from './widget.store';

export const stores = [
    Store, PersonListStore, ModalImageStore, 
    PersonListState, PersonState, ModalImageState, WidgetFlightState, 
    personListSelect, messageSelect, personSelect, pictureSelect, 
    flightsSelect, citiesSelect, iataSelect, showSelect$, showSelect
];

export * from './store';
export * from './person-list.store';
export * from './modal-image.store';
export * from './widget.store';
export * from './store-state';