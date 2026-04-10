'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJobStore } from '@/lib/store/useJobStore';

export default function FloatingAddButton() {
  const openAddModal = useJobStore((s) => s.openAddModal);

  return (
    <Button
      onClick={openAddModal}
      size="icon"
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
      aria-label="Add new job"
    >
      <Plus className="h-5 w-5" />
    </Button>
  );
}
