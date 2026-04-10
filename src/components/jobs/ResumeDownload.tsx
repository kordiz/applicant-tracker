'use client';

import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';

export default function ResumeDownload({ filename }: { filename: string }) {
  return (
    <a href={`/api/resumes/${encodeURIComponent(filename)}`} download={filename}>
      <Button variant="outline" size="sm" className="gap-2">
        <DownloadIcon className="h-3.5 w-3.5" />
        {filename}
      </Button>
    </a>
  );
}
