export interface JobApplication {
  id: string;
  userId: string;
  position: string;
  company: string;
  status: 'accepted' | 'rejected' | 'pending';
  date: string;
}
