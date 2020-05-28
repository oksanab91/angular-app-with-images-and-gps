import { Injectable } from '@angular/core';
import { CurrencyQuake, CurrencyConverter, CurrConverterFilter, ICurrConverterJson } from '@models/models';
import { Observable, of, from } from 'rxjs';
import { ApiAnalyticService } from './api-analytic.service';
import { map, catchError, shareReplay, toArray, mergeMap, take } from 'rxjs/operators';
import { AnalyticInsuranceService } from './analytic-insurance.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticStoreService {
  private currQuake: CurrencyQuake[] = []  
  private currQuake$: Observable<CurrencyQuake[]> = null
  private currConverter: { [key: string]: CurrencyConverter } = {}
  private currConverter$: { [key: string]: Observable<CurrencyConverter> } = {}
  private currConverterList: CurrencyConverter[] = []
  private currConverterList$: Observable<CurrencyConverter[]> = null  

  constructor(private analyticService: ApiAnalyticService) { }

  private get currQuakeList(): Observable<CurrencyQuake[]> {       
    if (this.currQuake.length > 0) return of(this.currQuake);
    else if(this.currQuake$) return this.currQuake$;

    this.currQuake$ = this.getCurrencyQuake();
    return this.currQuake$
  }

  private getCurrConverter(filter: CurrConverterFilter): Observable<CurrencyConverter> {
    const key = filter.date + filter.from_currency_code + filter.to_currency_code

    if (this.currConverter[key]) return of(this.currConverter[key]);    
    else if (this.currConverter$[key]) return this.currConverter$[key];    
    else this.currConverter$[key] = this.getCurrencyConverter(filter);    

    return this.currConverter$[key]
  }

  private getCurrConverters(filter: CurrConverterFilter): Observable<CurrencyConverter[]> {       
    if (this.currConverterList.length > 0) return of(this.currConverterList);
    else if(this.currConverterList$) return this.currConverterList$;

    return this.getCurrConverterList(filter);    
  }  

  loadCurrQuake(): Observable<CurrencyQuake[]> {
    return this.currQuakeList
  }

  loadCurrConverter(filter: CurrConverterFilter) : Observable<CurrencyConverter> {    
    return this.getCurrConverter(filter)
  }

  loadCurrConverterList(filter: CurrConverterFilter) : Observable<CurrencyConverter[]> {    
    return this.getCurrConverters(filter)
  }
 
  private getCurrConverterList(filter: CurrConverterFilter): Observable<CurrencyConverter[]> {    
    const dates = filter.dates    

    this.currConverterList$ = from(dates).pipe(
      mergeMap( date => {
        const params = {...filter, date: date}
        const converterByDate$ = this.getCurrConverter(params)        
        
        return converterByDate$.pipe(mergeMap(conv => {          
          this.currConverterList = [...this.currConverterList, conv]
          return this.currConverterList
        }))
      }
    ),
    take(filter.displayCount),
    toArray())
    
    return this.currConverterList$
  }

  private getCurrencyQuake(): Observable<CurrencyQuake[]> {
    return this.analyticService.fetchCurrencyQuake().pipe(
      map(response => {
        const data = this.filterAnalytic(response, 10) as CurrencyQuake[]
        this.currQuake = [...data]        

        return this.currQuake;
      }),
    catchError(error => { return of([]); })
    );
  }

  private getCurrencyConverter(filter: CurrConverterFilter):Observable<CurrencyConverter> {
    const key = filter.date + filter.from_currency_code + filter.to_currency_code    

    return this.analyticService.fetchCurrencyConverter(filter).pipe(
      map(response => {        
        const converter = this.mapCurrencyConverter(response, filter.to_currency_code)
        if (!converter) return null

        this.currConverter[key] = {...converter}
        this.currConverter$[key] = of(this.currConverter[key])

        return this.currConverter[key]
      }),
    catchError(error => { return of(null); }),
    shareReplay(1) // for subscribing to the same observable by many components
    )
  }
  
  private mapCurrencyConverter (data: ICurrConverterJson, currCode: string): CurrencyConverter {
    let converter = new CurrencyConverter()

    if(data.status !== 'success') return null

    converter.base_currency_code = data.base_currency_code
    converter.base_currency_name = data.base_currency_name
    converter.to_currency_code = currCode
    converter.to_currency_name = data.rates[currCode].currency_name
    converter.rate = data.rates[currCode].rate
    converter.updated_date = data.updated_date

    return converter
  }

  private filterAnalytic(collect: CurrencyQuake[] | CurrencyConverter[], count?: number) {
    count = (count && count > collect.length) ? collect.length : count || 0 ;    
    const list=[...collect.slice(0, count)];

    return list;
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticStoreServices {
  analyticService: AnalyticStoreService
  analyticInsurService: AnalyticInsuranceService  

  constructor (private apiService: ApiAnalyticService) {
      this.analyticService = new AnalyticStoreService(this.apiService)
      this.analyticInsurService = new AnalyticInsuranceService(this.apiService)      
  }
} 