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
  jobApplication!: JobApplication | null;
  isLoading = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly jobApplicationService: JobApplicationService,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Récupère l'ID depuis l'URL
    if (id) {
      try {
        this.jobApplication =
          await this.jobApplicationService.getJobApplicationById(id);
      } catch {
        console.error('Error while fetching job application details');
        this.router.navigate([HOME]);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
