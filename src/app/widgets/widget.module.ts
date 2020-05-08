import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlightWidgetComponent } from './flight-widget/flight-widget.component';
import { WidgetComponent } from './widget/widget.component';


@NgModule({
    declarations: [
        FlightWidgetComponent,
        WidgetComponent
    ],
    imports: [
        CommonModule,                
        RouterModule.forChild([{ path: '', component: FlightWidgetComponent}])
    ]    
  })
  export class WidgetModule { }