import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HOME } from '@constants/routes';

import { JobApplicationService } from '@core/services/job-application.service';

import { JobApplication } from 'src/types/job-application.type';

@Component({
  selector: 'app-job-application-details',
  templateUrl: './job-application-details.component.html',
})
export class JobApplicationDetailsComponent implements OnInit {
  jobApplication!: JobApplication;
  isLoading = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly jobApplicationService: JobApplicationService,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.jobApplication =
          await this.jobApplicationService.getJobApplicationById(id);
      } catch {
        this.router.navigate([HOME]);
      } finally {
        this.isLoading = false;
      }
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
