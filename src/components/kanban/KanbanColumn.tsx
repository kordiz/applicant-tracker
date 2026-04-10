'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useJobStore, selectFilteredJobs } from '@/lib/store/useJobStore';
import { useShallow } from 'zustand/react/shallow';
import type { JobStatus } from '@/lib/types';
import KanbanCard from './KanbanCard';

const STATUS_LABELS: Record<JobStatus, string> = {
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

const STATUS_COLORS: Record<JobStatus, string> = {
  APPLIED: 'text-blue-600 dark:text-blue-400',
  INTERVIEW: 'text-yellow-600 dark:text-yellow-400',
  OFFER: 'text-green-600 dark:text-green-400',
  REJECTED: 'text-red-500 dark:text-red-400',
};

export default function KanbanColumn({ status }: { status: JobStatus }) {
  const jobs = useJobStore(useShallow(selectFilteredJobs)).filter((j) => j.status === status);

  return (
    <div className="flex flex-col min-w-[240px] w-full">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${STATUS_COLORS[status]}`}>
          {STATUS_LABELS[status]}
        </h3>
        <span className="text-xs text-muted-foreground font-medium bg-muted rounded-full px-2 py-0.5">
          {jobs.length}
        </span>
      </div>
      <ScrollArea className="flex-1 max-h-[calc(100vh-280px)]">
        <div className="space-y-2 pr-2">
          {jobs.length === 0 ? (
            <div className="border border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground">
              No applications
            </div>
          ) : (
            jobs.map((job) => <KanbanCard key={job.id} job={job} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
