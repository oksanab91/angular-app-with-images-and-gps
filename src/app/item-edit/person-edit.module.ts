import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ModalImageStore } from '@core/store';
import { ImageService } from '@core/service';

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
    ],
    providers: [ModalImageStore, ImageService]    
  })
  export class PersonEditModule { }