import { create } from 'zustand';
import type { Job, JobStatus } from '@/lib/types';

interface JobStore {
  jobs: Job[];
  selectedJobId: string | null;
  searchQuery: string;
  statusFilter: JobStatus | 'ALL';
  isAddModalOpen: boolean;

  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, patch: Partial<Job>) => void;
  setSelectedJobId: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: JobStatus | 'ALL') => void;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useJobStore = create<JobStore>()((set) => ({
  jobs: [],
  selectedJobId: null,
  searchQuery: '',
  statusFilter: 'ALL',
  isAddModalOpen: false,

  setJobs: (jobs) => set({ jobs }),
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (id, patch) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...patch } : j)),
    })),
  setSelectedJobId: (id) => set({ selectedJobId: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setStatusFilter: (s) => set({ statusFilter: s }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
}));

export const selectFilteredJobs = (state: JobStore): Job[] =>
  state.jobs
    .filter((j) => !j.isArchived)
    .filter((j) => state.statusFilter === 'ALL' || j.status === state.statusFilter)
    .filter((j) => {
      const q = state.searchQuery.toLowerCase();
      if (!q) return true;
      return (
        j.companyName.toLowerCase().includes(q) ||
        j.roleTitle.toLowerCase().includes(q) ||
        j.industryTags.some((t) => t.toLowerCase().includes(q))
      );
    });
