'use client';

import { useJobStore } from '@/lib/store/useJobStore';
import { BriefcaseIcon, TrendingUpIcon, CalendarClockIcon } from 'lucide-react';

export default function StatsBar() {
  const jobs = useJobStore((s) => s.jobs);
  const active = jobs.filter((j) => !j.isArchived);

  const interviewRate =
    active.length === 0
      ? 0
      : Math.round(
          (active.filter((j) => j.status === 'INTERVIEW' || j.status === 'OFFER').length /
            active.length) *
            100
        );

  const activeCount = active.filter((j) => j.status !== 'REJECTED').length;

  const upcomingCount = active.filter((j) => {
    if (!j.nextActionDate) return false;
    const diff =
      (new Date(j.nextActionDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard
        icon={<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />}
        label="Interview Rate"
        value={`${interviewRate}%`}
      />
      <StatCard
        icon={<BriefcaseIcon className="h-4 w-4 text-muted-foreground" />}
        label="Active Apps"
        value={String(activeCount)}
      />
      <StatCard
        icon={<CalendarClockIcon className="h-4 w-4 text-muted-foreground" />}
        label="Upcoming (7d)"
        value={String(upcomingCount)}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-border rounded-lg p-4 flex items-center gap-3 bg-card">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
