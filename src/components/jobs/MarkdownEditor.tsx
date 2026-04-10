'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { updateNote } from '@/lib/api/notes';
import toast from 'react-hot-toast';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor({
  jobId,
  initialContent,
}: {
  jobId: string;
  initialContent: string;
}) {
  const [value, setValue] = useState(initialContent);

  const handleBlur = useCallback(async () => {
    try {
      await updateNote(jobId, value ?? '');
      toast.success('Notes saved', { duration: 1500 });
    } catch {
      toast.error('Failed to save notes');
    }
  }, [jobId, value]);

  return (
    <div onBlur={handleBlur} data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? '')}
        height={480}
        preview="edit"
      />
    </div>
  );
}
