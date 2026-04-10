import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('resume') as File | null;
  const jobId = formData.get('jobId') as string | null;

  if (!file || !jobId) {
    return Response.json({ error: 'Missing file or jobId' }, { status: 400 });
  }

  const ext = path.extname(file.name);
  const filename = `${jobId}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), 'data', 'resumes', filename);

  await writeFile(filePath, buffer);

  return Response.json({ filename });
}
