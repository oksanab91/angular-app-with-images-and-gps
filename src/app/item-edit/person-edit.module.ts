import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
    declarations: [
        PersonEditComponent,
        ImageModalComponent
    ],
    imports: [
        // CommonModule,
        ReactiveFormsModule,
        FormsModule,        
        SharedModule,        
        RouterModule.forChild([{ path: '', component: PersonEditComponent}])
    ]    
  })
  export class PersonEditModule { }