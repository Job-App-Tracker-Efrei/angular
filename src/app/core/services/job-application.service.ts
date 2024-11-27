import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

import {
  type JobApplication,
  type JobApplicationResponse,
} from 'src/types/job-application.type';

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private readonly collectionName = 'jobApplications';

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly auth: AngularFireAuth,
    private readonly toastr: ToastrService,
  ) {}

  async addJobApplication(
    jobApplication: Omit<JobApplication, 'userId' | 'id'>,
  ): Promise<boolean> {
    const user = await this.auth.currentUser;
    if (!user) {
      this.toastr.error('User not found');
      return false;
    }

    const docRef = this.firestore.collection(this.collectionName).doc();
    const data = { ...jobApplication, userId: user.uid, id: docRef.ref.id };
    await docRef.set(data);
    this.toastr.success('Job application added');
    return true;
  }

  async getJobApplications(): Promise<JobApplication[]> {
    const user = await this.auth.currentUser;
    if (!user) {
      this.toastr.error('User not found');
      throw new Error('User not found');
    }

    const jobs = await firstValueFrom(
      this.firestore
        .collection<JobApplicationResponse>(this.collectionName, (ref) =>
          ref.where('userId', '==', user.uid),
        )
        .valueChanges(),
    );

    return jobs.map((job) => ({
      ...job,
      date: new Date(job.date.seconds * 1000),
      lastUpdate: new Date(job.lastUpdate.seconds * 1000),
    }));
  }

  async getJobApplicationById(id: string): Promise<JobApplication> {
    const jobApplication = await firstValueFrom(
      this.firestore
        .collection<JobApplicationResponse>(this.collectionName)
        .doc(id)
        .get(),
    );

    if (!jobApplication.exists) {
      this.toastr.error('Job application not found');
      throw new Error('Job application not found');
    }

    const data = jobApplication.data();
    if (!data) {
      this.toastr.error('Job application data not found');
      throw new Error('Job application data not found');
    }

    return {
      ...data,
      date: new Date(data.date.seconds * 1000),
      lastUpdate: new Date(data.lastUpdate.seconds * 1000),
    };
  }

  async updateJobApplication(id: string, data: JobApplication): Promise<void> {
    const jobApplication = await firstValueFrom(
      this.firestore.collection(this.collectionName).doc(id).get(),
    );
    if (!jobApplication.exists) {
      this.toastr.error('Job application not found');
      return;
    }

    return await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update(data);
  }

  async deleteJobApplication(id: string): Promise<boolean> {
    const jobApplication = await firstValueFrom(
      this.firestore.collection(this.collectionName).doc(id).get(),
    );
    if (!jobApplication.exists) {
      this.toastr.error('Job application not found');
      return false;
    }

    await this.firestore.collection(this.collectionName).doc(id).delete();
    this.toastr.success('Job application deleted');
    return true;
  }
}
