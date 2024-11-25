import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HOME, LOGIN, REGISTER } from '@constants/routes';

import { AuthGuard } from '@core/guard/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: HOME,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: LOGIN,
    component: LoginComponent,
  },
  {
    path: REGISTER,
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
