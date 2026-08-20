import React from 'react';
import { RESEARCH_INTERESTS, CURRENTLY_EXPLORING_TAGS } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import {
  Compass,
  Accessibility,
  Zap,
  Leaf,
  Brain,
  Globe,
  BookOpen,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
  FolderLock
} from 'lucide-react';

interface ResearchSectionProps {
  onOpenContact: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onOpenContact }) => {
  const getInterestIcon = (icon: string) => {
    switch (icon) {
      case 'Accessibility': return <Accessibility className="w-6 h-6 text-amber-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-blue-400" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-emerald-400" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-rose-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="research" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-emerald-400 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>SECTION 04 • RESEARCH LABORATORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Curiosity Gives the Start. Research Gives Direction.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Every question I pursue is an opportunity to understand people, challenge assumptions, and create solutions that matter.
          </p>
        </div>

        {/* 🔬 Research Philosophy Hero Card */}
        <Card3DTilt
          maxTilt={4}
          glowColor="rgba(16, 185, 129, 0.2)"
          className="liquid-glass p-8 sm:p-12 rounded-3xl border border-emerald-500/30 mb-16 space-y-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
            <Compass className="w-4 h-4" />
            <span>Research Philosophy // The Ocean Principle</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Research is like an ocean. The deeper you go, the more valuable discoveries you uncover.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              For me, research is more than a method—it is a way of understanding the world. Every meaningful discovery begins with curiosity and grows through patience, evidence, and a willingness to ask better questions.
            </p>
            <p>
              While assumptions often remain on the surface, meaningful understanding lies beneath—in people, systems, cultures, and experiences. I don't aspire to have all the answers. I aspire to keep asking thoughtful questions, continue learning, and use what I discover to help build a more inclusive and sustainable future.
            </p>
          </div>
        </Card3DTilt>

        {/* 🌍 6 Research Interests Cards */}
        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 text-center">
            Core Research Interests & Methodologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_INTERESTS.map((interest) => (
              <Card3DTilt
                key={interest.id}
                maxTilt={6}
                glowColor="rgba(16, 185, 129, 0.15)"
                className="liquid-glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                    {getInterestIcon(interest.icon)}
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white mb-2">
                    {interest.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {interest.description}
                  </p>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

        {/* 📍 Currently Exploring Pills */}
        <div className="liquid-glass p-8 rounded-3xl border border-white/10 mb-16 text-center">
          <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
            📍 Currently Exploring
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CURRENTLY_EXPLORING_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full liquid-glass-subtle hover:liquid-glass-gold border border-white/10 text-slate-200 text-xs sm:text-sm font-mono transition-all"
              >
                • {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🌏 Research Experience [ Vietnam Timeline Card ] */}
        <Card3DTilt
          maxTilt={5}
          glowColor="rgba(56, 189, 248, 0.2)"
          className="liquid-glass p-8 sm:p-12 rounded-3xl border border-cyan-500/30 mb-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>International Research Internship • Score 3.7 / 4.0</span>
            </div>
            <span className="text-xs font-mono text-slate-400">August 30 – September 29, 2025</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Sustainable Development in the Industrial Sector
          </h3>
          <div className="text-xs sm:text-sm font-mono text-cyan-300 mb-6">
            Hanoi University of Mining and Geology (HUMG), Vietnam
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              My first international research experience took me to Vietnam, where I worked on research related to sustainable industrial development. Beyond the academic aspect, the experience became an opportunity to immerse myself in a new culture, collaborate with people from different backgrounds, and understand how local contexts shape global challenges.
            </p>
            <p>
              During the internship, I also served as a coordinator, contributed to collaborative activities, learned basic Vietnamese to better connect with the local community, and actively participated in discussions beyond the classroom. These experiences strengthened my belief that meaningful research begins by understanding people before attempting to solve their problems.
            </p>
            <p>
              While in Vietnam, I also had the opportunity to connect with local NGOs and institutions for potential volunteering and coordination work. Although I was unable to participate due to time and travel constraints, those conversations further reinforced my interest in community-centered research and social impact.
            </p>
          </div>
        </Card3DTilt>

        {/* 🌱 Looking Ahead [ Full-width Quote Style ] */}
        <div className="liquid-glass-gold p-8 sm:p-12 rounded-3xl border border-amber-400/30 mb-16 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-300 block mb-4">
            // SEEDING TOMORROW // LOOKING AHEAD
          </span>
          <p className="text-base sm:text-xl font-serif italic text-white leading-relaxed max-w-4xl mx-auto mb-6">
            &ldquo;I aspire to contribute to research that extends beyond academic publications and creates meaningful change in people's lives. My long-term goal is to collaborate with researchers, organizations, governments, and communities to develop evidence-based solutions that improve accessibility, strengthen inclusion, and encourage sustainable development.&rdquo;
          </p>
          <div className="text-xs sm:text-sm font-mono text-amber-300/80">
            For me, research should not end with discovery. It should inspire understanding, guide action, and leave the world better than we found it.
          </div>
        </div>

        {/* 📚 Research Archive [ Coming Soon ] */}
        <div className="liquid-glass p-8 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto">
          <FolderLock className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h4 className="text-lg font-serif font-bold text-white mb-2">Research Archive</h4>
          <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
            Future publications, conference papers, literature reviews, policy briefs, case studies, and ongoing research projects will be documented here as my research journey continues.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-amber-300">
            Status: Archive In Development
          </span>
        </div>
      </div>
    </section>
  );
};
