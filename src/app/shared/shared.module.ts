import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],  
  exports: [    
    AlertComponent
  ]
})
export class SharedModule { }
