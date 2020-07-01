import { Component, Input } from '@angular/core';
import { JobBasic, JobGreenhouse } from '@models/models';

@Component({
  selector: 'job-widget',
  templateUrl: './job-widget.component.html',
  styleUrls: ['./job-widget.component.scss']
})
export class JobWidgetComponent {

  @Input() widget: JobBasic;
  show = false;  
  
  constructor() { }

  collapse() {
    this.show = !this.show;
  }

}
