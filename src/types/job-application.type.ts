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
  date: string;
};
