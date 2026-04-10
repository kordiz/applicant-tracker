import { readJobsFile } from '@/lib/fs/jobsFile';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default async function HomePage() {
  const jobs = await readJobsFile();
  return <DashboardShell initialJobs={jobs} />;
}
