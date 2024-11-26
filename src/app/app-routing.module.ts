import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { HOME, JOB_APPLICATION, LOGIN, REGISTER } from '@constants/routes';

import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { HomeComponent } from '@pages/home/home.component';
import { JobApplicationDetailsComponent } from '@pages/job-application/job-application-details.component';

const routes: Routes = [
  {
    path: HOME,
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([LOGIN]) },
  },
  {
    path: JOB_APPLICATION,
    component: JobApplicationDetailsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([LOGIN]) },
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
