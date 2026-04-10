export type JobStatus = 'APPLIED' | 'REJECTED' | 'INTERVIEW' | 'OFFER';
export type LocationType = 'Remote' | 'Hybrid' | 'On-site';

export interface Job {
  id: string;
  companyName: string;
  roleTitle: string;
  locationType: LocationType;
  status: JobStatus;
  history: { status: JobStatus; date: string }[];
  industryTags: string[];
  jobDescriptionUrl: string;
  resumeFilename: string | null;
  markdownFilename: string;
  nextActionDate: string | null;
  isArchived: boolean;
  salary: { target: string | null; offered: string | null };
  contact: { name: string | null; email: string | null; linkedIn: string | null };
}
