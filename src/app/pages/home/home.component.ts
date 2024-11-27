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
    { label: 'Job Applications', value: 0, icon: 'briefcase' },
    { label: 'Pending', value: 0, icon: 'clock' },
    { label: 'Accepted', value: 0, icon: 'check-circle' },
    { label: 'Rejected', value: 0, icon: 'x-circle' },
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

    this.updateMetrics();

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

  private updateMetrics(): void {
    const count = [0, 0, 0, 0];
    this.jobApplications.forEach((job) => {
      count[0]++;
      switch (job.status) {
        case JobApplicationStatus.pending:
          count[1]++;
          break;
        case JobApplicationStatus.accepted:
          count[2]++;
          break;
        case JobApplicationStatus.rejected:
          count[3]++;
          break;
        default:
          break;
      }
    });
    this.metrics[0].value = count[0];
    this.metrics[1].value = count[1];
    this.metrics[2].value = count[2];
    this.metrics[3].value = count[3];
  }

  openAddJobModal(jobApplicationOrId?: JobApplication | string) {
    this.showModal = true;

    let jobToEdit: JobApplication | undefined;

    if (typeof jobApplicationOrId === 'string') {
      jobToEdit = this.jobApplications.find(
        (job) => job.id === jobApplicationOrId,
      );
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
        lastUpdate: this.formatDate(new Date()),
      });
    } else {
      this.jobApplicationForm.reset({
        status: JobApplicationStatus.pending,
        date: this.formatDate(new Date()),
        lastUpdate: this.formatDate(new Date()),
      });
    }
  }

  closeAddJobModal() {
    this.showModal = false;
    this.jobApplicationForm.reset({
      status: JobApplicationStatus.pending,
      date: this.formatDate(new Date()),
      lastUpdate: this.formatDate(new Date()),
    });
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

    this.jobApplicationService.addJobApplication(jobApplication).then((job) => {
      if (!job) {
        this.toastr.error('Failed to add job application');
        return;
      }
      this.jobApplications = [...this.jobApplications, job];
      this.showModal = false;
      this.updateMetrics();
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
      this.updateMetrics();
    });
  }
}
