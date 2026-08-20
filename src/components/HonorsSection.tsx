import React, { useState } from 'react';
import { RECOGNITIONS_LIST } from '../data/portfolioData';
import { CERTIFICATES_LIST } from '../data/certificatesData';
import { Card3DTilt } from './Card3DTilt';
import { CertificateFlipCard } from './CertificateFlipCard';
import { soundEngine } from './AudioAmbience';
import { Award, Trophy, GraduationCap, Building2, BookOpen, Sparkles, CheckCircle2, ArrowUpRight, RotateCw, Filter } from 'lucide-react';

interface HonorsSectionProps {
  onOpenCertificates: (certId?: string) => void;
}

export const HonorsSection: React.FC<HonorsSectionProps> = ({ onOpenCertificates }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getRecognitionIcon = (icon: string) => {
    switch (icon) {
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-rose-400" />;
      default: return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  const categories = ['All', 'Disability & Inclusion', 'Research', 'Finance', 'Creative & Arts', 'Academic & Leadership'];

  const filteredCerts = CERTIFICATES_LIST.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  return (
    <section id="recognition" className="relative py-24 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>SECTION 07 • RECOGNITION & DISTINCTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Every Recognition Tells a Story
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Tap any certificate to flip between front official image and back verification ledger. Upload or browse your own certificate images anytime.
          </p>
        </div>

        {/* 11 Verified Certificates Quick Showcase Strip */}
        <div className="liquid-glass-gold p-6 sm:p-8 rounded-3xl border border-amber-400/30 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_25px_rgba(251,191,36,0.3)]">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-300">
                11 OFFICIAL VERIFIED CREDENTIALS & AWARDS
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                Authentic Academic & Professional Dossier
              </h3>
              <p className="text-xs text-slate-300 font-light mt-1">
                Equipped with 3D Tap-Flip interaction, live ledger verification, and customizable gallery integration.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playChime(750, 0.3);
              onOpenCertificates();
            }}
            className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-400/20 shrink-0 cursor-pointer flex items-center gap-2 hover:scale-105"
          >
            <span>3D Coverflow View (11)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black font-bold shadow-md scale-105'
                  : 'bg-black/50 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 11 Verified Certificates Grid with Tap Flip & Gallery Customizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="w-full">
              <CertificateFlipCard
                cert={cert}
                isCompact={true}
                onInspect={() => onOpenCertificates(cert.id)}
                allowEdit={true}
              />
            </div>
          ))}
        </div>

        {/* Major Recognitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {RECOGNITIONS_LIST.map((item) => (
            <Card3DTilt
              key={item.id}
              maxTilt={6}
              glowColor="rgba(251, 191, 36, 0.15)"
              className="liquid-glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getRecognitionIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">{item.level}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-amber-300/90 mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {item.story}
                </p>
              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Closing Quote */}
        <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 block">
            ✨ STILL UNFOLDING...
          </span>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            The recognitions I value most are still ahead: published research, international fellowships, conference presentations, books, and social innovation initiatives that create meaningful change.
          </p>
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-2xl sm:text-3xl font-serif italic text-white">
              &ldquo;Recognition is not the goal. Growth is.&rdquo;
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};
