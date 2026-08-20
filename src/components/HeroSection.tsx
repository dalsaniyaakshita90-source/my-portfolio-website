import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Hero3DCanvas } from './canvas/Hero3DCanvas';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import portraitImg from '../assets/images/akshita_portrait_1787143112510.jpg';
import { Sparkles, Download, ArrowDown, Award, Globe2, BookOpen, Heart, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenResume: () => void;
  onExploreWork: () => void;
  onOpenCertificates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onExploreWork,
  onOpenCertificates
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-12 z-10">
      {/* Background Subtle Video / Texture Ambient Blend */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-25 mix-blend-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03060f]/60 via-transparent to-[#03060f]" />
      </div>

      {/* Main Grid: Left Typographic Narrative & Right 3D Visual Hub */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Cinematic Identity (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Capsule */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>FOUNDER, PROJECT L³ • DISABILITY INCLUSION & SUSTAINABILITY RESEARCH</span>
          </div>

          {/* Name & Tagline */}
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05]">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-2xl sm:text-4xl font-serif italic text-amber-300/90 mt-2 tracking-wide font-light">
              {PERSONAL_INFO.tagline}
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl">
            {PERSONAL_INFO.supportingText}
          </p>

          {/* North Star Quote Box */}
          <Card3DTilt
            maxTilt={5}
            glowColor="rgba(251, 191, 36, 0.15)"
            className="liquid-glass-gold p-5 rounded-2xl border border-amber-400/30"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-amber-300/90 block mb-1">
                  // MY NORTH STAR
                </span>
                <p className="text-sm sm:text-base font-serif italic text-slate-100 leading-snug">
                  &ldquo;{PERSONAL_INFO.northStar}&rdquo;
                </p>
              </div>
            </div>
          </Card3DTilt>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundEngine.playNodeSelect();
                onExploreWork();
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:scale-[1.03] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEngine.playChime(650, 0.2);
                onOpenResume();
              }}
              className="px-7 py-3.5 rounded-full liquid-glass hover:liquid-glass-strong border border-white/20 hover:border-amber-400/50 text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download CV</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playChime(780, 0.2);
                onOpenCertificates();
              }}
              className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs font-mono transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>11 Verified Certificates</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Holographic Canvas + Portrait Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Interactive 3D Crystal Polyhedron Canvas */}
          <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[420px]">
            <Hero3DCanvas />

            {/* Floating Portrait Badge */}
            <div className="absolute -bottom-6 -left-4 sm:bottom-0 sm:left-0 z-20">
              <Card3DTilt
                maxTilt={8}
                glowColor="rgba(251, 191, 36, 0.3)"
                className="liquid-glass p-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3.5 backdrop-blur-2xl"
              >
                <img
                  src={portraitImg}
                  alt="Akshita Dalsaniya"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-400/40 shadow-md"
                />
                <div className="pr-3">
                  <h4 className="font-serif font-bold text-sm text-white">Akshita Dalsaniya</h4>
                  <p className="text-[11px] text-amber-300 font-mono">RK University • BBA (8.0/10)</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                      Project L³
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                      CFA Level I
                    </span>
                  </div>
                </div>
              </Card3DTilt>
            </div>

            {/* Quick Metrics Badge (Right) */}
            <div className="absolute -top-4 -right-2 sm:top-2 sm:right-0 z-20">
              <div className="liquid-glass px-4 py-2 rounded-xl border border-white/10 text-right shadow-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  International Research
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  HUMG Vietnam (Score 3.7/4.0)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Scroll Indicator & Quick Roles Strip */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs text-slate-400 font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-amber-400 font-bold">FOCUS:</span>
          <span>Disability Inclusion</span>
          <span>•</span>
          <span>Social Innovation</span>
          <span>•</span>
          <span>Sustainability</span>
          <span>•</span>
          <span>Creative Writing</span>
          <span>•</span>
          <span>Finance & CFA</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer" onClick={onExploreWork}>
          <span>Scroll to explore narrative</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
        </div>
      </div>
    </section>
  );
};
