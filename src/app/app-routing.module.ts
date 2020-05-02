import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [  
  { path: 'home', component: HomeComponent },  
  { path: 'person-list', 
    loadChildren: () => import('./item-list/person-list.module').then(m => m.PersonListModule)    
  },
  { path: 'edit/:id',
    loadChildren: () => import('./item-edit/person-edit.module').then(m => m.PersonEditModule)
  },
  { path: 'add/:id',
    loadChildren: () => import('./item-edit/person-edit.module').then(m => m.PersonEditModule)
  },
  { path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
