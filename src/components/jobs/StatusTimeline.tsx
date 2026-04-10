'use client';

import { format } from 'date-fns';
import type { Job } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  APPLIED: 'bg-blue-500',
  INTERVIEW: 'bg-yellow-500',
  OFFER: 'bg-green-500',
  REJECTED: 'bg-red-500',
};

const STATUS_LABELS: Record<string, string> = {
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

export default function StatusTimeline({ job }: { job: Job }) {
  const sorted = [...job.history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-1">
      {sorted.map((entry, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${STATUS_COLORS[entry.status] ?? 'bg-muted'}`}
            />
            {i < sorted.length - 1 && (
              <span className="w-px flex-1 min-h-[20px] bg-border mt-0.5" />
            )}
          </div>
          <div className="pb-3">
            <p className="text-sm font-medium leading-tight">{STATUS_LABELS[entry.status]}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(entry.date), 'MMM d, yyyy · h:mm a')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
