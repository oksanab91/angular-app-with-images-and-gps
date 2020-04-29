import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'person-list', 
    loadChildren: () => import('./item-list/person-list.module').then(m => m.PersonListModule)
  },
  { path: 'person-list/edit/:id',
    loadChildren: () => import('./item-edit/person-edit.module').then(m => m.PersonEditModule)
  },
  { path: 'person-list/add/:id',
    loadChildren: () => import('./item-edit/person-edit.module').then(m => m.PersonEditModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
