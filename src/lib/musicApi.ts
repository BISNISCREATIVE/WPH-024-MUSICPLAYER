// import { Song } from '../types/music';

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  audioUrl: string;
  duration: number;
}

export async function fetchSongs(): Promise<Song[]> {
  // Ganti dengan token Soundstripe asli
  const token = process.env.SOUNDSTRIPE_API_KEY || 'YOUR_SOUNSTRIPE_API_KEY';
  const res = await fetch('https://api.soundstripe.com/v1/songs', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch songs');
  const data = await res.json();
  // Map API data ke Song[]
  return (data.songs || []).map((item: Record<string, any>) => ({
    id: item.id,
    title: item.title,
    artist: item.artist_name,
    coverUrl: item.artwork_url,
    audioUrl: item.audio_url,
    duration: item.duration,
  }));
}

export async function fetchSongById(songId: string): Promise<Song> {
  const token = process.env.SOUNDSTRIPE_API_KEY || 'YOUR_SOUNSTRIPE_API_KEY';
  const res = await fetch(`https://api.soundstripe.com/v1/songs/${songId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch song');
  const item = await res.json();
  return {
    id: item.id,
    title: item.title,
    artist: item.artist_name,
    coverUrl: item.artwork_url,
    audioUrl: item.audio_url,
    duration: item.duration,
  };
}

export async function fetchLocalPlaylist(): Promise<Song[]> {
  const res = await fetch('/api/music-list');
  if (!res.ok) return [];
  return await res.json();
} 