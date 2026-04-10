import { NextRequest } from 'next/server';
import { readNoteFile, writeNoteFile } from '@/lib/fs/notesFile';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const content = await readNoteFile(id);
    return new Response(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch {
    return new Response('', { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await request.json();
  await writeNoteFile(id, content);
  return Response.json({ ok: true });
}
