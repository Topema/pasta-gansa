import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarteraAccionesComponent } from './cartera-acciones/cartera-acciones.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'login', component: LoginComponent, data: {animation: 'login'} },
  {path: 'miCartera', component: CarteraAccionesComponent, data: {animation: 'miCartera'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
