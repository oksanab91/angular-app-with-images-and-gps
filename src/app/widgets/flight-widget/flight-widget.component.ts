import { Component, Input } from '@angular/core';
import { Flight } from '@models/models';

@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss']
})
export class FlightWidgetComponent {
  @Input() flights: Flight[];

  constructor() {
  }
  
  trackByFn(index, item) {
    return index;
  }

}
