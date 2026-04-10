'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useJobStore } from '@/lib/store/useJobStore';
import AddJobForm from './AddJobForm';

export default function AddJobModal() {
  const isOpen = useJobStore((s) => s.isAddModalOpen);
  const close = useJobStore((s) => s.closeAddModal);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <AddJobForm />
      </DialogContent>
    </Dialog>
  );
}
