import React, { useState } from 'react';
import { CHAPTERS_LIST } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import { Sparkles, Store, Globe, HeartHandshake, Feather, TrendingUp, Infinity, ArrowRight, ChevronRight } from 'lucide-react';

export const ChaptersSection: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = CHAPTERS_LIST[activeChapterIndex];

  const getChapterIcon = (icon: string) => {
    switch (icon) {
      case 'Store': return <Store className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Feather': return <Feather className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Infinity': return <Infinity className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="chapters" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>SECTION 03 • CHAPTERS OF EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Every Experience Adds a Perspective
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Every experience has added a new perspective, shaped a new chapter, and brought me one step closer to understanding the world.
          </p>
        </div>

        {/* Timeline Stepper (Horizontal on large screens) */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[700px] gap-2 p-2 rounded-2xl liquid-glass border border-white/10">
            {CHAPTERS_LIST.map((chapter, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    soundEngine.playNodeSelect();
                    setActiveChapterIndex(idx);
                  }}
                  className={`flex-1 py-3 px-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                      : 'hover:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono opacity-80">{chapter.number}</span>
                    <span className="text-xs truncate font-medium">{chapter.badge.split(' ')[1] || chapter.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chapter Movie-like Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Hero Card (8 cols) */}
          <div className="lg:col-span-8">
            <Card3DTilt
              maxTilt={4}
              glowColor="rgba(56, 189, 248, 0.2)"
              className="liquid-glass p-8 sm:p-12 rounded-3xl border border-cyan-500/30 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                    {getChapterIcon(activeChapter.icon)}
                    <span>{activeChapter.badge}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    CHAPTER {activeChapter.number} OF 07
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-2">
                  {activeChapter.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-cyan-300 mb-6">
                  {activeChapter.subtitle}
                </div>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {activeChapter.story.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Takeaway Box */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 block mb-1">
                    // CHAPTER TAKEAWAY
                  </span>
                  <p className="text-sm sm:text-base font-serif italic text-slate-100">
                    &ldquo;{activeChapter.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Tags & Navigation Capsule (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            <div className="liquid-glass p-7 rounded-3xl border border-white/10 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Key Exploration Themes
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeChapter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 text-xs font-mono"
                  >
                    • {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Navigation Stepper */}
            <div className="liquid-glass-strong p-7 rounded-3xl border border-white/10 space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Navigate Journey
              </div>
              <div className="flex gap-3">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => {
                    soundEngine.playNodeSelect();
                    setActiveChapterIndex((prev) => Math.max(0, prev - 1));
                  }}
                  className="flex-1 py-2.5 rounded-xl liquid-glass hover:liquid-glass-strong disabled:opacity-30 text-xs font-mono text-white transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  disabled={activeChapterIndex === CHAPTERS_LIST.length - 1}
                  onClick={() => {
                    soundEngine.playNodeSelect();
                    setActiveChapterIndex((prev) => Math.min(CHAPTERS_LIST.length - 1, prev + 1));
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold disabled:opacity-30 text-xs font-mono transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Next Chapter →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
