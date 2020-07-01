import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FlightWidgetsComponent } from './flight-widgets/flight-widgets.component';
import { FlightWidgetComponent } from './flight-widget/flight-widget.component';
import { JobWidgetComponent } from './job-widget/job-widget.component';
import { JobWidgetsComponent } from './job-widgets/job-widgets.component';



@NgModule({
    declarations: [
        FlightWidgetsComponent,
        FlightWidgetComponent,
        JobWidgetComponent,
        JobWidgetsComponent        
    ],
    imports: [
        SharedModule,
        RouterModule        
    ],
    exports: [        
        FlightWidgetsComponent,
        JobWidgetsComponent
    ]    
  })
  export class WidgetModule { }