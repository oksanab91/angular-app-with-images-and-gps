import { Component, OnInit, Input } from '@angular/core';
import { JobGreenhouse } from '@models/models';
import { slideListInOutAnimation } from 'src/app/app-animations/slideListInOut.animation';

@Component({
  selector: 'job-widgets',
  templateUrl: './job-widgets.component.html',
  styleUrls: ['./job-widgets.component.scss'],
  animations: [slideListInOutAnimation],
  host: { '[@slideListInOutAnimation]': '' }
})
export class JobWidgetsComponent {
  
  @Input() jobs: JobGreenhouse[];

  constructor() {    
  }
  
  trackByFn(index, item) {    
    return index;
  }

}