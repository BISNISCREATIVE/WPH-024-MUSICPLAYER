'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';
import EqualizerBars from './EqualizerBars';
import AlbumArt from './AlbumArt';
import SongInfo from './SongInfo';
import { useMusicPlayer } from '../../../hooks/useMusicPlayer';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Loader2 } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const {
    currentSong,
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
    setProgress,
    audioRef,
  } = useMusicPlayer();

  return (
    <motion.div
      className="w-full max-w-md mx-auto rounded-2xl shadow-lg p-16 bg-neutral-900 flex flex-col gap-16 min-w-[320px]"
      initial={false}
      animate={playerState}
      variants={{
        playing: { backgroundColor: '#181028', boxShadow: '0 0 32px 0 #a259ff' },
        paused: { backgroundColor: '#181028', boxShadow: '0 0 16px 0 #000' },
        loading: { backgroundColor: '#181028', boxShadow: '0 0 8px 0 #a259ff88' },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Audio element for playback */}
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl}
        preload="auto"
        onEnded={next}
        onTimeUpdate={e => {
          setProgress((e.target as HTMLAudioElement).currentTime);
        }}
        onPlay={() => console.log('onPlay event fired')}
        onPause={() => console.log('onPause event fired')}
        className="w-0 h-0 opacity-0"
      />
      <div className="flex flex-row items-center gap-16">
        <AlbumArt
          src={currentSong?.coverUrl}
          state={playerState}
        />
        <div className="flex-1 flex flex-col items-start w-full min-w-0 overflow-hidden">
          <SongInfo title={currentSong?.title} artist={currentSong?.artist} className="max-w-full" />
          <EqualizerBars playerState={playerState} className="mt-1" audioRef={audioRef} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ProgressBar
          progress={progress}
          duration={currentSong?.duration || 0}
          onChange={setProgress}
          state={playerState}
        />
        <div className="flex flex-row justify-between text-xs text-neutral-400">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(currentSong?.duration || 0)}</span>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-8">
        <button
          onClick={shuffle}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          disabled={isLoading}
          aria-label="Shuffle"
        >
          <Shuffle className="w-6 h-6" />
        </button>
        <button
          onClick={prev}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          disabled={isLoading}
          aria-label="Previous"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={playerState === 'playing' ? pause : play}
          className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors disabled:opacity-50"
          disabled={isLoading}
          aria-label={playerState === 'playing' ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : playerState === 'playing' ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={next}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          disabled={isLoading}
          aria-label="Next"
        >
          <SkipForward className="w-6 h-6" />
        </button>
        <button
          onClick={repeat}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          disabled={isLoading}
          aria-label="Repeat"
        >
          <Repeat className="w-6 h-6" />
        </button>
      </div>
      <VolumeSlider value={volume} onChange={setVolume} />
    </motion.div>
  );
};

function formatTime(sec?: number) {
  if (!sec) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default MusicPlayer; 