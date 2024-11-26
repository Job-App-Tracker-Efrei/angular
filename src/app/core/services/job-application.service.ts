import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

import { type JobApplication } from 'src/types/job-application.type';

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private readonly collectionName = 'jobApplications';

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly auth: AngularFireAuth,
  ) {}

  async addJobApplication(
    jobApplication: Omit<JobApplication, 'userId'>,
  ): Promise<void> {
    return await this.auth.currentUser.then((user) => {
      if (!user) throw new Error('User not found');
      const userId = user.uid;
      const data = { ...jobApplication, userId };
      const docRef = this.firestore.collection(this.collectionName).doc();
      return docRef.set(data);
    });
  }

  async getJobApplications(): Promise<JobApplication[]> {
    const user = await this.auth.currentUser;
    if (!user) throw new Error('User not found');
    const userId = user.uid;

    return await firstValueFrom(
      this.firestore
        .collection<JobApplication>(this.collectionName, (ref) =>
          ref.where('userId', '==', userId),
        )
        .valueChanges(),
    );
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
    return await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }
}
