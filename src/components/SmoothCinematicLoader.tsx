import React, { useState, useEffect } from 'react';
import { Sparkles, Award } from 'lucide-react';
import { soundEngine } from './AudioAmbience';

interface SmoothCinematicLoaderProps {
  onLoaded: () => void;
}

export const SmoothCinematicLoader: React.FC<SmoothCinematicLoaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Loading portfolio universe...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Harmonizing audio ambience...' },
      { at: 40, text: 'Preparing 3D interactive scenes...' },
      { at: 65, text: 'Loading 11 verified official credentials...' },
      { at: 85, text: 'Aligning 7-chapter cinematic glide...' },
      { at: 98, text: 'Welcome to the portfolio.' },
    ];

    const startTime = performance.now();
    const duration = 1200; // Snappy, clean and smooth

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      const matched = [...statuses].reverse().find((s) => pct >= s.at);
      if (matched) {
        setStatusText(matched.text);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          soundEngine.playChime(650, 0.25);
          setTimeout(onLoaded, 500);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-700 select-none ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Soft Gold Ambient Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Monogram Crest */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-amber-500/5 border border-amber-400/50 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.3)] transition-transform duration-500 hover:scale-105">
            <span
              className="text-2xl font-serif-instrument text-amber-200"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              AD
            </span>
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl text-white tracking-tight font-serif-instrument mb-1"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Akshita Dalsaniya
        </h2>
        <div className="text-xs font-mono text-amber-300/80 tracking-widest uppercase mb-6 flex items-center gap-2">
          <span>CINEMATIC PORTFOLIO</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span>RESEARCH & INCLUSION</span>
        </div>

        {/* Smooth Gold Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3 p-0.5 border border-white/15 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Line */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-white/50">
          <span className="truncate text-white/70">{statusText}</span>
          <span className="text-amber-300 font-bold ml-2 shrink-0">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
