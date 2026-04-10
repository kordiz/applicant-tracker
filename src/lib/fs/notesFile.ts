import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const NOTES_DIR = path.join(process.cwd(), 'data', 'notes');

export async function readNoteFile(id: string): Promise<string> {
  const filePath = path.join(NOTES_DIR, `${id}.md`);
  return readFile(filePath, 'utf-8');
}

export async function writeNoteFile(id: string, content: string): Promise<void> {
  const filePath = path.join(NOTES_DIR, `${id}.md`);
  await writeFile(filePath, content, 'utf-8');
}
