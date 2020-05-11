import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonComponent } from './person/person.component';
import { CardPlusComponent } from './card-plus/card-plus.component';

@NgModule({
    declarations: [
      PersonListComponent, PersonComponent, CardPlusComponent               
    ],
    imports: [
      CommonModule,      
      RouterModule,
      SharedModule        
    ],
    exports: [PersonListComponent]      
  })
  export class PersonListModule { }