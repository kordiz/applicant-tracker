import { readJobsFile } from '@/lib/fs/jobsFile';
import ArchiveShell from '@/components/archive/ArchiveShell';

export default async function ArchivePage() {
  const jobs = await readJobsFile();
  const archived = jobs.filter((j) => j.isArchived);
  return <ArchiveShell jobs={archived} />;
}
