import React, { useState, useEffect } from 'react';
import {
  PERSONAL_INFO,
  BRAND_FOUNDATIONS,
  PERSONAL_MANIFESTO,
  CHAPTERS_LIST,
  RESEARCH_INTERESTS,
  CURRENTLY_EXPLORING_TAGS,
  PROJECT_L3_BELIEFS,
  PROJECT_L3_STAGES,
  CREATIVE_EXPRESSION_DATA,
  RECOGNITIONS_LIST,
  CONTACT_EXPLORING_ITEMS
} from '../data/portfolioData';
import { CERTIFICATES_LIST } from '../data/certificatesData';
import { CertificateFlipCard } from './CertificateFlipCard';
import portraitImg from '../assets/images/akshita_portrait_1787143112510.jpg';
import l3Banner from '../assets/images/project_l3_banner_1787143130841.jpg';
import DitherReveal from './DitherReveal';
import { TiltCard } from './TiltCard';
import {
  X,
  Sparkles,
  Heart,
  Globe,
  Compass,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ArrowRight,
  Download,
  GraduationCap,
  Volume2,
  CheckCircle2,
  FileText,
  Send,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Brain,
  Palette,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from './AudioAmbience';

interface FullPortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'about' | 'manifesto' | 'chapters' | 'research' | 'project-l3' | 'creative' | 'recognition' | 'contact' | 'certificates';
  onOpenCertificatesGallery: () => void;
  onOpenResume: () => void;
}

export const FullPortfolioDrawer: React.FC<FullPortfolioDrawerProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
  onOpenCertificatesGallery,
  onOpenResume
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeVoiceCharacter, setActiveVoiceCharacter] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Research Collaborations',
    message: ''
  });

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setContactSubmitted(true);
  };

  const navTabs = [
    { id: 'about', label: 'Who I Am', icon: Sparkles, code: 'SEC_02' },
    { id: 'manifesto', label: 'Manifesto', icon: Brain, code: 'DOC_MNF' },
    { id: 'chapters', label: '7 Chapters', icon: Globe, code: 'SEC_03' },
    { id: 'research', label: 'Research', icon: Compass, code: 'SEC_04' },
    { id: 'project-l3', label: 'Project L³', icon: Heart, code: 'SEC_05' },
    { id: 'creative', label: 'Creative', icon: Palette, code: 'SEC_06' },
    { id: 'recognition', label: 'Honors', icon: Award, code: 'SEC_07' },
    { id: 'certificates', label: '11 Certs', icon: FileText, code: 'VERIFIED' },
    { id: 'contact', label: 'Connect', icon: Mail, code: 'SEC_08' }
  ];

  const handleTabSwitch = (tabId: string) => {
    soundEngine.playCardHover();
    setActiveTab(tabId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Subtle CRT Scanline */}
      <div className="absolute inset-0 pixel-scanlines pointer-events-none opacity-20" />

      <div className="liquid-glass w-full max-w-6xl h-[92vh] rounded-2xl flex flex-col overflow-hidden border-2 border-white/30 shadow-2xl bg-black/92 relative z-10">
        {/* Pixel corners */}
        <div className="pixel-corner-tl" />
        <div className="pixel-corner-tr" />
        <div className="pixel-corner-bl" />
        <div className="pixel-corner-br" />

        {/* Drawer Top Bar */}
        <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between shrink-0 bg-black/70">
          <div className="flex items-center gap-3">
            <img
              src={portraitImg}
              alt="Akshita Dalsaniya"
              className="w-10 h-10 rounded-full object-cover border border-white/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-semibold text-base leading-tight font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Akshita Dalsaniya
                </h2>
                <span className="font-pixel-press text-[8px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 border border-amber-400/30 hidden sm:inline">
                  OFFICIAL PORTFOLIO
                </span>
              </div>
              <p className="text-white/60 text-xs font-pixel-vt323 tracking-wide">
                SYS.NODE: [SEC_{activeTab.toUpperCase()}] • PROJECT L³ FOUNDER • CFA LEVEL I CANDIDATE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm pixel-hud-box text-[11px] font-pixel-silk text-white hover:bg-white/10 transition-colors"
            >
              <Download size={12} />
              <span>CV [PDF]</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white hover:bg-amber-300 text-black font-pixel-press text-[9px] tracking-wider transition-all cursor-pointer shadow-md"
              aria-label="Return to movie scene"
            >
              <RotateCcw size={11} />
              <span>RETURN TO SCENE [ESC]</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="px-5 py-2 border-b border-white/15 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0 bg-black/60">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-pixel-silk whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-300 text-black font-bold border border-amber-300 shadow-md scale-105'
                    : 'pixel-hud-box text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                <span className="opacity-50 text-[9px]">[{tab.code}]</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12">
          {/* TAB: ABOUT / WHO I AM */}
          {activeTab === 'about' && (
            <div className="space-y-10 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 01 & 02 • IDENTITY & NORTH STAR
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Exploring. Learning. Becoming.
                </h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-2xl mx-auto">
                  {PERSONAL_INFO.supportingText}
                </p>
              </div>

              {/* North Star Box */}
              <div className="pixel-hud-box p-6 md:p-8 rounded-sm space-y-2 border-2 border-white/20 text-center">
                <div className="pixel-corner-tl" />
                <div className="pixel-corner-tr" />
                <div className="pixel-corner-bl" />
                <div className="pixel-corner-br" />
                <span className="font-pixel-silk text-xs tracking-widest text-amber-300 block">
                  ★ MY NORTH STAR
                </span>
                <p
                  className="text-xl md:text-2xl text-white italic font-serif-instrument leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;{PERSONAL_INFO.northStar}&rdquo;
                </p>
              </div>

              {/* 🎯 OPEN FOR & CURRENTLY EXPLORING HIGHLIGHT */}
              <div className="pixel-hud-box p-6 rounded-sm space-y-3 border border-amber-400/40">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-pixel-press text-[9px] text-amber-300 tracking-wider">
                    🎯 OPEN FOR & CURRENTLY EXPLORING
                  </span>
                  <span className="text-[10px] font-pixel-silk text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/30">
                    ACTIVE EXPLORATION
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CURRENTLY_EXPLORING_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-black/50 border border-white/20 text-white/90 text-xs font-pixel-silk rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Who I Am Narrative */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative pixel-hud-box rounded-sm overflow-hidden border-2 border-white/30 shadow-2xl p-1 w-full max-w-[260px] aspect-[4/5]">
                    <DitherReveal
                      image={{ src: portraitImg }}
                      ditherStyle="bayer8"
                      dotSize={4}
                      revealRadius={120}
                      revealSoftness={50}
                      wave={true}
                      waveSpeed={70}
                      waveDensity={25}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-x-1 bottom-1 bg-black/85 p-3 flex flex-col justify-end border-t border-white/20 pointer-events-none z-10">
                      <span className="text-white font-semibold text-sm">Akshita Dalsaniya</span>
                      <span className="text-amber-300 text-xs font-pixel-vt323">
                        BBA (CGPA 8.0/10) • CFA LEVEL I CANDIDATE
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 pixel-hud-box p-6 md:p-8 rounded-sm space-y-4">
                  <div className="pixel-corner-tl" />
                  <div className="pixel-corner-tr" />
                  <div className="pixel-corner-bl" />
                  <div className="pixel-corner-br" />
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-white font-semibold text-lg font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      Who I Am
                    </h4>
                    <span className="font-pixel-silk text-[10px] text-white/50">BIO.NARRATIVE</span>
                  </div>
                  {PERSONAL_INFO.aboutWhoIAm.map((paragraph, idx) => (
                    <p key={idx} className="text-white/80 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Brand Foundations Grid */}
              <div className="space-y-4 pt-4">
                <h4 className="font-pixel-silk text-xs tracking-widest uppercase text-amber-300 text-center">
                  BRAND FOUNDATION (PURPOSE, MISSION, VISION, VALUES)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BRAND_FOUNDATIONS.map((bf) => (
                    <div key={bf.number} className="pixel-hud-box p-5 rounded-sm space-y-2">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-pixel-silk">
                        <span>{bf.number}</span>
                        <span>{bf.title}</span>
                      </div>
                      <h5 className="text-white font-medium text-sm leading-snug">{bf.statement}</h5>
                      <p className="text-white/70 text-xs leading-relaxed">{bf.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MANIFESTO */}
          {activeTab === 'manifesto' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  PERSONAL MANIFESTO // 7 CORE BELIEFS
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  What I Believe About the World
                </h3>
                <p className="text-white/70 text-sm">
                  Foundational principles shaping research, inclusion advocacy, and creative endeavors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PERSONAL_MANIFESTO.map((item) => (
                  <div key={item.id} className="pixel-hud-box p-5 rounded-sm space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-pixel-silk text-amber-300 mb-1">
                        <span>{item.subtitle}</span>
                        <Brain size={14} />
                      </div>
                      <h4 className="text-white font-semibold text-base mb-2 font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {item.topic}
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.content}</p>
                    </div>
                    {item.quote && (
                      <div className="pt-3 border-t border-white/10">
                        <p
                          className="text-xs italic text-amber-200 font-serif-instrument"
                          style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Inclusion Creed Banner */}
              <div className="pixel-hud-box p-8 rounded-sm text-center space-y-3 border-2 border-amber-400/40">
                <Heart size={24} className="text-amber-400 mx-auto animate-pulse" />
                <p
                  className="text-lg md:text-xl text-white italic font-serif-instrument leading-relaxed max-w-2xl mx-auto"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;I want every person with a disability to feel that they are never alone—that there will always be people, systems, and communities that believe in them, stand beside them, and continue working to remove the barriers they face. Project L³ exists to help build that future.&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* TAB: CHAPTERS */}
          {activeTab === 'chapters' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 03 • CHAPTERS OF EVOLUTION (01-07)
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Every Experience Adds a Perspective
                </h3>
                <p className="text-white/70 text-sm">
                  Shaped a new chapter, and brought me one step closer to understanding the world.
                </p>
              </div>

              {/* Stepper Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CHAPTERS_LIST.map((chapter, idx) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      soundEngine.playCardHover();
                      setActiveChapterIndex(idx);
                    }}
                    className={`px-3.5 py-2 rounded-sm text-xs font-pixel-silk whitespace-nowrap transition-all cursor-pointer ${
                      idx === activeChapterIndex
                        ? 'bg-amber-300 text-black font-bold shadow-md'
                        : 'pixel-hud-box text-white/70 hover:text-white'
                    }`}
                  >
                    CH.{chapter.number} {chapter.badge.split(' ')[1] || chapter.badge}
                  </button>
                ))}
              </div>

              {/* Active Chapter Card */}
              {(() => {
                const chap = CHAPTERS_LIST[activeChapterIndex];
                return (
                  <div className="pixel-hud-box p-6 md:p-10 rounded-sm space-y-6">
                    <div className="pixel-corner-tl" />
                    <div className="pixel-corner-tr" />
                    <div className="pixel-corner-bl" />
                    <div className="pixel-corner-br" />

                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-pixel-silk text-white/60">
                      <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {chap.badge}
                      </span>
                      <span>CHAPTER {chap.number} OF 07</span>
                    </div>

                    <h4
                      className="text-3xl md:text-4xl text-white font-serif-instrument"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {chap.title}
                    </h4>
                    <p className="text-amber-300/80 text-xs font-pixel-vt323 tracking-wide">{chap.subtitle}</p>

                    <div className="space-y-4 text-white/85 text-sm leading-relaxed">
                      {chap.story.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-start gap-3">
                      <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-pixel-silk uppercase tracking-widest text-amber-300 block">
                          CHAPTER TAKEAWAY
                        </span>
                        <p className="text-sm italic text-white font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          &ldquo;{chap.takeaway}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: RESEARCH */}
          {activeTab === 'research' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 04 • RESEARCH LABORATORY
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Curiosity Starts the Journey. Research Gives Direction.
                </h3>
                <p className="text-white/70 text-sm">
                  Every question I pursue is an opportunity to understand people, challenge assumptions, and create solutions that matter.
                </p>
              </div>

              {/* Research Philosophy Card */}
              <div className="pixel-hud-box p-6 md:p-8 rounded-sm space-y-4">
                <div className="pixel-corner-tl" />
                <div className="pixel-corner-tr" />
                <div className="pixel-corner-bl" />
                <div className="pixel-corner-br" />
                <div className="flex items-center gap-2 text-xs font-pixel-silk text-amber-300 uppercase">
                  <Compass size={16} />
                  <span>🔬 RESEARCH PHILOSOPHY // THE OCEAN PRINCIPLE</span>
                </div>
                <p
                  className="text-xl text-white font-serif-instrument italic"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;Research is like an ocean. The deeper we are willing to explore, the more valuable discoveries we uncover.&rdquo;
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  For me, research is more than a method—it is a way of understanding the world. Every meaningful discovery begins with curiosity and grows through patience, evidence, and a willingness to ask better questions.
                </p>
              </div>

              {/* 6 Research Interests Cards */}
              <div className="space-y-4">
                <h4 className="font-pixel-silk text-xs uppercase tracking-widest text-amber-300">
                  🌍 6 CORE RESEARCH INTERESTS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {RESEARCH_INTERESTS.map((ri) => (
                    <div key={ri.id} className="pixel-hud-box p-4 rounded-sm space-y-2">
                      <h5 className="text-white font-semibold text-sm font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {ri.title}
                      </h5>
                      <p className="text-white/70 text-xs leading-relaxed">{ri.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currently Exploring Tags */}
              <div className="pixel-hud-box p-5 rounded-sm space-y-3">
                <span className="font-pixel-silk text-xs uppercase tracking-widest text-amber-300 block">
                  📍 CURRENTLY EXPLORING
                </span>
                <div className="flex flex-wrap gap-2">
                  {CURRENTLY_EXPLORING_TAGS.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-white/10 border border-white/20 text-white text-xs font-pixel-vt323">
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vietnam Timeline */}
              <div className="pixel-hud-box p-6 md:p-8 rounded-sm space-y-4 border-2 border-white/30">
                <div className="flex items-center justify-between text-xs font-pixel-silk text-white/60 flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    INTERNATIONAL RESEARCH INTERNSHIP • SCORE 3.7 / 4.0
                  </span>
                  <span>AUG 30 – SEP 29, 2025</span>
                </div>
                <h4 className="text-xl text-white font-semibold font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Sustainable Development in the Industrial Sector
                </h4>
                <p className="text-white/60 text-xs font-pixel-vt323">HANOI UNIVERSITY OF MINING AND GEOLOGY (HUMG), VIETNAM</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  My first international research experience took me to Vietnam, where I worked on research related to sustainable industrial development. Beyond the academic aspect, the experience became an opportunity to immerse myself in a new culture, coordinate collaborative activities, and understand how local contexts shape global challenges.
                </p>
              </div>
            </div>
          )}

          {/* TAB: PROJECT L3 */}
          {activeTab === 'project-l3' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 05 • PROJECT L³ (LOVE. LAUGHTER. LIFE.)
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Universal Inclusion & Assistive Innovation
                </h3>
                <p className="text-white/70 text-sm italic font-serif-instrument text-base" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Building a future where inclusion is not an exception, but the foundation.
                </p>
              </div>

              <div className="relative pixel-hud-box rounded-sm overflow-hidden border-2 border-amber-400/40">
                <img src={l3Banner} alt="Project L3" className="w-full h-48 md:h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-white font-bold text-2xl font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Project L³ — Love. Laughter. Life.
                  </h4>
                  <p className="text-amber-200 text-xs font-pixel-silk mt-1">
                    A long-term disability inclusion and universal design social initiative.
                  </p>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pixel-hud-box p-5 rounded-sm space-y-2">
                  <span className="font-pixel-silk text-xs text-amber-300 uppercase block">🎯 OUR MISSION</span>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    To build a world where every individual—regardless of ability—has the opportunity to belong, participate, and realize their full potential through research, innovation, empathy, and inclusive design.
                  </p>
                </div>
                <div className="pixel-hud-box p-5 rounded-sm space-y-2">
                  <span className="font-pixel-silk text-xs text-amber-300 uppercase block">🌍 OUR VISION</span>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    A future where inclusion is no longer treated as an afterthought but becomes the starting point of every innovation, policy, product, service, and experience.
                  </p>
                </div>
              </div>

              {/* 6 Beliefs */}
              <div className="space-y-4">
                <h4 className="font-pixel-silk text-xs uppercase tracking-widest text-amber-300">
                  💙 WHAT WE BELIEVE (6 CORE PRINCIPLES)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {PROJECT_L3_BELIEFS.map((b, i) => (
                    <div key={i} className="pixel-hud-box p-4 rounded-sm space-y-1.5">
                      <span className="font-pixel-press text-[9px] text-amber-300">0{i + 1}</span>
                      <h5 className="text-white font-semibold text-sm font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {b.title}
                      </h5>
                      <p className="text-white/70 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-Phase Road Ahead */}
              <div className="pixel-hud-box p-6 md:p-8 rounded-sm space-y-4">
                <span className="font-pixel-silk text-xs uppercase tracking-widest text-amber-300 block">
                  🗺️ THE ROAD AHEAD (5 PHASES)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PROJECT_L3_STAGES.map((phase, idx) => (
                    <button
                      key={phase.phaseNumber}
                      onClick={() => {
                        soundEngine.playCardHover();
                        setActivePhaseIndex(idx);
                      }}
                      className={`p-2.5 rounded-sm text-left font-pixel-silk text-xs transition-all cursor-pointer ${
                        activePhaseIndex === idx
                          ? 'bg-amber-300 text-black font-bold'
                          : 'bg-white/5 text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="text-[9px] block opacity-70">PHASE {phase.phaseNumber}</span>
                      <span className="text-xs block truncate">{phase.title}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-sm bg-black/60 border border-white/20">
                  <h5 className="text-white font-semibold text-sm font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Phase {PROJECT_L3_STAGES[activePhaseIndex].phaseNumber}: {PROJECT_L3_STAGES[activePhaseIndex].title}
                  </h5>
                  <p className="text-white/80 text-xs mt-1 leading-relaxed">
                    {PROJECT_L3_STAGES[activePhaseIndex].desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CREATIVE */}
          {activeTab === 'creative' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 06 • CREATIVE EXPRESSION
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Where Words, Art & Emotion Meet
                </h3>
                <p
                  className="text-amber-200 text-sm italic font-serif-instrument text-base"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;{CREATIVE_EXPRESSION_DATA.closingArtQuote}&rdquo;
                </p>
              </div>

              {/* Debut Novel & Poetry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pixel-hud-box p-6 rounded-sm space-y-4">
                  <div className="flex items-center justify-between text-xs font-pixel-silk text-white/60">
                    <span className="text-amber-300">📖 FICTION</span>
                    <span className="px-2 py-0.5 bg-white/10 text-white">IN PROGRESS</span>
                  </div>
                  <h4 className="text-xl text-white font-semibold font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {CREATIVE_EXPRESSION_DATA.debutNovel.title}
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    {CREATIVE_EXPRESSION_DATA.debutNovel.desc}
                  </p>
                </div>

                <div className="pixel-hud-box p-6 rounded-sm space-y-4">
                  <div className="text-xs font-pixel-silk text-amber-300">✒️ POETRY</div>
                  <h4 className="text-xl text-white font-semibold font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Between Words & Silence
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    {CREATIVE_EXPRESSION_DATA.poetry.desc}
                  </p>
                </div>
              </div>

              {/* Beyond Words & Voice Mimicry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pixel-hud-box p-5 rounded-sm space-y-3">
                  <span className="font-pixel-silk text-xs text-amber-300 uppercase block">🎨 BEYOND WORDS</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/80 font-pixel-vt323 text-base">
                    {CREATIVE_EXPRESSION_DATA.beyondWords.map((item) => (
                      <div key={item} className="p-2 bg-white/5 border border-white/10">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pixel-hud-box p-5 rounded-sm space-y-3">
                  <span className="font-pixel-silk text-xs text-amber-300 uppercase block">🌟 CARTOON VOICE MIMICRY</span>
                  <p className="text-white/80 text-xs leading-relaxed">
                    {CREATIVE_EXPRESSION_DATA.playfulSide.desc}
                  </p>
                  <div className="p-3 bg-black/60 border border-amber-400/30 text-xs text-amber-200">
                    <span className="font-pixel-press text-[8px] block mb-1">INTERACTIVE MIMICRY EXPRESSION</span>
                    Shinchan, Doraemon, and animated vocal sound design expressions.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RECOGNITION */}
          {activeTab === 'recognition' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 07 • RECOGNITIONS & 11 VERIFIED CERTIFICATES
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Every Recognition Tells a Story
                </h3>
                <p className="text-white/70 text-sm">
                  Not of reaching the finish line, but of discovering new paths worth exploring.
                </p>
              </div>

              {/* 11 Certificates CTA banner */}
              <div className="pixel-hud-box p-6 md:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-amber-400/50">
                <div>
                  <h4 className="text-white font-semibold text-lg font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    11 Verified Official Certificates
                  </h4>
                  <p className="text-white/70 text-xs mt-1 font-pixel-vt323 text-base">
                    ISL 40-HOUR, QUEEN’S COMMONWEALTH SILVER AWARD, RBI90 QUIZ, HUMG VIETNAM, NISM SEBI, ETC.
                  </p>
                </div>
                <button
                  onClick={onOpenCertificatesGallery}
                  className="px-5 py-2.5 bg-amber-300 hover:bg-white text-black font-pixel-press text-[9px] tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer shadow-lg"
                >
                  OPEN 11 CERTIFICATES GALLERY
                </button>
              </div>

              {/* Recognitions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOGNITIONS_LIST.map((rec) => (
                  <div key={rec.id} className="pixel-hud-box p-5 rounded-sm space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-pixel-silk px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {rec.badge}
                      </span>
                      <h5 className="text-white font-semibold text-base mt-2 font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {rec.title}
                      </h5>
                      <p className="text-white/60 text-xs font-pixel-vt323">{rec.subtitle}</p>
                      <p className="text-white/80 text-xs mt-2 leading-relaxed">{rec.story}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pixel-hud-box p-6 rounded-sm text-center space-y-2">
                <span className="font-pixel-silk text-xs uppercase tracking-widest text-amber-300 block">
                  ✨ STILL UNFOLDING...
                </span>
                <p
                  className="text-xl text-white font-serif-instrument italic"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;Recognition is not the goal. Growth is.&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* TAB: 11 CERTIFICATES GALLERY */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  VERIFIED CREDENTIALS ARCHIVE
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  11 Official Documents & Awards
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CERTIFICATES_LIST.map((cert) => (
                  <div key={cert.id} className="w-full">
                    <CertificateFlipCard
                      cert={cert}
                      isCompact={true}
                      onInspect={() => onOpenCertificatesGallery()}
                      allowEdit={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONNECT */}
          {activeTab === 'contact' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="font-pixel-press text-[9px] tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 border border-amber-400/40 uppercase">
                  SECTION 08 • LET’S CONNECT & COLLABORATE
                </span>
                <h3
                  className="text-4xl md:text-5xl text-white font-serif-instrument mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Every Meaningful Journey Begins With a Conversation
                </h3>
                <p className="text-white/70 text-sm">
                  Whether it’s a new idea, a shared curiosity, or a challenge worth solving, I’d love to hear your story too.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 pixel-hud-box p-6 rounded-sm space-y-4">
                  <h4 className="text-white font-semibold text-base font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Contact Information
                  </h4>
                  <div className="space-y-3 text-xs text-white/80">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Mail size={16} className="text-amber-400" />
                      <div className="truncate">
                        <span className="text-[9px] text-white/50 block font-pixel-silk">EMAIL</span>
                        <span className="font-mono">{PERSONAL_INFO.email}</span>
                      </div>
                    </a>

                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Phone size={16} className="text-amber-400" />
                      <div>
                        <span className="text-[9px] text-white/50 block font-pixel-silk">PHONE</span>
                        <span className="font-mono">{PERSONAL_INFO.phone}</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10">
                      <MapPin size={16} className="text-amber-400" />
                      <div>
                        <span className="text-[9px] text-white/50 block font-pixel-silk">LOCATION</span>
                        <span>{PERSONAL_INFO.location}</span>
                      </div>
                    </div>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Linkedin size={16} className="text-amber-400" />
                        <div>
                          <span className="text-[9px] text-white/50 block font-pixel-silk">LINKEDIN</span>
                          <span>{PERSONAL_INFO.linkedinDisplay}</span>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-white/50" />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-7 pixel-hud-box p-6 md:p-8 rounded-sm">
                  {contactSubmitted ? (
                    <div className="text-center py-10 space-y-3">
                      <CheckCircle2 size={36} className="text-emerald-400 mx-auto animate-bounce" />
                      <h4 className="text-white font-semibold text-lg font-serif-instrument" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        Message Dispatched!
                      </h4>
                      <p className="text-white/70 text-xs font-pixel-vt323 text-base">
                        THANK YOU FOR REACHING OUT. AKSHITA WILL RESPOND PROMPTLY.
                      </p>
                      <button
                        onClick={() => setContactSubmitted(false)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-pixel-silk cursor-pointer"
                      >
                        SEND ANOTHER NOTE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-pixel-silk text-white/60 mb-1">YOUR NAME</label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Name"
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-pixel-silk text-white/60 mb-1">YOUR EMAIL</label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="Email"
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-pixel-silk text-white/60 mb-1">TOPIC</label>
                        <select
                          value={contactForm.topic}
                          onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                          className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          {CONTACT_EXPLORING_ITEMS.map((item) => (
                            <option key={item} value={item} className="bg-black text-white">
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-pixel-silk text-white/60 mb-1">YOUR MESSAGE</label>
                        <textarea
                          rows={3}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Your message or collaboration idea..."
                          className="w-full px-3 py-2 bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-300 hover:bg-white text-black font-pixel-press text-[9px] tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Send size={13} />
                        <span>DISPATCH MESSAGE [SEND]</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* The Final Words */}
              <div className="text-center pt-8 border-t border-white/10 space-y-3">
                <span className="font-pixel-press text-[9px] tracking-[0.35em] text-amber-400 uppercase">
                  🌌 THE FINAL WORDS
                </span>
                <p
                  className="text-2xl md:text-3xl text-white font-serif-instrument italic leading-relaxed"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Still Exploring.<br />
                  Exploring new ideas.<br />
                  Learning from every experience.<br />
                  Becoming a better human, one question at a time.
                </p>
                <p className="font-pixel-vt323 text-sm text-white/40">
                  © {new Date().getFullYear()} AKSHITA DALSANIYA • ALL RIGHTS RESERVED
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
