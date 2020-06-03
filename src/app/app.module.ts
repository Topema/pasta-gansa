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
import { BuySharesDialogComponent } from './buy-shares-dialog/buy-shares-dialog.component';
import { SelectorComponent } from './selector/selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SellSharesDialogComponent } from './sell-shares-dialog/sell-shares-dialog.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarteraAccionesComponent,
    GlobalContainerComponent,
    TableSharesComponent,
    BuySharesDialogComponent,
    SelectorComponent,
    SellSharesDialogComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
