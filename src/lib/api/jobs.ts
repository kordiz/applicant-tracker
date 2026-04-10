import type { Job } from '@/lib/types';

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function createJob(
  data: Pick<Job, 'companyName' | 'roleTitle' | 'locationType' | 'jobDescriptionUrl' | 'industryTags' | 'nextActionDate'>
): Promise<Job> {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create job');
  return res.json();
}

export async function updateJob(id: string, patch: Partial<Job>): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Failed to update job');
  return res.json();
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete job');
}

export async function uploadResume(jobId: string, file: File): Promise<{ filename: string }> {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobId', jobId);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Failed to upload resume');
  return res.json();
}
