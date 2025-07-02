'use client';

import React, { useRef } from 'react';

const TEST_AUDIO = '/music/01 Spirit of Sunda.mp3'; // Ganti sesuai file yang pasti ada

const PlayerMinimal: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <audio ref={audioRef} src={TEST_AUDIO} preload="auto" />
      <div className="flex gap-4">
        <button onClick={handlePlay} className="px-4 py-2 bg-green-600 text-white rounded">Play</button>
        <button onClick={handlePause} className="px-4 py-2 bg-red-600 text-white rounded">Pause</button>
      </div>
    </div>
  );
};

export default PlayerMinimal; 