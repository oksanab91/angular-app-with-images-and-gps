import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStartComponent } from './app-start/app-start.component';

@NgModule({
  declarations: [
    AppComponent,
    AppStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
