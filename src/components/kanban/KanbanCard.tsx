'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/types';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

const LOCATION_COLORS: Record<string, string> = {
  Remote: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Hybrid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'On-site': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function KanbanCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <Card className="hover:border-foreground/30 transition-colors cursor-pointer">
        <CardHeader className="pb-2 pt-3 px-3">
          <p className="font-semibold text-sm leading-tight group-hover:underline">
            {job.roleTitle}
          </p>
          <p className="text-xs text-muted-foreground">{job.companyName}</p>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="flex flex-wrap gap-1">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${LOCATION_COLORS[job.locationType]}`}
            >
              <MapPinIcon className="h-2.5 w-2.5" />
              {job.locationType}
            </span>
            {job.industryTags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
            {job.industryTags.length > 2 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                +{job.industryTags.length - 2}
              </Badge>
            )}
          </div>
          {job.nextActionDate && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <CalendarIcon className="h-2.5 w-2.5" />
              {format(new Date(job.nextActionDate), 'MMM d, yyyy')}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
