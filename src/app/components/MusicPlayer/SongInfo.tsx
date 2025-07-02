import React, { useState } from 'react';

interface SongInfoProps {
  title?: string;
  artist?: string;
  className?: string;
}

const SongInfo: React.FC<SongInfoProps> = ({ title, artist, className }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className={`flex flex-col min-w-0 max-w-full overflow-hidden justify-center ${className || ''}`}>
      <div
        className={
          `text-white font-bold leading-tight w-full min-w-0 max-w-full text-lg md:text-xl lg:text-2xl truncate` +
          (hover ? ' cursor-pointer' : '')
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={title || 'Unknown Title'}
      >
        {title || 'Unknown Title'}
      </div>
      <div
        className="text-neutral-400 w-full min-w-0 max-w-full truncate text-ellipsis whitespace-nowrap overflow-hidden text-sm md:text-base lg:text-lg"
      >
        {artist || 'Unknown Artist'}
      </div>
    </div>
  );
};

export default SongInfo; 