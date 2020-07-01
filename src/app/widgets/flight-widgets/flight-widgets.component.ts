import { Component, Input } from '@angular/core';
import { Flight } from '@models/models';
import { slideListInOutAnimation } from 'src/app/app-animations/slideListInOut.animation';

@Component({
  selector: 'flight-widgets',
  templateUrl: './flight-widgets.component.html',
  styleUrls: ['./flight-widgets.component.scss'],  
  animations: [slideListInOutAnimation],
  host: { '[@slideListInOutAnimation]': '' }
})
export class FlightWidgetsComponent {
  @Input() flights: Flight[];

  constructor() {
  }
  
  trackByFn(index, item) {
    return index;
  }

}
