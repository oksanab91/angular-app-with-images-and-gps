import { Injectable } from '@angular/core';
import { Store } from './store';
import { WidgetFlightState, WidgetJobSearchState } from './store-state';
import { FlightFilter, JobFilter } from '@models/models';
import { Observable, concat } from 'rxjs';
import { WidgetStoreService } from '@core/service';
import { map } from 'rxjs/operators';


const InitWidgetState: WidgetFlightState = {
    flights: [],
    cities: [],
    iata: [],
    filter: new FlightFilter(),
    citiesLoaded: false,
    message: null,
    show: false
};

const InitWidgetJobsState: WidgetJobSearchState = {
    remoteJobs: [],
    greenHousejobs: [],   
    githubJobs: [],   
    filter: new JobFilter,
    message: null,
    show: false
}

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

    setShow(show: boolean) {
        this.setState({
            ...this.state,
            show: show
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

export const flightsSelect$ = (state: Observable<WidgetFlightState>) => state.pipe(map(st => st.flights));
export const citiesSelect = (state: WidgetFlightState) => state.cities;
export const iataSelect = (state: WidgetFlightState) => state.iata;
export const showSelect$ = (state: Observable<WidgetFlightState>) => state.pipe(map(st => st.show));
export const showSelect = (state: WidgetFlightState) => state.show;


@Injectable({
    providedIn: 'root'
})
export class WidgetJobSearchStore extends Store<WidgetJobSearchState> {    
    constructor (private mutator: WidgetStoreService) {
        super(new WidgetJobSearchState());
        this.setState( InitWidgetJobsState );        
    }

    reset() {        
        this.setState({
            ...InitWidgetJobsState
        });  
    }

    setShow(show: boolean) {
        this.setState({
            ...this.state,
            show: show,
            message: {type: 'warning', message: `Loading...`}
        });
    }

    setFilter(filter: JobFilter) {
        this.setState({
            ...this.state,
            filter: {...filter}
        });
    }

    clearFilter() {
        this.setState({
            ...this.state,
            filter: new JobFilter()
        });
    }

    getRemotiveJobSearch (): Observable<WidgetJobSearchState> {        
        const getData = this.mutator.getRemotiveJobSearch(this.state.filter);        

        return getData.pipe(map(data => {                        
            this.setState({
                ...this.state,
                remoteJobs: data,
                message: null
            });
            return this.state;
        }));
    }

    getGreenhouseJobs (): Observable<WidgetJobSearchState> {        
        const getData = this.mutator.getGreenhouseJobs(this.state.filter);        

        return getData.pipe(map(data => {            
            this.setState({
                ...this.state,
                greenHousejobs: data,
                message: null
            });
            return this.state;
        }));
    }

    getGithubJobs (): Observable<any> {        
        const getData = this.mutator.getGithubJobSearch();        

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                githubJobs: data,
                message: null
            });
            return this.state;
        }));
    }

    // getJobCategories (): Observable<WidgetJobSearchState> {        
    //     const getData = this.mutator.loadJobCategories();

    //     return getData.pipe(map(data => {
    //         this.setState({
    //             ...this.state,
    //             categories: [...data]
    //         });
    //         return this.state;
    //     }));
    // }

    // getJobSearchFull(): Observable<WidgetJobSearchState> {
    //     const jobs = this.getRemotiveJobSearch();
    //     const categories = this.getJobCategories();
    //     const iata = this.getIata();

    //     return concat(categories, iata, jobs);
    // }
}

export const remotejobsSelect$ = (state: Observable<WidgetJobSearchState>) => state.pipe(map(st => st.remoteJobs));
export const greenhouseJobsSelect$ = (state: Observable<WidgetJobSearchState>) => state.pipe(map(st => st.greenHousejobs));
export const githubJobsSelect$ = (state: Observable<WidgetJobSearchState>) => state.pipe(map(st => st.githubJobs));
export const showJobsSelect$ = (state: Observable<WidgetJobSearchState>) => state.pipe(map(st => st.show));
export const jobsMessageSelect = (state: WidgetJobSearchState) => state.message;