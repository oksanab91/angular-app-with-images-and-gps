import { Component, Input } from '@angular/core';
import { Flight } from '@models/models';
import { fadeInAnimation } from 'src/app/app-animations';

@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss'],  
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class FlightWidgetComponent {
  @Input() flights: Flight[];

  constructor() {
  }
  
  trackByFn(index, item) {
    return index;
  }

}
