import React, { useState } from 'react';
import { PROJECT_L3_BELIEFS, PROJECT_L3_STAGES } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import l3Banner from '../assets/images/project_l3_banner_1787143130841.jpg';
import {
  Heart,
  Sparkles,
  Users,
  Brain,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  Compass,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface ProjectL3SectionProps {
  onJoinJourney: () => void;
}

export const ProjectL3Section: React.FC<ProjectL3SectionProps> = ({ onJoinJourney }) => {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section id="project-l3" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-rose-400 mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>SECTION 05 • FOUNDER’S INITIATIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Project L³ (Love. Laughter. Life.)
          </h2>
          <p className="text-rose-300 font-serif italic text-lg sm:text-xl font-light">
            Building a future where inclusion is not an exception, but the foundation.
          </p>
        </div>

        {/* Hero Banner with Story & Turning Point */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(244, 63, 94, 0.2)"
              className="liquid-glass-rose p-8 sm:p-10 rounded-3xl border border-rose-500/30 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-300">
                <Heart className="w-4 h-4" />
                <span>🌱 The Story & Genesis</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                Why do we continue designing systems for humans while unintentionally leaving some humans behind?
              </h3>
              <div className="space-y-3 text-slate-200 text-xs sm:text-sm leading-relaxed font-light">
                <p>
                  The more I observed the world, the more I realized that many barriers faced by people with disabilities are not created by their abilities, but by environments, systems, and opportunities that were never designed with them in mind.
                </p>
                <p>
                  That realization became impossible to ignore. It slowly evolved into Project L³ — Love. Laughter. Life.
                </p>
                <p className="text-rose-200 font-medium">
                  Project L³ is more than a social initiative. It is my lifelong commitment to researching, understanding, and building solutions that help create a world where every individual feels seen, valued, and included.
                </p>
              </div>
            </Card3DTilt>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {/* Visual Cover Artwork */}
            <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl group">
              <img
                src={l3Banner}
                alt="Project L3 Banner"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400">
                  Universal Design • Behavioral Science • Systemic Dignity
                </span>
                <h4 className="text-xl font-serif font-bold text-white mt-1">
                  Love. Laughter. Life.
                </h4>
              </div>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="liquid-glass p-5 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block mb-1">
                  🎯 Our Mission
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  To build a world where every individual—regardless of ability—has the opportunity to belong, participate, and realize their full potential through research, innovation, empathy, and inclusive design.
                </p>
              </div>

              <div className="liquid-glass p-5 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  🌍 Our Vision
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  A future where inclusion is no longer treated as an afterthought but becomes the starting point of every innovation, policy, product, service, and experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 💙 What We Believe (6 Core Principles) */}
        <div className="mb-20">
          <h3 className="text-xs font-mono uppercase tracking-widest text-rose-300 mb-6 text-center">
            💙 What We Believe (6 Foundational Pillars)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_L3_BELIEFS.map((belief, idx) => (
              <Card3DTilt
                key={idx}
                maxTilt={6}
                glowColor="rgba(244, 63, 94, 0.15)"
                className="liquid-glass p-7 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-rose-400 font-bold">0{idx + 1}</span>
                    <Heart className="w-4 h-4 text-rose-400/80" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">
                    {belief.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {belief.desc}
                  </p>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

        {/* 🚀 Current Stage & 🗺️ The Road Ahead (5 Phases Interactive Stepper) */}
        <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-white/10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              🚀 CURRENT STAGE: RESEARCH & FOUNDATION PHASE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The Road Ahead: 5-Phase Evolution
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {PROJECT_L3_STAGES.map((stg, i) => (
              <button
                key={stg.phaseNumber}
                onClick={() => {
                  soundEngine.playNodeSelect();
                  setActivePhase(i);
                }}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
                  activePhase === i
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 border border-rose-400'
                    : 'liquid-glass-subtle hover:liquid-glass text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <span className="text-[10px] font-mono block opacity-80 mb-1">
                  PHASE {stg.phaseNumber}
                </span>
                <span className="text-xs font-semibold block leading-tight">
                  {stg.title}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-rose-300 uppercase tracking-widest">
                Phase {PROJECT_L3_STAGES[activePhase].phaseNumber} Details
              </div>
              <h4 className="text-lg font-serif font-bold text-white mt-0.5 mb-1">
                {PROJECT_L3_STAGES[activePhase].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {PROJECT_L3_STAGES[activePhase].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 My Promise & 🤝 Join the Journey Callout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(251, 191, 36, 0.2)"
              className="liquid-glass-gold p-8 rounded-3xl border border-amber-400/30"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block mb-2">
                🌟 MY PROMISE
              </span>
              <h4 className="text-xl font-serif font-bold text-white mb-3">
                No question will be dismissed simply because it is difficult.
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                I don't promise to have every answer. I promise that no question will be dismissed simply because it is difficult. I will continue listening, learning, researching, and working alongside communities until better solutions exist. Because everyone deserves a world that was designed with them in mind.
              </p>
            </Card3DTilt>
          </div>

          <div className="md:col-span-5 text-center md:text-left liquid-glass p-8 rounded-3xl border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block">
              🤝 JOIN THE JOURNEY
            </span>
            <h4 className="text-xl font-serif font-bold text-white">
              Every meaningful change begins with one question worth chasing.
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              If you believe in creating a world that is more inclusive, more accessible, and more compassionate, I'd love to connect.
            </p>
            <button
              onClick={() => {
                soundEngine.playChime(800, 0.3);
                onJoinJourney();
              }}
              className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-rose-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Join the Journey</span>
              <HeartHandshake className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
