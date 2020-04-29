import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PersonListModule } from './item-list/person-list.module';
import { PersonEditModule } from './item-edit/person-edit.module';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    PersonListModule,
    PersonEditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
