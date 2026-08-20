import React, { useState } from 'react';
import { PERSONAL_INFO, BRAND_FOUNDATIONS, PERSONAL_MANIFESTO, CURRENTLY_EXPLORING_TAGS } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import { Sparkles, Heart, Compass, ShieldCheck, Brain, Globe, Users, Lightbulb, HeartHandshake, Target, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'foundations'>('manifesto');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-400" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="about" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 02 • ABOUT ME & MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Who I Am
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            I've never wanted to master just one thing. I've always been fascinated by the world in all its forms—its people, places, cultures, ideas, and stories.
          </p>
        </div>

        {/* 🎯 OPEN FOR & CURRENTLY EXPLORING HIGHLIGHT BAR */}
        <div className="liquid-glass-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 mb-16 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <Target className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                Open For & Currently Exploring
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30 self-start sm:self-auto font-semibold">
              ACTIVE COLLABORATIONS & INITIATIVES
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-light">
            Actively seeking research partnerships, social innovation projects, and international exchange opportunities in the following priority domains:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {CURRENTLY_EXPLORING_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    soundEngine.playCardHover();
                    setSelectedTag(isSelected ? null : tag);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-lg scale-105'
                      : 'liquid-glass text-slate-200 hover:text-white hover:border-amber-400/50'
                  }`}
                >
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          {selectedTag && (
            <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between gap-4 animate-fadeIn">
              <div className="text-xs text-amber-200 font-mono">
                Initiative Focus: <strong className="text-white">{selectedTag}</strong> • Open for research proposals, conferences, and institutional partnerships.
              </div>
              <a
                href="#connect"
                onClick={() => soundEngine.playClick()}
                className="px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-mono font-bold hover:bg-white transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                <span>Propose Collaboration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Who I Am Narrative Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Main Philosophical Prose (7 cols) */}
          <div className="lg:col-span-7">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(129, 140, 248, 0.15)"
              className="liquid-glass p-8 sm:p-10 rounded-3xl border border-white/10 space-y-4"
            >
              <div className="text-xs font-mono text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>The Core Philosophy</span>
              </div>
              <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                {PERSONAL_INFO.aboutWhoIAm.map((para, i) => (
                  <p key={i} className={i === 2 ? 'text-amber-300 font-medium italic text-base sm:text-lg' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </Card3DTilt>
          </div>

          {/* Core Values & Promise Capsule (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card3DTilt
              maxTilt={6}
              glowColor="rgba(244, 63, 94, 0.2)"
              className="liquid-glass-rose p-8 rounded-3xl border border-rose-500/30"
            >
              <div className="text-xs font-mono text-rose-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>My Promise</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Everyone Deserves to Be Heard
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light italic">
                &ldquo;{PERSONAL_INFO.brandPromise}&rdquo;
              </p>
            </Card3DTilt>

            <Card3DTilt
              maxTilt={6}
              glowColor="rgba(251, 191, 36, 0.2)"
              className="liquid-glass-gold p-8 rounded-3xl border border-amber-400/30"
            >
              <div className="text-xs font-mono text-amber-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Brand Values</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">
                Curiosity • Empathy • Evidence • Inclusion • Integrity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Guiding every research inquiry, enterprise blueprint, conversation, and creative expression with authentic rigor and compassion.
              </p>
            </Card3DTilt>
          </div>
        </div>

        {/* Tab Switcher: Personal Manifesto vs. Brand Foundation */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => {
              soundEngine.playNodeSelect();
              setActiveTab('manifesto');
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'manifesto'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                : 'liquid-glass text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            🌍 PERSONAL MANIFESTO (7 PILLARS)
          </button>

          <button
            onClick={() => {
              soundEngine.playNodeSelect();
              setActiveTab('foundations');
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'foundations'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                : 'liquid-glass text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            🏛️ BRAND FOUNDATION (PURPOSE & MISSION)
          </button>
        </div>

        {/* Tab Content: Personal Manifesto */}
        {activeTab === 'manifesto' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {PERSONAL_MANIFESTO.map((belief) => (
              <Card3DTilt
                key={belief.id}
                maxTilt={6}
                glowColor="rgba(251, 191, 36, 0.12)"
                className={`liquid-glass p-7 rounded-3xl border ${belief.accent} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {getIcon(belief.icon)}
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                      Belief
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {belief.topic}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-3">
                    {belief.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {belief.content}
                  </p>
                </div>

                {belief.quote && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-serif italic text-amber-200/90 leading-snug">
                      &ldquo;{belief.quote}&rdquo;
                    </p>
                  </div>
                )}
              </Card3DTilt>
            ))}
          </div>
        )}

        {/* Tab Content: Brand Foundation */}
        {activeTab === 'foundations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {BRAND_FOUNDATIONS.map((item) => (
              <Card3DTilt
                key={item.number}
                maxTilt={6}
                glowColor="rgba(129, 140, 248, 0.15)"
                className="liquid-glass p-7 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{item.number}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-amber-300 mb-3">
                    {item.statement}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </Card3DTilt>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
