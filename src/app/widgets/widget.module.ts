import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlightWidgetComponent } from './flight-widget/flight-widget.component';
import { WidgetComponent } from './widget/widget.component';



@NgModule({
    declarations: [
        FlightWidgetComponent,
        WidgetComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        FlightWidgetComponent
    ]    
  })
  export class WidgetModule { }