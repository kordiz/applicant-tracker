import type { Job } from '@/lib/types';

export function generateNoteTemplate(job: Job): string {
  const today = new Date().toISOString().split('T')[0];
  return `# ${job.roleTitle} at ${job.companyName}

**Applied:** ${today}
**Status:** ${job.status}
**Location:** ${job.locationType}

---

## Job Description Summary

> Paste or summarize the job description here.

## Why This Role

-

## Preparation Notes

### Resume Highlights Used


### Skills to Emphasize


---

## Interview Log

| Date | Round | Notes |
|------|-------|-------|
|      |       |       |

---

## Questions to Ask


---

## Follow-up Actions

- [ ]

---

## Offer Details

- Offered Salary:
- Target Salary:
- Decision Deadline:
`;
}
