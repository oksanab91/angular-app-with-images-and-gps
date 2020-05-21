import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './app-home/home/home.component';
import { NavSearchComponent } from './app-home/nav-search/nav-search.component';
import { PersonListModule } from '../item-list/person-list.module';
import { WidgetModule } from '../widgets/widget.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavMainComponent } from '../nav-main/nav-main.component';


@NgModule({
  declarations: [HomeComponent, NavSearchComponent, MainLayoutComponent, NavMainComponent],
  imports: [    
    SharedModule,
    PersonListModule,    
    WidgetModule,    
    RouterModule.forChild([
      { path: '', component: MainLayoutComponent,
        children: [
          { path: '', component: HomeComponent },        
          { path: 'edit/:id',
            loadChildren: () => import('../item-edit/person-edit.module').then(m => m.PersonEditModule)
          },
          { path: 'add/:id',
            loadChildren: () => import('../item-edit/person-edit.module').then(m => m.PersonEditModule)
          }
        ]}     
    ])
  ]
})
export class MainModule { }
