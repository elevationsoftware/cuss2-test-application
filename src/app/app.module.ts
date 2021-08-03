import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { Cuss2Module, ICuss2ServiceOptions } from '@elevated-libs/cuss2-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Cuss2Module.forRoot(environment.cuss2Config as ICuss2ServiceOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
