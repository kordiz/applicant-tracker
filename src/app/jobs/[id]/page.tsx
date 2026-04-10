import { readJobsFile } from '@/lib/fs/jobsFile';
import { readNoteFile } from '@/lib/fs/notesFile';
import JobDetailShell from '@/components/jobs/JobDetailShell';
import { notFound } from 'next/navigation';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobs = await readJobsFile();
  const job = jobs.find((j) => j.id === id);

  if (!job) notFound();

  const noteContent = await readNoteFile(id).catch(() => '');

  return <JobDetailShell job={job} initialNoteContent={noteContent} />;
}
