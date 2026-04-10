'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Job, JobStatus, LocationType } from '@/lib/types';
import { useJobStore } from '@/lib/store/useJobStore';
import { updateJob, uploadResume } from '@/lib/api/jobs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusTimeline from './StatusTimeline';
import ResumeDownload from './ResumeDownload';
import MarkdownEditor from './MarkdownEditor';
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  ArchiveIcon,
  UploadIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'APPLIED', label: 'Applied' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'OFFER', label: 'Offer' },
  { value: 'REJECTED', label: 'Rejected' },
];

const LOCATION_COLORS: Record<LocationType, string> = {
  Remote: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Hybrid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'On-site': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function JobDetailShell({
  job: initialJob,
  initialNoteContent,
}: {
  job: Job;
  initialNoteContent: string;
}) {
  const storeUpdateJob = useJobStore((s) => s.updateJob);
  const [job, setJobLocal] = useState(initialJob);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleStatusChange(status: JobStatus) {
    try {
      const updated = await updateJob(job.id, { status });
      setJobLocal(updated);
      storeUpdateJob(job.id, updated);
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  }

  async function handleArchive() {
    try {
      const updated = await updateJob(job.id, { isArchived: !job.isArchived });
      setJobLocal(updated);
      storeUpdateJob(job.id, updated);
      toast.success(updated.isArchived ? 'Archived' : 'Unarchived');
    } catch {
      toast.error('Failed to update');
    }
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { filename } = await uploadResume(job.id, file);
      const updated = await updateJob(job.id, { resumeFilename: filename });
      setJobLocal(updated);
      storeUpdateJob(job.id, updated);
      toast.success('Resume uploaded');
    } catch {
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Back nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to Board
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{job.roleTitle}</h1>
          <p className="text-muted-foreground mt-0.5">{job.companyName}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${LOCATION_COLORS[job.locationType]}`}
            >
              {job.locationType}
            </span>
            {job.industryTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {job.isArchived && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Archived
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {job.jobDescriptionUrl && (
            <a href={job.jobDescriptionUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ExternalLinkIcon className="h-3.5 w-3.5" />
                Job Post
              </Button>
            </a>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleArchive}
          >
            <ArchiveIcon className="h-3.5 w-3.5" />
            {job.isArchived ? 'Unarchive' : 'Archive'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Status */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Status
            </h2>
            <Select value={job.status} onValueChange={(v) => handleStatusChange(v as JobStatus)}>
              <SelectTrigger>
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
          </section>

          <Separator />

          {/* Timeline */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              History
            </h2>
            <StatusTimeline job={job} />
          </section>

          <Separator />

          {/* Meta */}
          <section className="space-y-2 text-sm">
            {job.nextActionDate && (
              <div>
                <p className="text-xs text-muted-foreground">Next Action</p>
                <p className="font-medium">
                  {format(new Date(job.nextActionDate), 'MMM d, yyyy')}
                </p>
              </div>
            )}
            {job.salary.target && (
              <div>
                <p className="text-xs text-muted-foreground">Target Salary</p>
                <p className="font-medium">{job.salary.target}</p>
              </div>
            )}
            {job.salary.offered && (
              <div>
                <p className="text-xs text-muted-foreground">Offered Salary</p>
                <p className="font-medium">{job.salary.offered}</p>
              </div>
            )}
            {job.contact.name && (
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="font-medium">{job.contact.name}</p>
                {job.contact.email && (
                  <p className="text-xs text-muted-foreground">{job.contact.email}</p>
                )}
              </div>
            )}
          </section>

          <Separator />

          {/* Resume */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Resume
            </h2>
            {job.resumeFilename ? (
              <div className="space-y-2">
                <ResumeDownload filename={job.resumeFilename} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <UploadIcon className="h-3 w-3" />
                  Replace
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 w-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <UploadIcon className="h-3.5 w-3.5" />
                {uploading ? 'Uploading…' : 'Upload Resume'}
              </Button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </section>
        </div>

        {/* Main content — markdown editor */}
        <div className="col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Notes
          </h2>
          <MarkdownEditor jobId={job.id} initialContent={initialNoteContent} />
        </div>
      </div>
    </div>
  );
}
