import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonComponent } from './person/person.component';
import { CardPlusComponent } from './card-plus/card-plus.component';
import { NavSearchComponent } from './nav-search/nav-search.component';

@NgModule({
    declarations: [
        PersonListComponent,
        PersonComponent,
        CardPlusComponent,
        NavSearchComponent
    ],
    imports: [
        CommonModule,        
        SharedModule,        
        RouterModule.forChild([{ path: '', component: PersonListComponent }])        
    ]      
  })
  export class PersonListModule { }