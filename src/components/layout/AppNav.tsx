'use client';

import Link from 'next/link';
import { BriefcaseIcon } from 'lucide-react';

export default function AppNav() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
          <BriefcaseIcon className="h-4 w-4" />
          Applicant Tracker
        </Link>
      </div>
    </header>
  );
}
