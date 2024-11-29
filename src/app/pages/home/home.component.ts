import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  jobModal: JobApplication | null = null;
  showAddJobApplicationForm = false;
  showModal = false;

  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.jobApplications =
      await this.jobApplicationService.getJobApplications();

    this.updateMetrics();
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

  openAddOrEditJobModal(jobId?: string) {
    if (jobId) {
      const job = this.jobApplications.find((item) => item.id === jobId);
      if (!job) {
        this.toastr.error('Job application not found');
        return;
      }
      this.jobModal = job;
    }
    this.showModal = true;
  }

  closeAddOrEditJobModal() {
    this.showModal = false;
    this.jobModal = null;
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

  editJobApplication(data: { id: string; form: FormGroup }): void {
    this.jobApplicationService.updateJobApplication(data.id, {
      ...data.form.value,
      date: new Date(data.form.value.date),
      lastUpdate: new Date(data.form.value.lastUpdate),
    });
    this.jobApplications = this.jobApplications.map((job) =>
      job.id === data.id ? { ...data.form.value, id: data.id } : job,
    );
    this.updateMetrics();
    this.closeAddOrEditJobModal();
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
