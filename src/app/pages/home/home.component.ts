import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { JobApplicationService } from '@core/services/job-application.service';

import {
  type JobApplication,
  JobApplicationStatus,
} from 'src/types/job-application.type';
import { type Metric } from 'src/types/metric.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  metrics: Metric[] = [
    { label: 'Job Applications', value: 10 },
    { label: 'Pending', value: 5 },
    { label: 'Accepted', value: 2 },
    { label: 'Rejected', value: 3 },
  ];

  jobApplications: JobApplication[] = [];
  showAddJobApplicationForm = false;
  jobApplicationForm!: FormGroup;

  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.jobApplications =
      await this.jobApplicationService.getJobApplications();

    this.jobApplicationForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      status: [JobApplicationStatus.pending, Validators.required],
      date: [new Date(), Validators.required],
      lastUpdate: [new Date()],
    });
  }

  addJobApplication(): void {
    if (!this.jobApplicationForm.valid) {
      this.toastr.error('Invalid form');
      return;
    }

    this.jobApplicationService
      .addJobApplication(this.jobApplicationForm.value)
      .then((success) => {
        if (!success) return;
        this.jobApplications.push(this.jobApplicationForm.value);
        this.showAddJobApplicationForm = false;
      });
  }

  // updateJobApplication(jobApplication: JobApplication): void {
  //   this.jobApplicationService.updateJobApplication(
  //     jobApplication.id,
  //     jobApplication,
  //   );
  //   this.jobApplications = this.jobApplications.map((job) =>
  //     job.id === jobApplication.id ? jobApplication : job,
  //   );
  // }
  updateJobApplication(id: string): void {
    console.log('updateJobApplication', id);
  }

  deleteJobApplication(id: string): void {
    this.jobApplicationService.deleteJobApplication(id).then((success) => {
      if (!success) return;
      this.jobApplications = this.jobApplications.filter(
        (job) => job.id !== id,
      );
    });
  }
}
