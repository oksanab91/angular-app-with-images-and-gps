import { Component, Input } from '@angular/core';
import { JobBasic } from '@models/models';
import { slideListInOutAnimation } from 'src/app/app-animations/slideListInOut.animation';

@Component({
  selector: 'job-widgets',
  templateUrl: './job-widgets.component.html',
  styleUrls: ['./job-widgets.component.scss'],
  animations: [slideListInOutAnimation],
  host: { '[@slideListInOutAnimation]': '' }
})
export class JobWidgetsComponent {
  
  @Input() jobs: JobBasic[];

  constructor() {    
  }
  
  trackByFn(index, item) {    
    return index;
  }

}