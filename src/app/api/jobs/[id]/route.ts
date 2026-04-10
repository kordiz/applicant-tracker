import { NextRequest } from 'next/server';
import { readJobsFile, writeJobsFile } from '@/lib/fs/jobsFile';
import type { JobStatus } from '@/lib/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const patch = await request.json();

  const jobs = await readJobsFile();
  const index = jobs.findIndex((j) => j.id === id);

  if (index === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const existing = jobs[index];

  if (patch.status && patch.status !== existing.status) {
    patch.history = [
      ...existing.history,
      { status: patch.status as JobStatus, date: new Date().toISOString() },
    ];
  }

  jobs[index] = { ...existing, ...patch };
  await writeJobsFile(jobs);

  return Response.json(jobs[index]);
}
