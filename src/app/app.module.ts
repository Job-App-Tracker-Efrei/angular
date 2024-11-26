import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { JobApplicationTableComponent } from '@pages/home/components/job-application-table/job-application-table.component';
import { MetricsComponent } from '@pages/home/components/metrics/metrics.component';
import { HomeComponent } from '@pages/home/home.component';

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
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
