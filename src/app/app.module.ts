import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { CarteraAccionesComponent } from './cartera-acciones/cartera-acciones.component';
import { GlobalContainerComponent } from './global-container/global-container.component';
import { TableSharesComponent } from './table-shares/table-shares.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarteraAccionesComponent,
    GlobalContainerComponent,
    TableSharesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
