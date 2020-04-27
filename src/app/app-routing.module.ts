import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'person-list', component: PersonListComponent },
  { path: 'person-list/edit/:id', component: PersonEditComponent },
  { path: 'person-list/add/:id', component: PersonEditComponent },
  { path: 'image/:id', component: ImageComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
