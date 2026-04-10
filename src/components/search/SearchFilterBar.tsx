'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJobStore } from '@/lib/store/useJobStore';
import type { JobStatus } from '@/lib/types';
import { SearchIcon } from 'lucide-react';

const STATUS_OPTIONS: { value: JobStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'APPLIED', label: 'Applied' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'OFFER', label: 'Offer' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function SearchFilterBar() {
  const searchQuery = useJobStore((s) => s.searchQuery);
  const statusFilter = useJobStore((s) => s.statusFilter);
  const setSearchQuery = useJobStore((s) => s.setSearchQuery);
  const setStatusFilter = useJobStore((s) => s.setStatusFilter);

  return (
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search company, role, or tag…"
          className="pl-9"
        />
      </div>
      <Select
        value={statusFilter}
        onValueChange={(v) => setStatusFilter(v as JobStatus | 'ALL')}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
