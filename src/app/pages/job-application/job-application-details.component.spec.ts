import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';

import { JobStatusDirective } from '@directives/job-status.directive';

import { JobApplicationService } from '@core/services/job-application.service';

import { FooterComponent } from 'src/app/footer/footer.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { JobApplicationStatus } from 'src/types/job-application.type';

import { JobApplicationDetailsComponent } from './job-application-details.component';

describe('JobApplicationDetailsComponent', () => {
  let component: JobApplicationDetailsComponent;
  let fixture: ComponentFixture<JobApplicationDetailsComponent>;
  let mockJobApplicationService: jasmine.SpyObj<JobApplicationService>;

  beforeEach(() => {
    mockJobApplicationService = jasmine.createSpyObj('JobApplicationService', [
      'getJobApplicationById',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        JobApplicationDetailsComponent,
        HeaderComponent,
        FooterComponent,
        JobStatusDirective,
      ],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: {
            apiKey: 'test-api-key',
            authDomain: 'test-project.firebaseapp.com',
            projectId: 'test-project',
            storageBucket: 'test-project.appspot.com',
            messagingSenderId: 'test-id',
            appId: 'test-app-id',
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
        { provide: JobApplicationService, useValue: mockJobApplicationService },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationDetailsComponent);
    component = fixture.componentInstance;
    component.jobApplication = {
      id: '123',
      userId: '123',
      status: JobApplicationStatus.pending,
      company: 'Test Company',
      position: 'Software Engineer',
      date: new Date(),
      lastUpdate: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
