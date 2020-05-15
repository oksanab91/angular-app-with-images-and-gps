import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonListStore, WidgetStore, personListSelect, flightsSelect } from '@core/store';
import { FlightFilter, Person, Flight } from '../../models';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{  
  filter: FlightFilter;
  subscription: Subscription;
  personList$: Observable<Person[]>;
  widgetList$: Observable<Flight[]>;

  constructor(public store: PersonListStore, public widgetStore: WidgetStore) { }

  ngOnInit() {
    this.filter = new FlightFilter();
    this.filter = {...this.filter, destination: 'HRK', origin: 'TLV', displayCount: 5, currency: 'USD'};    
    this.widgetStore.setFilter(this.filter);
    
    this.personList$ = personListSelect(this.store.state$)
    this.widgetList$ = flightsSelect(this.widgetStore.state$)
    
    this.getChipFlights();
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
  
  getDirectFlights() {    
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.widgetStore.getDirectFlightsFull().subscribe();
  }

  getChipFlights() {    
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.widgetStore.getChipFlightsFull().subscribe();
  }
  
}
