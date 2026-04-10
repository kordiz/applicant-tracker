'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Job } from '@/lib/types';
import { useJobStore } from '@/lib/store/useJobStore';
import StatsBar from './StatsBar';
import SearchFilterBar from '@/components/search/SearchFilterBar';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import FloatingAddButton from '@/components/layout/FloatingAddButton';
import AddJobModal from '@/components/jobs/AddJobModal';
import { ArchiveIcon } from 'lucide-react';

export default function DashboardShell({ initialJobs }: { initialJobs: Job[] }) {
  const setJobs = useJobStore((s) => s.setJobs);
  const openAddModal = useJobStore((s) => s.openAddModal);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs, setJobs]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openAddModal();
      }
    },
    [openAddModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-end mb-4">
        <Link
          href="/archive"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArchiveIcon className="h-3.5 w-3.5" />
          View Archive
        </Link>
      </div>
      <StatsBar />
      <SearchFilterBar />
      <KanbanBoard />
      <FloatingAddButton />
      <AddJobModal />
    </div>
  );
}
