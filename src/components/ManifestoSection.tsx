import React, { useState } from 'react';
import { MANIFESTO_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import { Users, Sparkles, Compass, HeartHandshake, Lightbulb, ShieldCheck, Quote } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Users,
  Sparkles,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck
};

export const ManifestoSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(MANIFESTO_ITEMS[0].id);

  const activeItem = MANIFESTO_ITEMS.find((item) => item.id === selectedTopic) || MANIFESTO_ITEMS[0];

  return (
    <section id="manifesto" className="relative py-24 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-3">
            <span>// SECTION 02</span>
            <span>•</span>
            <span>FOUNDATION & ETHOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Personal Manifesto & Mindset
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            I’ve never wanted to master just one thing. I’ve always been fascinated by the world in all its forms — its people,
            places, cultures, ideas, and stories. Every new experience changes how I think.
          </p>
        </div>

        {/* Brand Promise & North Star Banner */}
        <div className="mb-14 liquid-glass-gold p-6 sm:p-8 rounded-3xl border border-amber-400/30 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-400 mb-2">
                <Quote className="w-4 h-4" />
                <span>The North Star</span>
              </div>
              <blockquote className="text-lg sm:text-xl font-serif italic text-white leading-snug">
                &ldquo;{PERSONAL_INFO.northStar}&rdquo;
              </blockquote>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-amber-400/20 pt-4 md:pt-0 md:pl-8">
              <div className="text-xs uppercase tracking-widest font-mono text-amber-300 mb-2">
                Brand Promise
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {PERSONAL_INFO.brandPromise}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Manifesto Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANIFESTO_ITEMS.map((item) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const isSelected = item.id === selectedTopic;

            return (
              <Card3DTilt
                key={item.id}
                maxTilt={8}
                onClick={() => {
                  soundEngine.playChime(580, 0.2);
                  setSelectedTopic(item.id);
                }}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border ${
                  isSelected
                    ? 'liquid-glass-glow border-amber-400/50 scale-[1.01]'
                    : 'liquid-glass border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    {item.topic}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {item.topic}
                </h3>
                <h4 className="text-xs font-mono text-amber-400/90 mb-3 tracking-wide">
                  {item.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                  {item.content}
                </p>

                {item.quote && (
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-serif italic text-slate-400">
                    &ldquo;{item.quote}&rdquo;
                  </div>
                )}
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};
