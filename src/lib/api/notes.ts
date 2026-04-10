export async function getNote(id: string): Promise<string> {
  const res = await fetch(`/api/notes/${id}`);
  if (!res.ok) return '';
  return res.text();
}

export async function updateNote(id: string, content: string): Promise<void> {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to save note');
}
