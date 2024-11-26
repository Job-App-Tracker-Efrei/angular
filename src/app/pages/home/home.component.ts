import { Component } from '@angular/core';

import {
  type JobApplication,
  JobApplicationStatus,
} from 'src/types/job-application.type';
import { type Metric } from 'src/types/metric.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  metrics: Metric[] = [
    { label: 'Job Applications', value: 10 },
    { label: 'Pending', value: 5 },
    { label: 'Accepted', value: 2 },
    { label: 'Rejected', value: 3 },
  ];

  jobApplications: JobApplication[] = [
    {
      id: '1',
      company: 'Entreprise A',
      position: 'Développeur Frontend',
      status: JobApplicationStatus.accepted,
      date: '2023-11-10',
      userId: '1',
    },
    {
      id: '2',
      company: 'Entreprise B',
      position: 'Développeur Backend',
      status: JobApplicationStatus.pending,
      date: '2023-10-20',
      userId: '1',
    },
    {
      id: '3',
      company: 'Entreprise C',
      position: 'Data Analyst',
      status: JobApplicationStatus.rejected,
      date: '2023-09-15',
      userId: '1',
    },
  ];

  constructor() {}
}
