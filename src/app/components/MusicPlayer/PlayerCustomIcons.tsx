import React from "react";

export const PlayButton = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="28" fill="#A259FF" />
    <polygon points="22,18 22,38 38,28" fill="#fff" />
  </svg>
);

export const PrevIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="2" height="14" fill="#fff"/>
    <polygon points="21,19 7,12 21,5" fill="#fff"/>
  </svg>
);

export const NextIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="19" y="5" width="2" height="14" fill="#fff"/>
    <polygon points="3,5 17,12 3,19" fill="#fff"/>
  </svg>
);

export const ProgressBar = ({ progress = 0.5 }) => (
  <div className="w-full h-2 rounded bg-[#232533] overflow-hidden progress-bar" data-progress={progress}>
    <div className="h-full bg-[#7B7B7B] progress-bar__fill" />
  </div>
);

export const VolumeControl = ({ volume = 0.5 }) => (
  <div className="flex items-center w-full">
    {/* Speaker Icon */}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 7V13H7L12 17V3L7 7H3Z" fill="#fff"/>
    </svg>
    {/* Volume Bar */}
    <div className="ml-2 w-full h-2 rounded bg-[#232533] overflow-hidden volume-bar" data-volume={volume}>
      <div className="h-full bg-[#7B7B7B] volume-bar__fill" />
    </div>
  </div>
); 