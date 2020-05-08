import { Component, OnInit } from '@angular/core';
import { FlightWidgetService } from '@core/service/flight-widget.service';
import { map } from 'rxjs/operators';
import { FlightFilter, Flight } from '@models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss']
})
export class FlightWidgetComponent implements OnInit {
  flights$: Observable<Flight[]>;
  iata$;
  filter: FlightFilter;
  
  constructor(private service: FlightWidgetService) { }

  ngOnInit(): void {
    this.filter = new FlightFilter();
    this.filter = {...this.filter, destination: 'HRK', origin: 'TLV'};
  
    this.getChipFlights();
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
    this.flights$ = this.service.getDirectFlights(this.filter).pipe(map(
      response => {          
          return this.filterFlights(response, 6);             
      }
    ));
  }

  getChipFlights() {
    this.flights$ = this.service.getChipFlights(this.filter).pipe(map(
      response => {          
          return this.filterFlights(response, 6);             
      }
    ));
  }

  filterFlights(collect: Flight[], count?: number) {
    count = (count && count > collect.length) ? collect.length : count || 0 ;    
    const cl=[...collect.slice(0, count)];

    const list = cl.sort((a, b) => {return a.price - b.price});

    console.log(list);
    return list;
  }

  trackByFn(index, item) {
    return index;
  }

}
