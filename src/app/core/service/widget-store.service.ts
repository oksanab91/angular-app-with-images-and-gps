import { Injectable } from '@angular/core';
import { City, FlightFilter, Flight, IFlights, Iata, JobRemote, JobFilter, JobGreenhouse, JobBasic } from '@models/models';
import { ApiFlightWidgetService } from './api-flight-widget.service';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { JobSearchService } from './api-job-search.service';
import configJobs from 'src/app/config.job-search-api';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})
export class WidgetStoreService {
  private cities: City[] = [];
  private iata: Iata[] = [];  
  private jobCategories: any[] = [];
  private cities$: Observable<City[]> = null;
  private iata$: Observable<Iata[]> = null;  
  private jobCategories$: Observable<any[]> = null;

  constructor(private widgetService: ApiFlightWidgetService, 
              private jobSearchService: JobSearchService,
              private helper: HelperService) {
  }

  getIata(code: string): Iata {
    if(!code) return null;
    return this.iata.find(item => item.iata_code == code);
  }

  getCity(code: string): City {    
    if (!code) return null;        
    return this.cities.find(item => item.code == code);       
  }

  loadCities(): Observable<City[]> {
    return this.cityList;
  }

  loadIatas(): Observable<Iata[]> {
    return this.iataList;
  }

  loadJobCategories(): Observable<any[]> {
    return this.jobCategoryList;
  }

  private get cityList(): Observable<City[]> {    
    if (this.cities.length > 0) return of(this.cities);
    else if(this.cities$) return this.cities$;

    this.cities$ = this.getCities();
    return this.cities$;
  }

  private get iataList(): Observable<Iata[]> {       
    if (this.iata.length > 0) return of(this.iata);
    else if(this.iata$) return this.iata$;

    this.iata$ = this.getIatas();
    return this.iata$;
  }

  private get jobCategoryList(): Observable<any[]> {    
    if (this.jobCategories.length > 0) return of(this.jobCategories);
    else if(this.jobCategories$) return this.jobCategories$;

    this.jobCategories$ = this.getJobCategories();
    return this.jobCategories$;
  }

  //============= Flights ===================
  mapCity(city: City): City {
    const url = this.widgetService.getMappedCityUrl(city);    
    return {...city, googleMapUrl: url, name: !city.name ? '' : city.name };    
  }

  getChipFlights(filter: FlightFilter) {
    return this.widgetService.fetchChipFlights(filter).pipe(map(
      response => {
        if(response['success']) {                      
          const data = response['data'];
          const flightsCollect = this.mapFlightsCollection(data, filter);

          return this.filterFlights(flightsCollect, filter.displayCount);
        }            
        else{
          return "Server returned error " + response['error'];
        }    
      }
    ),
    catchError(error => { return of(null); })
    );
  }

  getDirectFlights(filter: FlightFilter) {    
    return this.widgetService.fetchDirectFlights(filter).pipe(map(
      response => {         
        if(response['success']) {
          const data = response['data'];
          const flightsCollect = this.mapFlightsCollection(data, filter);
        
          return this.filterFlights(flightsCollect, filter.displayCount);
        }
        else{
          return "Server returned error " + response['error'];
        }
      }
    ),
    catchError(error => { return of(null); })
    );
  }  

  private getCities() {
    return this.widgetService.fetchCities().pipe(map(
      (response) => {        
        const data = response.map(item => this.mapCity(item) );        
        this.cities = [...data];

        return this.cities;
      }),
      shareReplay(),    
      catchError(error => {
        console.log(error);
        return of([]); 
      })
    );
  }

  getIatas(): Observable<Iata[]> {
    return this.widgetService.fetchIata().pipe(
      map(response => {                
        this.iata = [...response];

        return this.iata;
      }),
    catchError(error => { return of([]); })
    );
  }

  getRemotiveJobSearch(filter: JobFilter) {
    return this.jobSearchService.fetchRemotiveJobSearch(filter).pipe(map(      
      response => {        
        if(response['jobs']) {          
          const jobs = response['jobs'];
          const data = this.filterJobs(jobs, 10);
          return [...data];
        }
        else{
          return "Server returned error " + response['error'];
        }
      }
    ),
    catchError(error => {
      console.log(error)
      return of(null); })
    );
  }  

  getGithubJobSearch() {
    return this.jobSearchService.fetchGithubJobs().pipe(map(      
      response => {            
        const data = this.filterGithubJobs(response, 10);
        return [...data];        
      }
    ),
    catchError(error => {
      console.log(error)
      return of(null); })
    );
  }

  getJobCategories(): Observable<any[]> {
    return this.jobSearchService.fetchJobCategory().pipe(
      map( response => {              
        this.jobCategories = [...response['jobs']]
        return this.jobCategories
      }),     
      catchError(error => { return of([]); })
    );
  }
  
  getGreenhouseJobs(filter: JobFilter) {    
    return this.jobSearchService.fetchGreenHouseJobs(filter).pipe(map(      
      response => {        
        if(response['jobs']) {          
          let jobs = response['jobs'];
         
          jobs = jobs.map(i => {
            return {...i, location: i.location['name']}           
          }) as JobGreenhouse[]

          const data = this.filterGreenhouseJobs(jobs, 10);
          return [...data];
        }
        else{
          return "Server returned error " + response['error'];
        }
      }
    ),
    catchError(error => {
      console.log(error)
      return of(null); })
    );
  }  

  private mapRemoteJob(job: JobRemote): JobBasic {
    return {
      id: job.id,
      url: job.url,
      title: job.title,
      salary: job.salary,          
      location: job.candidate_required_location,
      date: job.publication_date,
      description: job.description,
      company_name: job.company_name,
      category: '',
      tags: [],
      job_type: '',
      site: configJobs.remotive_host //'Remotive.io'         
    }       
  }

  private filterGreenhouseJobs(collect: JobGreenhouse[], count?: number) {
    let list = collect.filter(val =>
      {
        if(val.location.toLowerCase() === 'anywhere' || val.location.toLowerCase() === 'remote'){
          return this.helper.calculateDateDiff('', val.updated_at) < 8
        }
      }          
    )      
    .sort((a, b) => {
      const aDate = new Date(a.updated_at).getTime()
      const bDate = new Date(b.updated_at).getTime()        
      return bDate - aDate
    })
    .map(v => {
      return {
        id: v.id,
        url: v.absolute_url,
        title: v.title,
        salary: v.salary,          
        location: v.location,
        date: v.updated_at,
        description: v.description,
        company_name: v.company_name,
        category: '',
        tags: [],
        job_type: '',
        site: configJobs.greenhouse_host //'Greenhouse.io'         
      }                
    })

    count = (count && count > list.length) ? list.length : count || 0 ;    
    let cl  =[...list.slice(0, count)];

    return cl;
  }

  private filterGithubJobs(collect, count?: number) {    
    try{
      let list = collect.filter((val: JSON) => {
          if(val['location'].toLowerCase().includes('remote')){
            return this.helper.calculateDateDiff('', val['created_at']) < 15
          }
        }          
      )
      .map(v => {
        return {
          id: v['id'],
          title: v['title'],
          url: v['url'],
          date: v['created_at'],
          company_name: v['company'],          
          location: v['location'],        
          description: v['description'],
          job_type: v['type'],        
          tags: [v['company_logo'], v['company_url']],
          salary: '',
          category: '',
          site: configJobs.githubapi_host
        }                
      })      
          
      count = (count && count > list.length) ? list.length : count || 0 ;    
      let cl  =[...list.slice(0, count)];

      return cl;
    }
    catch(err){
      console.log(err)
    }
  } 

  private filterJobs(collect: JobRemote[], count?: number) {
    let list = collect.filter(val => {
      if(val.candidate_required_location.toLowerCase() === 'anywhere'){        
        return this.helper.calculateDateDiff('', val.publication_date) < 8      
      }
    })
    count = (count && count > list.length) ? list.length : count || 0 ;    
    let cl  =[...list.slice(0, count)].map(j => this.mapRemoteJob(j))

    return cl;
  }  
  
  private mapFlightsCollection(data: JSON, filter: FlightFilter) {
    let flightsArr: Flight[] = [];
    let flightsCollect: IFlights[] = [];
    let mapCollect = new Map<string, Object>()
    let mapFlights = new Map<string, Flight>();
                
    for (let value in data) {  
      mapCollect.set(value, data[value]);  
    }
    
    mapCollect.forEach((value, key) => {
      let flights: Flight[] = [];

      for (let key in value) {  
        mapFlights.set(key, value[key]);                
      }      
    
      mapFlights.forEach((flight: Flight, k: string) => {
        const cityOrigin = this.getCity(filter.origin);
        const cityDest = this.getCity(key);
        const airline = this.getIata(flight.airline)?.name;
        
        flights = [...flights, 
          {...flight, 
            destination: key, origin: filter.origin, cityOrigin: cityOrigin, 
            cityDestination: cityDest, currency: filter.currency, airline: airline}
        ];
      });

      flightsCollect = [...flightsCollect, {destination: key, flights: flights}];
      flightsArr = [...flightsArr, ...flights];
    });

    return flightsArr;
  }

  private filterFlights(collect: Flight[], count?: number) {
    count = (count && count > collect.length) ? collect.length : count || 0 ;    
    const cl=[...collect.slice(0, count)];
    const list = cl.sort((a, b) => {return a.price - b.price});

    return list;
  }
  
}
