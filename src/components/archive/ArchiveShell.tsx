'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Job } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResumeDownload from '@/components/jobs/ResumeDownload';
import { ArrowLeftIcon, SearchIcon, MapPinIcon } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  APPLIED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  INTERVIEW: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  OFFER: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const STATUS_LABELS: Record<string, string> = {
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

const LOCATION_COLORS: Record<string, string> = {
  Remote: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Hybrid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'On-site': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function ArchiveShell({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');

  const filtered = jobs.filter((j) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      j.companyName.toLowerCase().includes(q) ||
      j.roleTitle.toLowerCase().includes(q) ||
      j.industryTags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to Board
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Archive</h1>
        <span className="text-sm text-muted-foreground">{filtered.length} job{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company, role, or tag…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          {query ? 'No matches found.' : 'No archived jobs yet.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((job) => (
            <li key={job.id} className="border border-border rounded-lg bg-card p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <Link href={`/jobs/${job.id}`} className="hover:underline">
                  <p className="font-medium text-sm leading-tight">{job.roleTitle}</p>
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{job.companyName}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${STATUS_COLORS[job.status]}`}>
                    {STATUS_LABELS[job.status]}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${LOCATION_COLORS[job.locationType]}`}>
                    <MapPinIcon className="h-2.5 w-2.5" />
                    {job.locationType}
                  </span>
                  {job.industryTags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {job.industryTags.length > 3 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      +{job.industryTags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {job.resumeFilename && <ResumeDownload filename={job.resumeFilename} />}
                {job.history.length > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    Last updated {format(new Date(job.history[job.history.length - 1].date), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
