import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { JobStatusDirective } from '@directives/job-status.directive';

import { StatusLabelPipe } from '@pipes/status-label.pipe';

import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { AddJobModalComponent } from '@pages/home/components/add-job-modal/add-job-modal.component';
import { EditJobModalComponent } from '@pages/home/components/edit-job-modal/edit-job-modal.component';
import { JobApplicationTableComponent } from '@pages/home/components/job-application-table/job-application-table.component';
import { MetricsComponent } from '@pages/home/components/metrics/metrics.component';
import { HomeComponent } from '@pages/home/home.component';
import { JobApplicationDetailsComponent } from '@pages/job-application/job-application-details.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    JobApplicationTableComponent,
    MetricsComponent,
    JobApplicationDetailsComponent,
    AddJobModalComponent,
    EditJobModalComponent,
    JobStatusDirective,
    StatusLabelPipe,
  ],
  imports: [
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
