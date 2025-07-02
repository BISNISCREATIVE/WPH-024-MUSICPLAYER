import React, { useEffect, useRef, useState, RefObject } from "react";

interface EqualizerBarsProps {
  playerState: "playing" | "paused" | "loading";
  className?: string;
  audioRef?: RefObject<HTMLAudioElement | null>;
}

const barColors = [
  "bg-[#a259ff]", "bg-[#3fa4ff]", "bg-[#43e97b]", "bg-[#ffe140]", "bg-[#ff3f3f]",
];
const staticHeights = [32, 24, 16, 28, 20];

const EqualizerBars: React.FC<EqualizerBarsProps> = ({ playerState, className, audioRef }) => {
  const [barHeights, setBarHeights] = useState(staticHeights);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!audioRef?.current || playerState !== "playing") {
      setBarHeights(staticHeights);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let ctx = audioCtxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioCtxRef.current = ctx;
    }

    // Only create source node once per audio element
    if (!sourceRef.current) {
      sourceRef.current = ctx.createMediaElementSource(audioRef.current);
    }

    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 32;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
      analyser.getByteFrequencyData(dataArray);
      const bars = [dataArray[1], dataArray[3], dataArray[5], dataArray[7], dataArray[9]];
      setBarHeights(bars.map(v => 16 + (v / 255) * 16));
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      // Only disconnect analyser, not source node
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
    };
  }, [audioRef, playerState]);

  // Jika tidak ada musik, tampilkan garis statis
  if (!audioRef?.current || playerState !== "playing") {
    return (
      <div className={`flex flex-row items-end gap-1 ${className || ''}`}>
        {barColors.map((color, i) => (
          <div key={i} className={`rounded w-3 h-2 ${color}`} />
        ))}
      </div>
    );
  }

  // Jika ada musik, tampilkan bar dinamis
  return (
    <div className={`flex flex-row items-end gap-1 ${className || ''}`}>
      {barHeights.map((h, i) => (
        <div key={i} className={`rounded w-3 ${barColors[i]} eqbar-h eqbar-h-${Math.round(h)}`} />
      ))}
    </div>
  );
};

export default EqualizerBars;
