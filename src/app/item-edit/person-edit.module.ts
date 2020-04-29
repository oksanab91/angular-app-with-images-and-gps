import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
    declarations: [
        PersonEditComponent,
        ImageModalComponent
    ],
    imports: [        
        SharedModule,        
        RouterModule.forChild([{ path: '', component: PersonEditComponent }])        
    ]      
  })
  export class PersonEditModule { }