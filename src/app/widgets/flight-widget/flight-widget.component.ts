import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightFilter } from '@models/models';
import { Subscription } from 'rxjs';
import { WidgetStore } from '@core/store/widget.store';

@Component({
  selector: 'app-flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss']
})
export class FlightWidgetComponent implements OnInit, OnDestroy {  
  iata$;
  filter: FlightFilter;
  subscription: Subscription;
  
  constructor(public store: WidgetStore) {
  }

  ngOnInit(): void {    
    this.filter = new FlightFilter();
    this.filter = {...this.filter, destination: 'HRK', origin: 'TLV', displayCount: 6, currency: 'USD'};    
    this.store.setFilter(this.filter);

    this.getChipFlights();
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
  getIata() {
    // this.iata$ = this.service.getIata().pipe(tap(
    //   response => {
    //       console.log(response);               
    //   }
    // ));
    // this.iata$.subscribe();

  }

  getDirectFlights() {    
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store.getDirectFlightsFull().subscribe();
  }

  getChipFlights() {    
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store.getChipFlightsFull().subscribe();
  }

  trackByFn(index, item) {
    return index;
  }

}
