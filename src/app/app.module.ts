import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { AlertComponent } from './alert/alert.component';
import { PersonComponent } from './person/person.component';
import { CardPlusComponent } from './card-plus/card-plus.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { ImageComponent } from './image/image.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,    
    PersonEditComponent, 
    AlertComponent, 
    PersonComponent, 
    CardPlusComponent, 
    NavSearchComponent, 
    ImageComponent, ImageModalComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
