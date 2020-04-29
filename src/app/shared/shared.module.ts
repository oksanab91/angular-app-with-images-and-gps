import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
