import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { PersonListModule } from '../item-list/person-list.module';
import { WidgetModule } from '../widgets/widget.module';


@NgModule({
  declarations: [HomeComponent, NavSearchComponent],
  imports: [    
    SharedModule,
    PersonListModule,
    WidgetModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ]
})
export class HomeModule { }
