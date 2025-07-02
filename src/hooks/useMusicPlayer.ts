'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Song, fetchLocalPlaylist } from '../lib/musicApi';

export function useMusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerState, setPlayerState] = useState<'playing' | 'paused' | 'loading'>('paused');
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastProgressUpdateRef = useRef<number>(0);

  useEffect(() => {
    fetchLocalPlaylist().then(setSongs).catch(() => setSongs([]));
  }, []);

  const play = useCallback(() => {
    setPlayerState('loading');
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlayerState('playing');
        setIsLoading(false);
      }).catch((e) => {
        setPlayerState('paused');
        setIsLoading(false);
        console.log('Play error', e);
      });
    }
  }, []);

  const pause = useCallback(() => {
    setPlayerState('loading');
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayerState('paused');
    setIsLoading(false);
  }, []);

  const next = useCallback(() => {
    setPlayerState('loading');
    setIsLoading(true);
    setCurrentIndex((i) => (i + 1) % songs.length);
    setProgress(0);
  }, [songs.length]);

  const prev = useCallback(() => {
    setPlayerState('loading');
    setIsLoading(true);
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
    setProgress(0);
  }, [songs.length]);

  const shuffle = useCallback(() => {
    setPlayerState('loading');
    setIsLoading(true);
    setCurrentIndex(Math.floor(Math.random() * songs.length));
    setProgress(0);
  }, [songs.length]);

  const repeat = useCallback(() => {
    setProgress(0);
    setPlayerState('playing');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.log('Play error', e);
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, currentIndex]);

  useEffect(() => {
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  // Auto play audio setiap kali currentIndex berubah
  useEffect(() => {
    if (!audioRef.current) return;
    setPlayerState('loading');
    setIsLoading(true);
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setPlayerState('playing');
        setIsLoading(false);
      }).catch((e) => {
        setPlayerState('paused');
        setIsLoading(false);
        console.log('Auto play error', e);
      });
    } else {
      setPlayerState('playing');
      setIsLoading(false);
    }
  }, [currentIndex]);

  const setAudioProgress = (value: number) => {
    const now = Date.now();
    if (now - lastProgressUpdateRef.current > 200) {
      setProgress(value);
      lastProgressUpdateRef.current = now;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  return {
    songs,
    currentSong: songs[currentIndex],
    playerState,
    isLoading,
    progress,
    volume,
    play,
    pause,
    next,
    prev,
    shuffle,
    repeat,
    setVolume,
    setProgress: setAudioProgress,
    setPlayerState,
    audioRef,
  };
} 