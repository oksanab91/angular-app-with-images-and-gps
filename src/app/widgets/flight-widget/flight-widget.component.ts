import { Component, OnInit } from '@angular/core';
import { FlightFilter, Flight } from '@models/models';
import { Observable } from 'rxjs';
import { WidgetStore } from '@core/store/widget.store';

@Component({
  selector: 'app-flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss']
})
export class FlightWidgetComponent implements OnInit {
  flights$: Observable<Flight[]>;
  iata$;
  filter: FlightFilter;
  
  constructor(public store: WidgetStore) { }

  ngOnInit(): void {
    this.filter = new FlightFilter();
    this.filter = {...this.filter, destination: 'HRK', origin: 'TLV', displayCount: 6};    
    this.store.setFilter(this.filter);

    this.getDirectFlights();
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
    this.store.getDirectFlights();
  }

  getChipFlights() {
    this.store.getChipFlights();
  }

  trackByFn(index, item) {
    return index;
  }

}
