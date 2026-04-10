import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Prevent path traversal
  const safe = path.basename(filename);
  const filePath = path.join(process.cwd(), 'data', 'resumes', safe);

  try {
    const buffer = await readFile(filePath);
    return new Response(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${safe}"`,
        'Content-Type': 'application/octet-stream',
      },
    });
  } catch {
    return Response.json({ error: 'File not found' }, { status: 404 });
  }
}
