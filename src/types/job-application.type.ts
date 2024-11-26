export enum JobApplicationStatus {
  'accepted' = 'accepted',
  'rejected' = 'rejected',
  'pending' = 'pending',
}

export type JobApplication = {
  id: string;
  userId: string;
  position: string;
  company: string;
  status: JobApplicationStatus;
  date: Date;
  lastUpdate: Date;
};

export type JobApplicationResponse = JobApplication & {
  date: { seconds: number; nanoseconds: number };
  lastUpdate: { seconds: number; nanoseconds: number };
};
