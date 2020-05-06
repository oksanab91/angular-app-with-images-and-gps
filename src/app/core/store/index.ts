import { Store } from './store';
import { PersonListStore, personListSelect, messageSelect, personSelect, pictureSelect } from './person-list.store';
import { ModalImageStore } from './modal-image.store';
import { PersonListState, PersonState, ModalImageState } from './store-state';

export const stores = [
    Store, PersonListStore, ModalImageStore, 
    PersonListState, PersonState, ModalImageState, 
    personListSelect, messageSelect, personSelect, pictureSelect
];

export * from './store';
export * from './person-list.store';
export * from './modal-image.store';
export * from './store-state';