import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppStartComponent } from './app-start/app-start.component';


const routes: Routes = [
  { path: 'start', component: AppStartComponent },
  { path: 'home' ,    
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }, 
  { path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
