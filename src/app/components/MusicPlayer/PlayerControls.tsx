import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Repeat, Pause } from 'lucide-react';
import { PlayButton, PrevIcon, NextIcon, ProgressBar, VolumeControl } from "./PlayerCustomIcons";

interface PlayerControlsProps {
  isLoading: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

const iconClass = 'w-24 h-24 md:w-32 md:h-32';

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isLoading,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onShuffle,
  onRepeat,
}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-16">
        <button onClick={onShuffle} className="text-neutral-300 hover:text-white transition-colors" title="Shuffle">
          <Shuffle className={iconClass} />
        </button>
        <button onClick={onPrev} className="text-neutral-300 hover:text-white transition-colors" title="Previous">
          <PrevIcon size={24} />
        </button>
        <motion.button
          className="flex items-center justify-center rounded-full"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          disabled={isLoading}
          style={{
            background: isPlaying ? '#a259ff' : '#232136',
            width: 56,
            height: 56,
            opacity: isLoading ? 0.5 : 1,
          }}
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <div className="animate-spin w-10 h-10 border-4 border-t-transparent border-white rounded-full" />
          ) : isPlaying ? (
            <Pause className="w-10 h-10 text-white" />
          ) : (
            <PlayButton size={56} />
          )}
        </motion.button>
        <button onClick={onNext} className="text-neutral-300 hover:text-white transition-colors" title="Next">
          <NextIcon size={24} />
        </button>
        <button onClick={onRepeat} className="text-neutral-300 hover:text-white transition-colors" title="Repeat">
          <Repeat className={iconClass} />
        </button>
      </div>
      {/* Progress Bar */}
      <div className="w-full mt-4">
        <ProgressBar progress={0.5} />
      </div>
      {/* Volume Control */}
      <div className="w-full mt-2">
        <VolumeControl volume={0.5} />
      </div>
    </>
  );
};

export default PlayerControls; 