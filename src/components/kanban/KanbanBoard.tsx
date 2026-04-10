'use client';

import type { JobStatus } from '@/lib/types';
import KanbanColumn from './KanbanColumn';

const STATUSES: JobStatus[] = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATUSES.map((status) => (
        <KanbanColumn key={status} status={status} />
      ))}
    </div>
  );
}
