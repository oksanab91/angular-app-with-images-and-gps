import { Injectable } from '@angular/core';
import { Store } from './store';
import { WidgetFlightState } from './store-state';
import { FlightFilter } from '@models/models';
import { Observable, concat } from 'rxjs';
import { WidgetStoreService } from '@core/service';
import { map } from 'rxjs/operators';


const InitWidgetState: WidgetFlightState = {
    flights: [],    
    filter: new FlightFilter(),
    cities: [],
    iata: [],
    citiesLoaded: false,
    message: null
};

@Injectable({
    providedIn: 'root'
})
export class WidgetStore extends Store<WidgetFlightState> {    
    constructor (private mutator: WidgetStoreService) {
        super(new WidgetFlightState());
        this.setState( InitWidgetState );        
    }

    setFilter(filter: FlightFilter) {
        this.setState({
            ...this.state,
            filter: {...filter}
        });
    }

    clearFilter() {
        this.setState({
            ...this.state,
            filter: new FlightFilter()
        });
    }

    reset() {        
        this.setState({
            ...InitWidgetState
        });  
    }

    getChipFlights(): Observable<WidgetFlightState> {        
        const getData = this.mutator.getChipFlights(this.state.filter);

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                flights: data
            });
            return this.state;
        }));                 
    }

    getDirectFlightsFull(): Observable<WidgetFlightState> {
        const flights = this.getDirectFlights();
        const cities = this.getCities();
        const iata = this.getIata();

        return concat(cities, iata, flights);
    }

    getChipFlightsFull(): Observable<WidgetFlightState> {
        const flights = this.getChipFlights();
        const cities = this.getCities();
        const iata = this.getIata();

        return concat(cities, iata, flights);
    }

    getDirectFlights (): Observable<WidgetFlightState> {
        const getData = this.mutator.getDirectFlights(this.state.filter);        

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                flights: data
            });
            return this.state;
        }));        
    }
    
    getIata (): Observable<WidgetFlightState> {        
        const getData = this.mutator.loadIatas();

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                iata: [...data]
            });
            return this.state;
        }));
    }

    getCities (): Observable<WidgetFlightState>  {
        const getData = this.mutator.loadCities();

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                cities: [...data],
                citiesLoaded: true
            });
            return this.state;
        }));        
    }

}

export const flightsSelect = (state: WidgetFlightState) => state.flights;
export const citiesSelect = (state: WidgetFlightState) => state.cities;
export const iataSelect = (state: WidgetFlightState) => state.iata;