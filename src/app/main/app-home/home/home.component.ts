import { Component, OnInit } from '@angular/core';
import { PersonListStore, WidgetStore, WidgetJobSearchStore, 
          personListSelect$, flightsSelect$, showSelect$, 
          showJobsSelect$, remotejobsSelect$, 
          greenhouseJobsSelect$, githubJobsSelect$,
        } from '@core/store';
import { FlightFilter, Person, Flight, JobFilter, JobBasic } from '../../../models';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{  
  filter: FlightFilter;
  jobsFilter: JobFilter;
  widgetsShow$: Observable<boolean>;
  widgetsJobsShow$: Observable<boolean>;
  personList$: Observable<Person[]>;
  widgetList$: Observable<Flight[]>;
  widgetJobsList$: Observable<JobBasic[]>;
  values$: Observable<any>;
  widgettoDisplay = 'remotivejobs'; //'greenhousejobs' 'chipflights' 'remotivejobs' 'githubjobs'
  //widget setting - to display one type of widgets ??
  showFlights = this.widgettoDisplay === 'chipflights' || this.widgettoDisplay === 'directflights';
  showJobs = this.widgettoDisplay === 'remotivejobs' || this.widgettoDisplay === 'greenhousejobs' || this.widgettoDisplay === 'githubjobs';

  constructor(public store: PersonListStore, public widgetStore: WidgetStore, public widgetJobsStore: WidgetJobSearchStore) { }

  ngOnInit() {    
    this.initWidgetFlights()
    this.initWidgetJobs()

    this.personList$ = personListSelect$(this.store.state$)
    this.widgetList$ = flightsSelect$(this.widgetStore.state$)
    if(this.widgettoDisplay === 'remotivejobs')
      this.widgetJobsList$ = remotejobsSelect$(this.widgetJobsStore.state$)
    else if(this.widgettoDisplay === 'greenhousejobs')
      this.widgetJobsList$ = greenhouseJobsSelect$(this.widgetJobsStore.state$)
    else if(this.widgettoDisplay === 'githubjobs')
      this.widgetJobsList$ = githubJobsSelect$(this.widgetJobsStore.state$)
   
    this.getCombine()
  }

  initWidgetFlights() {
    this.filter = new FlightFilter(); //CNS, DRW, NAN
    this.filter = {...this.filter, destination: 'CNS', origin: 'SYD', displayCount: 10, currency: 'AUD'};    
    this.widgetStore.setFilter(this.filter);
    this.widgetStore.setShow(false);
    this.widgetsShow$ = showSelect$(this.widgetStore.state$)   
  }

  initWidgetJobs() {
    this.jobsFilter = new JobFilter();
    this.jobsFilter = {...this.jobsFilter,
      candidate_required_location: 'anywhere', 
      category: 'software-dev', 
      tags: 'c-sharp,.net,angular,javascript,css,php,java', 
      displayCount: 60};

    this.widgetJobsStore.setFilter(this.jobsFilter);
    this.widgetJobsStore.setShow(false);
    this.widgetsJobsShow$ = showJobsSelect$(this.widgetJobsStore.state$)    
  }
  
  getCombine() {
    this.values$ = forkJoin(
      this.getChipFlights(),
      this.getDirectFlights(),
      this.getJobs(),
      this.getGreenhouseJobs(),
      this.getGithubJobs()
    ).pipe(
      map(([first, second, third, fourth, fifth]) => {
        return { first, second, third, fourth, fifth };
      })
    );
  }
  getJobs() {
    if(this.widgettoDisplay === 'remotivejobs') return this.widgetJobsStore.getRemotiveJobSearch();
    return of(null)
  }

  getGreenhouseJobs() {
    if(this.widgettoDisplay === 'greenhousejobs') return this.widgetJobsStore.getGreenhouseJobs();
    return of(null)
  }

  getGithubJobs() {    
    if(this.widgettoDisplay === 'githubjobs') return this.widgetJobsStore.getGithubJobs();
    return of(null)
  }

  getDirectFlights() {
    if(this.widgettoDisplay === 'directflights') return this.widgetStore.getDirectFlightsFull();
    return of(null)
  }

  getChipFlights() {
    if(this.widgettoDisplay === 'chipflights') return this.widgetStore.getChipFlightsFull();
    return of(null)    
  }
  
}
