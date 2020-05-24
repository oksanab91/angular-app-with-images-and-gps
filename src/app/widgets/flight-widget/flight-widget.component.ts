import { Component, Input } from '@angular/core';
import { Flight } from '@models/models';
import { slideListInOutAnimation } from 'src/app/app-animations/slideListInOut.animation';

@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.scss'],  
  animations: [slideListInOutAnimation],
  host: { '[@slideListInOutAnimation]': '' }
})
export class FlightWidgetComponent {
  @Input() flights: Flight[];

  constructor() {
  }
  
  trackByFn(index, item) {
    return index;
  }

}
