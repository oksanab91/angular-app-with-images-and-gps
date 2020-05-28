import { Injectable } from '@angular/core';
import { Store } from './store';
import { CurrencyQuakeState, CurrencyConverterState, InsuranceAnalyticState } from './store-state';
import { AnalyticStoreServices } from 'src/app/analytic/service/analytic-store.service';
import { Observable, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { CurrConverterFilter } from '@models/models';
import { LineChart } from 'src/app/analytic/line-chart';
import { Color } from 'ng2-charts';


const InitCurrencyQuakeState: CurrencyQuakeState = {
    data: [],
    filter: '',
    message: null,
    displayCount: 0
};

@Injectable({
    providedIn: 'root'
})
export class CurrencyQuakeStore extends Store<CurrencyQuakeState> {    
    constructor (private mutator: AnalyticStoreServices) {
        super(new CurrencyQuakeState());
        this.setState( InitCurrencyQuakeState );        
    }

    getCurrencyQuake (): Observable<CurrencyQuakeState> {        
        const getData = this.mutator.analyticService.loadCurrQuake();

        return getData.pipe(map(data => {
            this.setState({
                ...this.state,
                data: [...data]
            });
            return this.state;
        }));
    }    
}

export const currencyQuakeSelect$ = (state: Observable<CurrencyQuakeState>) => state.pipe(map(st => st.data));



const InitCurrConverterState: CurrencyConverterState = {
    data: [],
    filter: new CurrConverterFilter(),
    message: null    
  }

@Injectable({
    providedIn: 'root'
})
export class CurrConverterStore extends Store<CurrencyConverterState> {    
    constructor (private mutator: AnalyticStoreServices) {
        super(new CurrencyConverterState());
        this.setState( InitCurrConverterState );        
    }
    
    setFilter(filter: CurrConverterFilter) {
        this.setState({
            ...this.state,
            filter: {...filter}
        });
    }

    clearFilter() {
        this.setState({
            ...this.state,
            filter: new CurrConverterFilter()
        });
    }

    reset() {        
        this.setState({
            ...InitCurrConverterState
        });  
    }

    getCurrencyConverter (): Observable<CurrencyConverterState> {        
        const getData = this.mutator.analyticService.loadCurrConverter(this.state.filter);

        return getData.pipe(map(res => {
            this.setState({
                ...this.state,
                data: [...this.state.data, res]
            });
            return this.state;
        }));
    }

    getCurrencyConverterList (): Observable<CurrencyConverterState> {        
        const getData = this.mutator.analyticService.loadCurrConverterList(this.state.filter);

        return getData.pipe(map(res => {
            this.setState({
                ...this.state,
                data: [...res]
            });
            return this.state;
        }));
    }
}

export const currencyConvertSelect$ = (state: Observable<CurrencyConverterState>) => state.pipe(map(st => st.data));


const InitInsuranceAnalyticState: InsuranceAnalyticState = {
    data: [],
    filter: {dates: [], chartLabels: [], options: {}, colors: []},
    message: null,
    chart: new LineChart(),
    chartFilled: false   
  }

@Injectable({
    providedIn: 'root'
})
export class InsuranceAnalyticStore extends Store<InsuranceAnalyticState> {    
    constructor (private mutator: AnalyticStoreServices) {
        super(new InsuranceAnalyticState());
        this.setState( InitInsuranceAnalyticState );
    }

    setFilter(filter: {dates: string[], chartLabels: string[], options: {}, colors: Color[]}) {
        this.setState({
            ...this.state,
            filter: {...filter}
        });
    }

    getInsuraceDynamicsWithChart(): Observable<InsuranceAnalyticState> {
        const dynamics = this.getInsuranceDynamicList();
        const charts = this.getChart();
        const source = of(dynamics, charts)       

        return source.pipe(concatAll());
    }
    
    getInsuranceDynamicList (): Observable<InsuranceAnalyticState> {
        const getData = this.mutator.analyticInsurService.loadInsuranceAnalytics(this.state.filter);

        return getData.pipe(map(res => {            
            this.setState({
                ...this.state,
                data: [...res]
            });
            return this.state;
        }));
    }


    getInsuraceDynamic (filter: string): Observable<InsuranceAnalyticState> {
        const getData = this.mutator.analyticInsurService.getInsurAnalytic(filter);

        return getData.pipe(map(res => {            
            this.setState({
                ...this.state,
                data: [...this.state.data, res]
            });
            return this.state;
        }));
    }
    
    getChart(): Observable<InsuranceAnalyticState> {
        const lineChart = this.mutator.analyticInsurService.getAnalyticChart(this.state.filter);

        return lineChart.pipe(map(chart => {
            this.setState({
                ...this.state,
                chart: {...chart},
                chartFilled: true
            });
            return this.state  
        }))
    }

}

export const insuranceDynamicsSelect$ = (state: Observable<InsuranceAnalyticState>) => state.pipe(map(st => st.data));
export const dynamicsChartSelect$ = (state: Observable<InsuranceAnalyticState>) => state.pipe(map(st => st.chart))
export const dynamicsChartFilledSelect$ = (state: Observable<InsuranceAnalyticState>) => state.pipe(map(st => st.chartFilled))

@Injectable({
    providedIn: 'root'
})
export class AnalyticStore {
    currConverterStore: CurrConverterStore
    currQuakeStore: CurrencyQuakeStore
    insuranceAnalyticStore: InsuranceAnalyticStore

    constructor (private mutator: AnalyticStoreServices) {
        this.currConverterStore = new CurrConverterStore(this.mutator)
        this.currQuakeStore = new CurrencyQuakeStore(this.mutator)
        this.insuranceAnalyticStore = new InsuranceAnalyticStore(this.mutator)
    }
} 