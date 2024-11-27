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
    { label: 'Job Applications', value: 10, icon: 'briefcase' },
    { label: 'Pending', value: 5, icon: 'hourglass-half' },
    { label: 'Accepted', value: 2, icon: 'check' },
    { label: 'Rejected', value: 3, icon: 'times' },
  ];

  jobApplications: JobApplication[] = [];
  showAddJobApplicationForm = false;
  jobApplicationForm!: FormGroup;
  showModal = false;

  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.jobApplications =
      await this.jobApplicationService.getJobApplications();

    this.jobApplicationForm = this.fb.group({
      company: ['', [Validators.required]],
      position: ['', [Validators.required]],
      status: [JobApplicationStatus.pending, [Validators.required]],
      date: [this.formatDate(new Date()), [Validators.required]],
      lastUpdate: [this.formatDate(new Date())],
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  addJobApplication(formGroup: FormGroup): void {
    if (!formGroup.valid) {
      if (formGroup.get('date')?.errors?.['required']) {
        this.toastr.error('Application date is required');
      } else {
        this.toastr.error('Please fill in all required fields');
      }
      return;
    }

    const jobApplication = {
      ...formGroup.value,
      date: new Date(formGroup.value.date),
      lastUpdate: new Date(),
    };

    this.jobApplicationService
      .addJobApplication(jobApplication)
      .then((success) => {
        if (!success) {
          this.toastr.error('Failed to add job application');
          return;
        }
        this.jobApplications = [...this.jobApplications, jobApplication];
        this.showModal = false;
        this.toastr.success('Job application added successfully');
      });
  }

  openAddJobModal(jobApplicationOrId?: JobApplication | string) {
    this.showModal = true;
    
    let jobToEdit: JobApplication | undefined;
    
    if (typeof jobApplicationOrId === 'string') {
      jobToEdit = this.jobApplications.find(job => job.id === jobApplicationOrId);
    } else {
      jobToEdit = jobApplicationOrId;
    }

    if (jobToEdit) {
      this.jobApplicationForm.patchValue({
        id: jobToEdit.id,
        company: jobToEdit.company,
        position: jobToEdit.position,
        status: jobToEdit.status,
        date: this.formatDate(new Date(jobToEdit.date)),
        lastUpdate: this.formatDate(new Date())
      });
    } else {
      this.jobApplicationForm.reset({
        status: JobApplicationStatus.pending,
        date: this.formatDate(new Date()),
        lastUpdate: this.formatDate(new Date())
      });
    }
  }

  closeAddJobModal() {
    this.showModal = false;
    this.jobApplicationForm.reset({
      status: JobApplicationStatus.pending,
      date: this.formatDate(new Date()),
      lastUpdate: this.formatDate(new Date())
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
