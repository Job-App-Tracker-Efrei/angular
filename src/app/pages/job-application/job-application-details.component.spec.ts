import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { JobApplicationService } from '@core/services/job-application.service';

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
      imports: [
        RouterTestingModule, // Provides Router and ActivatedRoute
      ],
      declarations: [JobApplicationDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
        { provide: JobApplicationService, useValue: mockJobApplicationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
