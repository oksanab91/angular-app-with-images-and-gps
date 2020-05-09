import { Injectable } from '@angular/core';
import { Store } from './store';
import { WidgetFlightState } from './store-state';
import { FlightWidgetService } from '@core/service/flight-widget.service';
import { FlightFilter } from '@models/models';
import { of } from 'rxjs';


const InitWidgetState: WidgetFlightState = {
    flights$: of([]),
    filter: new FlightFilter(),
    message: null
};

@Injectable({
    providedIn: 'root'
})
export class WidgetStore extends Store<WidgetFlightState> {    
    constructor (private mutator: FlightWidgetService) {
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

    getChipFlights() {
        console.log('in store');
        const observable = this.mutator.getChipFlights(this.state.filter);

        this.setState({
            ...this.state,
            flights$: observable
        });
                
    }

    getDirectFlights () {        
        const observable = this.mutator.getDirectFlights(this.state.filter);

        this.setState({
            ...this.state,
            flights$: observable
        });
    }
    
    getIata () {        
        const observable = this.mutator.getIata();

        this.setState({
            ...this.state,
            flights$: observable            
        });
    }

}

export const flightsSelect$ = (state: WidgetFlightState) => state.flights$;