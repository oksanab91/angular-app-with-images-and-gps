import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonList } from './person-list/person-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ImageComponent } from './image/image.component';


const routes: Routes = [
  { path: 'person-list', component: PersonList },
  { path: 'person-list/edit/:id', component: PersonEditComponent },
  { path: 'person-list/add/:id', component: PersonEditComponent },
  { path: 'image/:id', component: ImageComponent },  
  { path: '', redirectTo: '/person-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
