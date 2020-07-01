import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { 
  currencyQuakeSelect$, 
  currencyConvertSelect$, 
  insuranceDynamicsSelect$, 
  AnalyticStore, 
  dynamicsChartSelect$, 
  dynamicsChartFilledSelect$ } 
from '@core/store/analytic.store';
import { CurrencyQuake, CurrencyConverter, CurrConverterFilter } from '@models/models';
import { map } from 'rxjs/operators';
import { LineChart } from '../line-chart';
import configAnalyticsdApi from 'src/app/config.analytics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'A life insurance policy summary of activity for the period 01/2019 - 04/2020'  
  subTitle = 'Policies Issued from 1992 to 2003'
  subscription: Subscription;
  currQuake$: Observable<CurrencyQuake[]>
  currConverter$: Observable<CurrencyConverter[]>  
  currConvertFilter: CurrConverterFilter  
  chartData$: Observable<LineChart>
  chartFilled$: Observable<boolean>
  chartFilter = {
    dates: configAnalyticsdApi.chart_insur_dates, 
    chartLabels: configAnalyticsdApi.chart_insur_labels,
    options: {company: configAnalyticsdApi.chart_insur_companies, path: configAnalyticsdApi.chart_insur_path},
    colors: [
      {
        borderColor: 'rgba(179, 0, 0, 1)',
        backgroundColor: 'rgba(204, 0, 0, 0.2)',
        borderWidth: 1
      },
      {
        borderColor: 'rgba(0, 102, 0, 1)',
        backgroundColor: 'rgba(0, 102, 0, 0.2)',
        borderWidth: 1
      },
      {
        borderColor: 'rgba(51, 102, 204, 1)',
        backgroundColor: 'rgba(51, 102, 204, 0.2)',
        borderWidth: 1
      },      
      {
        borderColor: 'rgba(0, 158, 115, 1)',
        backgroundColor: 'rgba(0, 158, 115, 0.2)',
        borderWidth: 1
      },
      {
        borderColor: 'rgba(204, 0, 102, 1)',
        backgroundColor: 'rgba(204, 0, 102, 0.2)',
        borderWidth: 1
      },
      {
        borderColor: 'rgba(204, 51, 0, 1)',
        backgroundColor: 'rgba(204, 51, 0, 0.2)',
        borderWidth: 1
      },
      {
        borderColor: 'rgba(153, 51, 102, 1)',
        backgroundColor: 'rgba(153, 51, 102, 0.2)',
        borderWidth: 1
      },
    ]
  }

  constructor(private store: AnalyticStore) { }

  ngOnInit(): void {    
    this.currConvertFilter = {
      dates: ['2020-01-20', '2019-01-20'],
      from_currency_code: 'EUR',
      to_currency_code: 'GBP',
      amount: 1,
      date: '2020-01-20',
      displayCount: 20
    }    

    // this.currQuake$ = currencyQuakeSelect$(this.store.currQuakeStore.state$)
    // this.currConverter$ = currencyConvertSelect$(this.store.currConverterStore.state$)
    
    this.chartData$ = dynamicsChartSelect$(this.store.insuranceAnalyticStore.state$)
    this.chartFilled$ = dynamicsChartFilledSelect$(this.store.insuranceAnalyticStore.state$)

    // this.store.currConverterStore.setFilter(this.currConvertFilter)
    // this.getCurrConverter()

    this.store.insuranceAnalyticStore.setFilter(this.chartFilter)
    this.getInsuranceAnalytics()
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  getInsuranceAnalytics() {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store.insuranceAnalyticStore.getInsuraceDynamicsWithChart().subscribe()
  }

  getCurrConverter() {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store.currConverterStore.getCurrencyConverterList().subscribe()
  }

  getCurrencyQuake() {    
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store.currQuakeStore.getCurrencyQuake().subscribe()
  }

  trackByFn(index, item) {
    return index;
  }
  
}
