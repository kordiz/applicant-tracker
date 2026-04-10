import { NextRequest } from 'next/server';
import { readJobsFile, writeJobsFile } from '@/lib/fs/jobsFile';
import { writeNoteFile } from '@/lib/fs/notesFile';
import { generateNoteTemplate } from '@/lib/templates/noteTemplate';
import { v4 as uuidv4 } from 'uuid';
import type { Job, JobStatus, LocationType } from '@/lib/types';

export async function GET() {
  const jobs = await readJobsFile();
  return Response.json(jobs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = uuidv4();
  const now = new Date().toISOString();

  const job: Job = {
    id,
    companyName: body.companyName,
    roleTitle: body.roleTitle,
    locationType: (body.locationType ?? 'Remote') as LocationType,
    status: 'APPLIED' as JobStatus,
    history: [{ status: 'APPLIED' as JobStatus, date: now }],
    industryTags: Array.isArray(body.industryTags) ? body.industryTags : [],
    jobDescriptionUrl: body.jobDescriptionUrl ?? '',
    resumeFilename: null,
    markdownFilename: `${id}.md`,
    nextActionDate: body.nextActionDate ?? null,
    isArchived: false,
    salary: { target: null, offered: null },
    contact: { name: null, email: null, linkedIn: null },
  };

  const jobs = await readJobsFile();
  jobs.push(job);
  await writeJobsFile(jobs);

  const template = generateNoteTemplate(job);
  await writeNoteFile(id, template);

  return Response.json(job, { status: 201 });
}
