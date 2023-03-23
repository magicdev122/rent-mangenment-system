import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResidentsComponent } from './residents/residents.component';
import { ProfileComponent } from './profile/profile.component';
import { HouseComponent } from './house/house.component';
import { VariableComponent } from './house/add-variable/variable.component';

import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'residents', component: ResidentsComponent, canActivate: [AuthGuardService]},
  {path: 'house', component: HouseComponent, canActivate: [AuthGuardService]},
  {path: 'add-variable', component:VariableComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }