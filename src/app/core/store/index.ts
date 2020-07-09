import { Store } from './store';
import { PersonListStore, personListSelect$, messageSelect, personSelect, pictureSelect } from './person-list.store';
import { ModalImageStore } from './modal-image.store';
import { PersonListState, PersonState, ModalImageState, WidgetFlightState, CurrencyQuakeState, CurrencyConverterState } from './store-state';
import { flightsSelect$, citiesSelect, iataSelect, showSelect$, showSelect, showJobsSelect$, remotejobsSelect$, greenhouseJobsSelect$ } from './widget.store';
import { currencyQuakeSelect$, currencyConvertSelect$, insuranceDynamicsSelect$, dynamicsChartSelect$, dynamicsChartFilledSelect$ } from './analytic.store';

export const stores = [
    Store, PersonListStore, ModalImageStore, PersonListState, 
    PersonState, ModalImageState, WidgetFlightState, CurrencyQuakeState,
    CurrencyConverterState, personListSelect$, messageSelect, personSelect, pictureSelect, 
    flightsSelect$, citiesSelect, iataSelect, showSelect$, showSelect,
    currencyQuakeSelect$, currencyConvertSelect$, insuranceDynamicsSelect$, 
    dynamicsChartSelect$, dynamicsChartFilledSelect$, showJobsSelect$, remotejobsSelect$, greenhouseJobsSelect$
];

export * from './store';
export * from './person-list.store';
export * from './modal-image.store';
export * from './widget.store';
export * from './store-state';
export * from './analytic.store'