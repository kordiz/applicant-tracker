import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { Job } from '@/lib/types';

const DATA_PATH = path.join(process.cwd(), 'data', 'jobs.json');

export async function readJobsFile(): Promise<Job[]> {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeJobsFile(jobs: Job[]): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
}
