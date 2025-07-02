import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const musicDir = path.join(process.cwd(), 'public', 'music');
  let files: string[] = [];
  try {
    files = fs.readdirSync(musicDir)
      .filter(file => file.endsWith('.mp3'));
  } catch (e) {
    return res.status(200).json([]);
  }
  const playlist = files.map((file, idx) => ({
    id: String(idx + 1),
    title: file.replace('.mp3', ''),
    artist: 'Lagu Nasional',
    coverUrl: null,
    audioUrl: `/music/${file}`,
    duration: 0,
  }));
  res.status(200).json(playlist);
} 