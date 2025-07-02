import React from 'react';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-8 w-full">
      <Volume2 className="w-16 h-16 text-neutral-400" />
      <div className="flex-1 h-8 flex items-center cursor-pointer group" onClick={e => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        onChange(Math.max(0, Math.min(1, x / rect.width)));
      }}>
        <div className="w-full h-8 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-8 rounded-full"
            style={{ background: '#a259ff' }}
            initial={false}
            animate={{ width: `${value * 100}%`, background: '#a259ff' }}
            whileHover={{ background: '#a259ff' }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider; 