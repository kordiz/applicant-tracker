'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJobStore } from '@/lib/store/useJobStore';
import { createJob } from '@/lib/api/jobs';
import type { LocationType } from '@/lib/types';
import toast from 'react-hot-toast';

export default function AddJobForm() {
  const addJob = useJobStore((s) => s.addJob);
  const closeAddModal = useJobStore((s) => s.closeAddModal);

  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [locationType, setLocationType] = useState<LocationType>('Remote');
  const [jobDescriptionUrl, setJobDescriptionUrl] = useState('');
  const [industryTagsRaw, setIndustryTagsRaw] = useState('');
  const [nextActionDate, setNextActionDate] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !roleTitle.trim()) return;
    setLoading(true);
    try {
      const tags = industryTagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const job = await createJob({
        companyName: companyName.trim(),
        roleTitle: roleTitle.trim(),
        locationType,
        jobDescriptionUrl: jobDescriptionUrl.trim(),
        industryTags: tags,
        nextActionDate: nextActionDate || null,
      });
      addJob(job);
      closeAddModal();
      toast.success(`Added "${job.roleTitle}" at ${job.companyName}`);
    } catch {
      toast.error('Failed to add job. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company *</label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Corp"
            required
            autoFocus
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Role *</label>
          <Input
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="Software Engineer"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Location Type</label>
          <Select value={locationType} onValueChange={(v) => setLocationType(v as LocationType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Next Action Date</label>
          <Input
            type="date"
            value={nextActionDate}
            onChange={(e) => setNextActionDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Job Posting URL</label>
        <Input
          value={jobDescriptionUrl}
          onChange={(e) => setJobDescriptionUrl(e.target.value)}
          placeholder="https://..."
          type="url"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Industry Tags <span className="text-muted-foreground/60">(comma-separated)</span>
        </label>
        <Input
          value={industryTagsRaw}
          onChange={(e) => setIndustryTagsRaw(e.target.value)}
          placeholder="SaaS, B2B, FinTech"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={closeAddModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add Job'}
        </Button>
      </div>
    </form>
  );
}
