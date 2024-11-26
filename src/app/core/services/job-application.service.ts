import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  ) {}

  async addJobApplication(
    jobApplication: Omit<JobApplication, 'userId' | 'id'>,
  ): Promise<void> {
    return await this.auth.currentUser.then((user) => {
      if (!user) throw new Error('User not found');
      const docRef = this.firestore.collection(this.collectionName).doc();
      const data = { ...jobApplication, userId: user.uid, id: docRef.ref.id };
      return docRef.set(data);
    });
  }

  async getJobApplications(): Promise<JobApplication[]> {
    const user = await this.auth.currentUser;
    if (!user) throw new Error('User not found');

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
      console.error('Job application not found');
      throw new Error('Job application not found');
    }

    const data = jobApplication.data();
    if (!data) {
      console.error('Job application data not found');
      throw new Error('Job application data not found');
    }

    return {
      ...data,
      date: new Date(data.date.seconds * 1000),
      lastUpdate: new Date(data.lastUpdate.seconds * 1000),
    };
  }

  async updateJobApplication(
    id: string,
    jobApplication: JobApplication,
  ): Promise<void> {
    return await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update(jobApplication);
  }

  async deleteJobApplication(id: string): Promise<void> {
    const jobApplication = await firstValueFrom(
      this.firestore.collection(this.collectionName).doc(id).get(),
    );
    if (!jobApplication.exists) {
      console.error('Job application not found');
      return;
    }

    return await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }
}
