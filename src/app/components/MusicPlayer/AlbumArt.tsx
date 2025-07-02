import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AlbumArtProps {
  src?: string;
  state: 'playing' | 'paused' | 'loading';
}

const COLORS = [
  ['#a259ff', '#232136'],
  ['#ff6f61', '#232136'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
];

const AlbumArt: React.FC<AlbumArtProps> = ({ src, state }) => {
  const [colorIdx, setColorIdx] = useState(0);
  const [reverse, setReverse] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reverseRef = useRef<NodeJS.Timeout | null>(null);

  // Ganti warna background setiap 15 detik saat playing
  useEffect(() => {
    if (state === 'playing') {
      intervalRef.current = setInterval(() => {
        setColorIdx((idx) => (idx + 1) % COLORS.length);
      }, 15000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  // Bolak-balik rotasi setiap 20 detik saat playing
  useEffect(() => {
    if (state === 'playing') {
      reverseRef.current = setInterval(() => {
        setReverse((r) => !r);
      }, 20000);
    } else if (reverseRef.current) {
      clearInterval(reverseRef.current);
      setReverse(false);
    }
    return () => {
      if (reverseRef.current) clearInterval(reverseRef.current);
    };
  }, [state]);

  const gradient = `linear-gradient(135deg, ${COLORS[colorIdx][0]}, ${COLORS[colorIdx][1]})`;

  return (
    <motion.div
      className="w-64 h-64 md:w-96 md:h-96 rounded-xl overflow-hidden flex items-center justify-center"
      style={{ background: gradient, willChange: 'transform' }}
      initial={false}
      animate={state}
      variants={{
        playing: { scale: 1 },
        paused: { scale: 0.95, rotate: 0 },
        loading: { scale: 0.9, rotate: 0 },
      }}
      transition={{ scale: { type: 'spring', duration: 0.3 } }}
    >
      <motion.div
        animate={state === 'playing' ? { rotate: reverse ? -360 : 360 } : { rotate: 0 }}
        transition={state === 'playing' ? { repeat: Infinity, duration: 20, ease: 'linear' } : { duration: 0.3 }}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {src ? (
          <img src={src} alt="Album Art" className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl text-white">🎵</span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AlbumArt; 