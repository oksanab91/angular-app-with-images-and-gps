import { Component } from '@angular/core';
import { WidgetStore, WidgetJobSearchStore, jobsMessageSelect } from '@core/store';
import { AlertService } from '@core/service';

@Component({
  selector: 'nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent {
  widgetsShow: boolean
  constructor(private widgetStore: WidgetStore, 
              private widgetJobStore: WidgetJobSearchStore, 
              private alertService: AlertService) { }
  
  onWidgetsShow() {
    this.widgetsShow = !this.widgetsShow;
    this.widgetStore.setShow(this.widgetsShow);    
    this.widgetJobStore.setShow(this.widgetsShow);

    if(this.widgetsShow) this.alertService.set(jobsMessageSelect(this.widgetJobStore.state));
    else this.alertService.reset();    
  }

}
