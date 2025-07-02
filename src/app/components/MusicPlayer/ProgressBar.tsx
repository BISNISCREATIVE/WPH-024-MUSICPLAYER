import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  duration: number;
  onChange: (value: number) => void;
  state: 'playing' | 'paused' | 'loading';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, duration, onChange, state }) => {
  const percent = duration ? (progress / duration) * 100 : 0;
  return (
    <div className="w-full h-8 flex items-center cursor-pointer" onClick={e => {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newProgress = (x / rect.width) * duration;
      onChange(newProgress);
    }}>
      <div className="w-full h-8 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-8 rounded-full"
          style={{ background: state === 'playing' ? '#a259ff' : '#6c6c6c' }}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 