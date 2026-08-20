import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Compass,
  Palette,
  Award,
  Globe,
  Mail,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Volume2,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Send,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Brain,
  Layers,
  Terminal,
  ShieldCheck,
  Cpu,
  Radio,
  Sliders,
  Code,
  Play,
  Pause,
  Upload,
  RefreshCw,
  RotateCw,
  Zap,
  Target,
  Search,
  Check,
  X,
  Maximize2,
  Minimize2,
  Image as ImageIcon
} from 'lucide-react';
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
import { CERTIFICATES_LIST, CertificateItem } from '../data/certificatesData';
import { getStoredCustomCertificates } from '../utils/certificateStore';
import portraitImg from '../assets/images/akshita_portrait_1787143112510.jpg';
import l3Banner from '../assets/images/project_l3_banner_1787143130841.jpg';
import DitherReveal from './DitherReveal';
import { TiltCard } from './TiltCard';
import { CertificateFlipCard } from './CertificateFlipCard';
import { soundEngine } from './AudioAmbience';
import confetti from 'canvas-confetti';

export interface MovieStage {
  id: number;
  slug: string;
  label: string;
  code: string;
  tagline: string;
  originX: number;
  originY: number;
  zoomScale: number;
  ringScale: number;
  ringOpacity: number;
}

function ResearchFlipCard({ ri, index = 0 }: { key?: React.Key; ri: typeof RESEARCH_INTERESTS[0]; index?: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const delay = (index % 3) * 700;
    let interval: NodeJS.Timeout;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 3500);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [index]);

  return (
    <div
      onClick={() => {
        soundEngine.playCardHover();
        setIsFlipped(!isFlipped);
      }}
      className="cursor-pointer h-36 [perspective:1000px] group"
      title="Automatic 3D rotation active"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="relative w-full h-full [transform-style:preserve-3d] shadow-lg rounded-xl"
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] p-3.5 rounded-xl bg-black/20 border border-amber-400/40 hover:border-amber-400 flex flex-col justify-between backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-pixel-vt323 text-amber-300 font-bold uppercase tracking-wider">
              RESEARCH DOMAIN 0{index + 1}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-pixel-vt323 border border-amber-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              AUTO 3D
            </span>
          </div>
          <h4 className="text-white font-bold text-base sm:text-lg font-pixel-vt323 tracking-wide">
            {ri.title}
          </h4>
          <span className="text-[10px] font-pixel-vt323 text-amber-300/80">Continuous 3D Rotation →</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-3.5 rounded-xl bg-amber-400/20 border border-amber-300 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-pixel-vt323 text-amber-300 font-bold uppercase">
                {ri.title}
              </span>
              <span className="text-[10px] text-amber-200 font-pixel-vt323">AUTO SYNC 🔄</span>
            </div>
            <p className="text-white/90 text-xs font-pixel-vt323 leading-relaxed">
              {ri.description}
            </p>
          </div>
          <span className="text-[9px] font-pixel-vt323 text-amber-200">RESEARCH INTEREST</span>
        </div>
      </motion.div>
    </div>
  );
}

export const MOVIE_STAGES: MovieStage[] = [
  {
    id: 0,
    slug: 'prologue',
    label: 'Prologue',
    code: 'SYS_INIT // 00',
    tagline: 'Built for the curious',
    originX: 50,
    originY: 50,
    zoomScale: 1.0,
    ringScale: 1.0,
    ringOpacity: 0
  },
  {
    id: 1,
    slug: 'identity',
    label: 'Identity',
    code: 'NEO_AVATAR // 01',
    tagline: 'Exploring. Learning. Becoming.',
    originX: 50,
    originY: 52,
    zoomScale: 1.75,
    ringScale: 1.5,
    ringOpacity: 0.95
  },
  {
    id: 2,
    slug: 'chapters',
    label: 'Chapters',
    code: 'CHRONO_LOG // 02',
    tagline: 'Every Experience Adds a Perspective',
    originX: 42,
    originY: 26,
    zoomScale: 1.55,
    ringScale: 1.2,
    ringOpacity: 0.65
  },
  {
    id: 3,
    slug: 'research',
    label: 'Research',
    code: 'NEURAL_LAB // 03',
    tagline: 'Curiosity Starts the Journey',
    originX: 78,
    originY: 58,
    zoomScale: 1.65,
    ringScale: 1.15,
    ringOpacity: 0.65
  },
  {
    id: 4,
    slug: 'project-l3',
    label: 'Project L³',
    code: 'INCLUSION_CORE // 04',
    tagline: 'Love. Laughter. Life. — Universal Inclusion',
    originX: 50,
    originY: 45,
    zoomScale: 2.1,
    ringScale: 2.7,
    ringOpacity: 1.0
  },
  {
    id: 5,
    slug: 'creative',
    label: 'Creative',
    code: 'SURREAL_FLORA // 05',
    tagline: 'Where Words, Art & Emotion Meet',
    originX: 22,
    originY: 72,
    zoomScale: 1.65,
    ringScale: 1.15,
    ringOpacity: 0.65
  },
  {
    id: 6,
    slug: 'recognition',
    label: 'Credentials',
    code: 'DISTINCTIONS // 06',
    tagline: '11 Verified Credentials & Distinctions',
    originX: 82,
    originY: 28,
    zoomScale: 1.6,
    ringScale: 1.2,
    ringOpacity: 0.65
  },
  {
    id: 7,
    slug: 'connect',
    label: "Let's Connect",
    code: 'QUANTUM_BEACON // 07',
    tagline: 'Still Exploring & Collaborating',
    originX: 18,
    originY: 36,
    zoomScale: 1.55,
    ringScale: 1.2,
    ringOpacity: 0.65
  }
];

function BrandFoundationsAnimated() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const foundations = BRAND_FOUNDATIONS.slice(0, 4);
  const activeItem = foundations[activeIndex];

  const iconsMap: Record<string, React.ReactNode> = {
    '01': <Heart size={18} className="text-rose-400 animate-pulse" />,
    '02': <Compass size={18} className="text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />,
    '03': <Sparkles size={18} className="text-cyan-400 animate-pulse" />,
    '04': <ShieldCheck size={18} className="text-emerald-400" />
  };

  return (
    <div className="space-y-3 pt-1 font-pixel-vt323">
      <div className="flex items-center justify-between">
        <span className="text-amber-300 font-bold text-sm sm:text-base flex items-center gap-1.5 uppercase tracking-wider">
          <Zap size={16} className="text-amber-400 animate-bounce" />
          <span>PROJECT L³ CORE FOUNDATIONS (PURPOSE, MISSION, VISION & VALUES)</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 animate-pulse">
          AUTO TRANSITION
        </span>
      </div>

      {/* Cyber Foundation Selector Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {foundations.map((bf, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={bf.number}
              onClick={() => {
                soundEngine.playCardHover();
                setActiveIndex(idx);
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-left relative overflow-hidden ${
                isActive
                  ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-[1.02]'
                  : 'bg-black/20 text-white/80 border-white/15 hover:border-amber-400/50 hover:bg-black/30'
              }`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                isActive ? 'bg-black text-amber-300' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
              }`}>
                {bf.number}
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold block truncate">{bf.title.replace('Brand ', '')}</span>
                <span className={`text-[10px] block truncate ${isActive ? 'text-black/80' : 'text-amber-200/70'}`}>
                  {bf.statement}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Foundation Animated Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.number}
          initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="p-4 sm:p-5 rounded-xl bg-black/20 border-2 border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.2)] backdrop-blur-sm relative overflow-hidden space-y-2"
        >
          {/* Holographic Laser Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-amber-400/10 pointer-events-none" />

          <div className="flex items-center justify-between border-b border-amber-400/30 pb-2 relative z-10">
            <div className="flex items-center gap-2">
              {iconsMap[activeItem.number]}
              <span className="text-amber-300 text-lg sm:text-xl font-bold uppercase tracking-wider">
                {activeItem.number} // {activeItem.title}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider">
              {activeItem.statement}
            </span>
          </div>

          <p className="text-white text-base sm:text-lg leading-relaxed font-pixel-vt323 tracking-wide relative z-10">
            {activeItem.description}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/80 relative z-10">
            <span>AUTOMATIC HOLOGRAPHIC CYCLE (4s INTERVAL)</span>
            <span className="font-mono text-amber-300 font-bold">0{activeIndex + 1} / 04</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface CinematicMovieSceneProps {
  currentStageId: number;
  dragProgress?: number;
  onStageChange: (stageId: number) => void;
  onOpenCertificates: (certId?: string) => void;
  onOpenResume: () => void;
  onOpenConnectModal?: () => void;
  isPureVideoView: boolean;
  onTogglePureVideo: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const CinematicMovieScene: React.FC<CinematicMovieSceneProps> = ({
  currentStageId,
  dragProgress = 0,
  onStageChange,
  onOpenCertificates,
  onOpenResume,
  onOpenConnectModal,
  isPureVideoView,
  onTogglePureVideo,
  isAutoPlay,
  onToggleAutoPlay
}) => {
  // Stage internal sub-states
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeVoiceCharacter, setActiveVoiceCharacter] = useState<string | null>(null);
  const [selectedExploringTag, setSelectedExploringTag] = useState<string | null>(null);
  const [selectedCertCategory, setSelectedCertCategory] = useState<string>('All');
  const [isMaximizedStage, setIsMaximizedStage] = useState(false);
  const [fullscreenCertImage, setFullscreenCertImage] = useState<{
    url: string;
    title: string;
    issuer?: string;
    cert?: CertificateItem;
  } | null>(null);
  const [flippedCreativeCards, setFlippedCreativeCards] = useState<Record<string, boolean>>({
    fiction: false,
    poetry: false,
    voice: false
  });

  const cardScrollRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef<number>(0);

  // Smart mouse wheel scrolling inside the stage card box
  const handleCardWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = cardScrollRef.current;
    if (!container) return;

    const now = Date.now();
    const timeDelta = now - lastWheelTimeRef.current;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 12;
    const isAtTop = scrollTop <= 12;

    // Debounce scene transitions when wheeling at top/bottom boundary
    if (timeDelta > 500) {
      if (e.deltaY > 25 && isAtBottom) {
        lastWheelTimeRef.current = now;
        soundEngine.playCardHover();
        goToNextStage();
      } else if (e.deltaY < -25 && isAtTop) {
        lastWheelTimeRef.current = now;
        soundEngine.playCardHover();
        goToPrevStage();
      }
    }
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Research Collaborations',
    message: ''
  });

  const stage = MOVIE_STAGES.find((s) => s.id === currentStageId) || MOVIE_STAGES[0];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenCertImage) {
        setFullscreenCertImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenCertImage]);

  // Always scroll stage container back to top (scrollTop = 0) on stage or category change
  useEffect(() => {
    if (cardScrollRef.current) {
      cardScrollRef.current.scrollTop = 0;
    }
  }, [currentStageId, selectedCertCategory]);

  // Auto 3D card flip loop for Stage 5 Creative Expression
  useEffect(() => {
    if (currentStageId !== 5) return;
    const interval = setInterval(() => {
      setFlippedCreativeCards((prev) => ({
        fiction: !prev.fiction,
        poetry: !prev.poetry,
        voice: !prev.voice
      }));
    }, 4500);
    return () => clearInterval(interval);
  }, [currentStageId]);

  // Auto-play movie loop timer
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      onStageChange((currentStageId + 1) % MOVIE_STAGES.length);
      soundEngine.playCardHover();
    }, 7500);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentStageId, onStageChange]);

  // Keyboard navigation between stages & quick scene jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNextStage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevStage();
      } else if (e.key === 'Escape') {
        if (currentStageId !== 0) {
          goToStage(0);
        }
      } else if (e.key >= '0' && e.key <= '7') {
        goToStage(parseInt(e.key, 10));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageId]);

  const goToStage = (id: number) => {
    soundEngine.playNodeSelect();
    onStageChange(id);
  };

  const goToNextStage = () => {
    const nextId = (currentStageId + 1) % MOVIE_STAGES.length;
    goToStage(nextId);
  };

  const goToPrevStage = () => {
    const prevId = (currentStageId - 1 + MOVIE_STAGES.length) % MOVIE_STAGES.length;
    goToStage(prevId);
  };

  const handleVoiceTest = (character: string) => {
    setActiveVoiceCharacter(character);
    soundEngine.playMimicrySound(character);
    setTimeout(() => {
      setActiveVoiceCharacter(null);
    }, 1200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setContactSubmitted(true);
  };

  // Filter certificates for Stage 6 preview
  const filteredCertificates = CERTIFICATES_LIST.filter(
    (c) => selectedCertCategory === 'All' || c.category === selectedCertCategory
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden flex flex-col justify-between z-20">
      {/* 1. CYBER MATRIX OVERLAY & LASER SCAN */}
      {currentStageId > 0 && !isPureVideoView && (
        <div className="absolute inset-0 pointer-events-none z-10 animate-fadeIn">
          {/* Cyber matrix pixel mosaic backdrop */}
          <div className="absolute inset-0 pixel-mosaic-backdrop opacity-70" />
          
          {/* Cyberpunk Horizontal Scanning Laser Beam */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#fbbf24] animate-cyber-scan pointer-events-none" />

          {/* Digital Telemetry / HUD Watermark */}
          <div className="absolute top-20 right-6 font-mono text-[10px] text-amber-300/60 space-y-0.5 text-right hidden md:block drop-shadow-md">
            <p>CAM_TRACK: ACTIVE // ZOOM: {stage.zoomScale.toFixed(2)}x</p>
            <p>TARGET_COORD: [{stage.originX}%, {stage.originY}%]</p>
            <p className="text-amber-400 font-bold">{stage.code}</p>
          </div>

          {/* Golden & Violet Surreal Hologram Glow */}
          <div
            className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-400/20 via-purple-500/15 to-transparent blur-3xl transition-all duration-700 pointer-events-none"
            style={{
              left: `${stage.originX}%`,
              top: `${stage.originY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}

      {/* 2. THE NEO-FUTURISTIC PORTAL RING */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out z-15"
        style={{
          left: `${stage.originX}%`,
          top: `${stage.originY}%`,
          transform: `translate(-50%, -50%) scale(${stage.ringScale})`,
          opacity: isPureVideoView && currentStageId !== 0 ? 0.2 : stage.ringOpacity
        }}
      >
        {/* Outer Pulsing Golden Ring */}
        <div
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-amber-400/80 transition-all duration-700 relative"
          style={{
            boxShadow: currentStageId === 4
              ? '0 0 85px rgba(251, 191, 36, 0.9), inset 0 0 55px rgba(251, 191, 36, 0.5)'
              : '0 0 45px rgba(251, 191, 36, 0.5), inset 0 0 30px rgba(251, 191, 36, 0.3)'
          }}
        >
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-sm shadow-[0_0_8px_#fbbf24]" />
        </div>

        {/* Concentric Digital Halo */}
        <div
          className="absolute inset-2 rounded-full border border-dashed border-cyan-400/50 animate-spin"
          style={{ animationDuration: '28s' }}
        />
      </div>

      {/* 3. ACTIVE STAGE FLOATING TRANSLUCENT CYBER CARD — PERFECTLY CENTERED WITH SMOOTH MOTION ANIMATIONS */}
      {currentStageId > 0 && !isPureVideoView && (
        <div
          className={`fixed inset-x-2 sm:inset-x-4 top-14 sm:top-16 bottom-16 sm:bottom-20 z-30 pointer-events-none flex flex-col items-center justify-start mx-auto ${
            isMaximizedStage ? 'max-w-[98vw]' : currentStageId === 6 ? 'max-w-6xl xl:max-w-7xl' : 'max-w-4xl'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStageId}-${isMaximizedStage ? 'max' : 'norm'}`}
              initial={{ opacity: 0, scale: 0.95, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              ref={cardScrollRef}
              onWheel={handleCardWheel}
              className="scene-card-scroll modal-scroll pixel-hud-box pointer-events-auto w-full h-full max-h-full rounded-2xl p-4 sm:p-6 md:p-7 border border-amber-400/50 shadow-2xl text-white bg-black/20 backdrop-blur-xs overflow-y-auto custom-scrollbar relative overscroll-contain flex flex-col justify-start font-pixel-vt323"
            >
              {/* Neo-Futuristic Corner Brackets */}
              <span className="cyber-corner-tl" />
              <span className="cyber-corner-tr" />
              <span className="cyber-corner-bl" />
              <span className="cyber-corner-br" />

              {/* Top Stage Indicator Cyber Header */}
              <div className="flex items-center justify-between border-b border-amber-400/25 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-amber-400/25 border border-amber-400/60 text-amber-300 text-xs font-mono font-bold tracking-wider">
                    {stage.code}
                  </span>
                  <span className="text-white/80 text-xs tracking-wider uppercase font-mono">
                    {stage.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setIsMaximizedStage(!isMaximizedStage);
                    }}
                    className="px-2.5 py-1 rounded bg-black/40 hover:bg-white/20 border border-white/20 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={isMaximizedStage ? "Restore Default View" : "Maximize Full Widescreen View"}
                  >
                    {isMaximizedStage ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                    <span className="hidden sm:inline">{isMaximizedStage ? 'Compact' : 'Maximize'}</span>
                  </button>

                  <button
                    onClick={onTogglePureVideo}
                    data-cursor-hover
                    data-cursor-label="View"
                    className="px-3 py-1 rounded bg-black/30 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                    title="Hide card to view pure background video"
                  >
                    <EyeOff size={13} />
                    <span className="hidden sm:inline">Pure View</span>
                  </button>

                  <button
                    onClick={() => goToStage(0)}
                    data-cursor-hover
                    data-cursor-label="Home"
                    className="px-3 py-1 rounded bg-black/30 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer border border-white/20"
                    title="Return to Prologue"
                  >
                    [ESC]
                  </button>
                </div>
              </div>

              {/* STAGE 1: IDENTITY & MANIFESTO */}
              {currentStageId === 1 && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-xl group">
                      <DitherReveal
                        image={{ src: portraitImg }}
                        ditherStyle="bayer8"
                        dotSize={4}
                        revealRadius={110}
                        revealSoftness={45}
                        wave={true}
                        waveSpeed={65}
                        waveDensity={30}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-center sm:text-left space-y-1.5">
                      <h2 className="text-3xl sm:text-4xl text-white font-normal font-pixel-vt323 tracking-wide">
                        Akshita Dalsaniya
                      </h2>
                      <p className="text-amber-300 text-xs sm:text-sm font-mono font-medium">
                        BBA (CGPA 8.0/10) • CFA Level I Candidate • Founder, Project L³
                      </p>
                      <p className="text-white/80 text-xs leading-relaxed max-w-xl">
                        {PERSONAL_INFO.supportingText}
                      </p>
                    </div>
                  </div>

                  {/* CURRENTLY EXPLORING TAGS */}
                  <div className="p-4 rounded-xl bg-black/35 border border-amber-400/40 space-y-2.5">
                    <span className="text-[11px] uppercase tracking-widest text-amber-300 font-mono font-bold flex items-center gap-1.5">
                      <Target size={13} className="text-amber-400 animate-pulse" />
                      <span>CURRENTLY EXPLORING</span>
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {CURRENTLY_EXPLORING_TAGS.map((tag) => {
                        const isSelected = selectedExploringTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              soundEngine.playCardHover();
                              setSelectedExploringTag(isSelected ? null : tag);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-amber-300 text-black border-amber-300 font-bold scale-105 shadow-md'
                                : 'bg-black/40 border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-amber-400/50'
                            }`}
                          >
                            <span>{tag}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedExploringTag && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 font-mono flex items-center justify-between"
                      >
                        <span>Actively researching & seeking partners in: <strong className="text-white">{selectedExploringTag}</strong></span>
                        <button
                          onClick={() => {
                            setContactForm({ ...contactForm, topic: selectedExploringTag });
                            goToStage(7);
                          }}
                          className="px-2.5 py-0.5 rounded bg-amber-400 text-black font-bold text-[10px] uppercase hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                        >
                          Connect Now →
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* North Star */}
                  <div className="p-4 rounded-lg bg-black/25 border border-amber-400/40 text-center sm:text-left space-y-1 relative">
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono font-semibold block">
                      ★ NORTH_STAR_DIRECTIVE
                    </span>
                    <p
                      className="text-lg sm:text-xl text-white italic font-normal"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      &ldquo;{PERSONAL_INFO.northStar}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 2: 7 CHAPTERS OF EVOLUTION */}
              {currentStageId === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white font-normal font-pixel-vt323 tracking-wide mb-1">
                      Every Experience Adds a Perspective
                    </h3>
                    <p className="text-white/80 text-xs font-mono">
                      CHRONOLOGICAL ARCHIVE // 7 evolutionary life chapters.
                    </p>
                  </div>

                  {/* Interactive Chapter Stepper Timeline Rail */}
                  <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-amber-400/30">
                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-300 font-semibold">
                      <span>EVOLUTIONARY TIMELINE RAIL</span>
                      <span>CHAPTER 0{activeChapterIndex + 1} OF 07 • {Math.round(((activeChapterIndex + 1) / 7) * 100)}% COMPLETED</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500 shadow-[0_0_10px_#fbbf24]"
                        style={{ width: `${((activeChapterIndex + 1) / 7) * 100}%` }}
                      />
                    </div>

                    {/* Chapter Nodes */}
                    <div className="flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                      {CHAPTERS_LIST.map((chap, idx) => (
                        <button
                          key={chap.id}
                          onClick={() => {
                            soundEngine.playCardHover();
                            setActiveChapterIndex(idx);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-pixel-vt323 tracking-wide whitespace-nowrap transition-all cursor-pointer border ${
                            idx === activeChapterIndex
                              ? 'bg-amber-300 text-black border-amber-300 font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105'
                              : 'bg-black/40 border-white/20 text-white/80 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          {chap.badge}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Chapter Card with Cinematic Glitch Slide Transition */}
                  <AnimatePresence mode="wait">
                    {(() => {
                      const chap = CHAPTERS_LIST[activeChapterIndex];
                      return (
                        <motion.div
                          key={chap.id}
                          initial={{ opacity: 0, x: 50, scale: 0.97, filter: 'blur(6px)' }}
                          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, x: -50, scale: 0.97, filter: 'blur(6px)' }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="relative p-5 sm:p-6 rounded-2xl bg-black/40 border border-amber-400/40 space-y-4 shadow-2xl backdrop-blur-md overflow-hidden"
                        >
                          {/* Top Header */}
                          <div className="flex items-center justify-between text-xs font-pixel-vt323 border-b border-white/10 pb-2.5">
                            <span className="text-amber-300 text-base sm:text-lg font-bold uppercase tracking-wider">
                              {chap.badge}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-bold">
                              CHAPTER 0{chap.number} / 07
                            </span>
                          </div>

                          <h4 className="text-2xl sm:text-3xl text-white font-pixel-vt323 tracking-wide">
                            {chap.title}
                          </h4>
                          <p className="text-amber-200/90 text-sm italic font-pixel-vt323">{chap.subtitle}</p>

                          <div className="space-y-2.5 text-white/90 text-sm sm:text-base font-pixel-vt323 leading-relaxed tracking-wide">
                            {chap.story.map((p, i) => (
                              <p key={i} className="flex items-start gap-2">
                                <span className="text-amber-400 font-pixel-vt323 select-none">▸</span>
                                <span>{p}</span>
                              </p>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-white/15 flex items-start gap-2 text-sm font-pixel-vt323">
                            <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                            <p className="text-amber-200 italic">
                              &ldquo;{chap.takeaway}&rdquo;
                            </p>
                          </div>

                          {/* Quick Chapter Next/Prev Stepper Controls */}
                          <div className="pt-3 flex items-center justify-between text-xs font-pixel-vt323 border-t border-white/10">
                            <button
                              disabled={activeChapterIndex === 0}
                              onClick={() => {
                                soundEngine.playClick();
                                setActiveChapterIndex((prev) => Math.max(0, prev - 1));
                              }}
                              className="px-3 py-1 rounded bg-black/50 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white border border-white/20 transition-all cursor-pointer font-pixel-vt323 text-sm"
                            >
                              ← PREVIOUS CHAPTER
                            </button>

                            <button
                              disabled={activeChapterIndex === CHAPTERS_LIST.length - 1}
                              onClick={() => {
                                soundEngine.playClick();
                                setActiveChapterIndex((prev) => Math.min(CHAPTERS_LIST.length - 1, prev + 1));
                              }}
                              className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-bold border border-amber-400 transition-all cursor-pointer font-pixel-vt323 text-sm shadow-md"
                            >
                              NEXT CHAPTER →
                            </button>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              )}

              {/* STAGE 3: RESEARCH LABORATORY & EXPLORATIONS */}
              {currentStageId === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white font-normal font-pixel-vt323 tracking-wide mb-1">
                      Curiosity Starts the Journey. Research Gives Direction.
                    </h3>
                    <p className="text-white/80 text-xs font-pixel-vt323">
                      NEURAL_RESEARCH // Evidence-based solutions & sustainable policy.
                    </p>
                  </div>

                  {/* 1. International Research Internship — Timeline Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-400/50 space-y-4 shadow-xl backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-pixel-vt323 font-bold text-xs border border-amber-400/40 uppercase tracking-wider">
                          🌍 INTERNATIONAL RESEARCH INTERNSHIP
                        </span>
                        <h4 className="text-2xl sm:text-3xl text-white font-pixel-vt323 tracking-wide mt-1">
                          Sustainable Development in the Industrial Sector
                        </h4>
                        <p className="text-amber-200/90 text-xs font-pixel-vt323">
                          Hanoi University of Mining and Geology (HUMG), Vietnam • Score 3.7 / 4.0
                        </p>
                      </div>
                      <span className="text-white/60 text-xs font-pixel-vt323 shrink-0 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 self-start sm:self-auto">
                        Aug 30 – Sep 29, 2025
                      </span>
                    </div>

                    {/* Timeline Events Vertical Track */}
                    <div className="relative pl-6 space-y-4 border-l-2 border-amber-400/40 ml-2 pt-1">
                      {/* Milestone 1 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-black ring-4 ring-amber-400/20" />
                        <h5 className="text-base font-bold text-amber-300 font-pixel-vt323 tracking-wide mb-1">
                          01 // Cross-Cultural Immersion & Global Context
                        </h5>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-pixel-vt323">
                          My first international research experience took me to Vietnam, where I worked on research related to sustainable industrial development. Beyond the academic aspect, the experience became an opportunity to immerse myself in a new culture, collaborate with people from different backgrounds, and understand how local contexts shape global challenges.
                        </p>
                      </div>

                      {/* Milestone 2 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-black ring-4 ring-amber-400/20" />
                        <h5 className="text-base font-bold text-amber-300 font-pixel-vt323 tracking-wide mb-1">
                          02 // Coordination, Collaboration & Local Language
                        </h5>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-pixel-vt323">
                          During the internship, I also served as a coordinator, contributed to collaborative activities, learned basic Vietnamese to better connect with the local community, and actively participated in discussions beyond the classroom. These experiences strengthened my belief that meaningful research begins by understanding people before attempting to solve their problems.
                        </p>
                      </div>

                      {/* Milestone 3 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-black ring-4 ring-amber-400/20" />
                        <h5 className="text-base font-bold text-amber-300 font-pixel-vt323 tracking-wide mb-1">
                          03 // NGO Conversations & Community-Centered Research
                        </h5>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-pixel-vt323">
                          While in Vietnam, I also had the opportunity to connect with local NGOs and institutions for potential volunteering and coordination work. Although I was unable to participate due to time and travel constraints, those conversations further reinforced my interest in community-centered research and social impact.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Ocean Philosophy Quote */}
                  <blockquote className="p-3.5 rounded-xl bg-amber-400/10 border-l-4 border-amber-400 text-white italic text-base sm:text-lg font-pixel-vt323 shadow-md">
                    &ldquo;Research is like an ocean. The deeper we are willing to explore, the more valuable discoveries we uncover.&rdquo;
                  </blockquote>

                  {/* 3. 6 Research Interests as 6 Interactive Flip Cards */}
                  <div className="space-y-2">
                    <span className="text-xs font-pixel-vt323 uppercase tracking-wider text-amber-300 font-semibold block text-base">
                      🔬 6 CORE RESEARCH INTEREST DOMAINS (AUTOMATIC 3D ROTATION)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {RESEARCH_INTERESTS.map((ri, idx) => (
                        <ResearchFlipCard key={ri.id} ri={ri} index={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: PROJECT L³ */}
              {currentStageId === 4 && (
                <div className="space-y-5 relative">
                  {/* Holographic Glowing Energy Particles Ambient Overlay */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-xl pointer-events-none rounded-2xl animate-pulse" />

                  <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/60 h-36 sm:h-44 group shadow-[0_0_25px_rgba(251,191,36,0.25)]">
                    <DitherReveal
                      image={{ src: l3Banner }}
                      ditherStyle="noise"
                      dotSize={5}
                      revealRadius={140}
                      revealSoftness={50}
                      wave={true}
                      waveSpeed={75}
                      waveDensity={20}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end pointer-events-none z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-pixel-vt323 font-bold text-xs uppercase animate-pulse">
                          ⚡ INCLUSION INITIATIVE
                        </span>
                        <span className="text-amber-300 text-xs font-pixel-vt323 font-semibold tracking-wider uppercase">
                          PROJECT_L3 // HOLOGRAPHIC_INITIATIVE
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl text-white font-pixel-vt323 tracking-wide drop-shadow-md">
                        Project L³ — Love. Laughter. Life.
                      </h3>
                    </div>

                    {/* Animated Holographic Scanline Laser Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent h-10 w-full animate-scanline pointer-events-none" />
                  </div>

                  {/* Brand Foundations Animated Transition Showcase (Purpose, Mission, Vision & Values) */}
                  <BrandFoundationsAnimated />

                  {/* 5-Phase Execution Roadmap with Animated Transition Rail */}
                  <div className="space-y-3 pt-2 font-pixel-vt323">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-bold text-base flex items-center gap-1.5 uppercase tracking-wider">
                        <Compass size={16} className="text-amber-400" />
                        <span>5-Phase Strategic Execution Roadmap</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/40 text-xs font-bold">
                        PHASE 0{activePhaseIndex + 1} OF 05 • {Math.round(((activePhaseIndex + 1) / 5) * 100)}% EXECUTED
                      </span>
                    </div>

                    {/* Animated Phase Track / Energy Beam */}
                    <div className="relative p-3 rounded-xl bg-black/60 border border-amber-400/30 overflow-hidden space-y-3">
                      <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden my-1">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 transition-all duration-500 shadow-[0_0_12px_#fbbf24]"
                          style={{ width: `${((activePhaseIndex + 1) / 5) * 100}%` }}
                        />
                      </div>

                      {/* Phase Node Buttons Rail */}
                      <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
                        {PROJECT_L3_STAGES.map((stg, idx) => {
                          const isActive = idx === activePhaseIndex;
                          const isPassed = idx < activePhaseIndex;
                          return (
                            <button
                              key={stg.phaseNumber}
                              onClick={() => {
                                soundEngine.playCardHover();
                                setActivePhaseIndex(idx);
                              }}
                              className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer flex flex-col items-center gap-1 group ${
                                isActive
                                  ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-105'
                                  : isPassed
                                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30'
                                  : 'bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-pixel-vt323 text-xs ${
                                isActive ? 'bg-black text-amber-300 font-bold' : isPassed ? 'bg-amber-400/30 text-amber-200' : 'bg-white/10 text-white/60'
                              }`}>
                                {stg.phaseNumber}
                              </span>
                              <span className="font-pixel-vt323 text-[11px] sm:text-xs truncate max-w-full hidden sm:block">
                                {stg.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Phase Animated Card with Motion Transition */}
                      <AnimatePresence mode="wait">
                        {(() => {
                          const currentPhase = PROJECT_L3_STAGES[activePhaseIndex];
                          const milestonesMap: Record<number, string[]> = {
                            0: ['Inclusive Framework Definition', 'Needs Mapping & Lived Experience Interviews', 'Baseline Empirical Literature Analysis'],
                            1: ['Cross-Sector Stakeholder Panels', 'Community Workshops & Listening Sessions', 'Institutional Partner Alignment'],
                            2: ['Universal Design Prototyping', 'Accessibility Audit Standards', 'Pilot Testing in Community Environments'],
                            3: ['Program Launch & Field Deployment', 'Impact Metric Tracking & Analysis', 'Scale & Policy Recommendation Briefs'],
                            4: ['Sustainable Ecosystem Continuity', 'Global Knowledge Sharing', 'Universal Policy Integration']
                          };
                          const deliverables = milestonesMap[activePhaseIndex] || ['Phase Planning', 'Milestone Execution'];

                          return (
                            <motion.div
                              key={currentPhase.phaseNumber}
                              initial={{ opacity: 0, x: 30, scale: 0.97, filter: 'blur(6px)' }}
                              animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, x: -30, scale: 0.97, filter: 'blur(6px)' }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              className="p-4 rounded-xl bg-slate-950/80 border border-amber-400/50 space-y-3 shadow-xl relative"
                            >
                              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded bg-amber-400 text-black font-pixel-vt323 font-bold text-sm uppercase">
                                    PHASE {currentPhase.phaseNumber}
                                  </span>
                                  <h4 className="text-xl sm:text-2xl text-white font-pixel-vt323 font-bold tracking-wide">
                                    {currentPhase.title}
                                  </h4>
                                </div>
                                <span className="text-xs font-pixel-vt323 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1">
                                  <CheckCircle2 size={12} />
                                  <span>MILESTONE ACTIVE</span>
                                </span>
                              </div>

                              <p className="text-white/90 text-sm sm:text-base font-pixel-vt323 leading-relaxed tracking-wide">
                                {currentPhase.desc}
                              </p>

                              <div className="space-y-1.5 pt-1">
                                <span className="text-amber-300 font-pixel-vt323 text-sm font-bold block uppercase">
                                  ⚙️ KEY DELIVERABLES & OBJECTIVES:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {deliverables.map((item, i) => (
                                    <div key={i} className="p-2 rounded bg-black/40 border border-white/10 text-xs font-pixel-vt323 text-white/90 flex items-start gap-1.5">
                                      <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Stepper Navigation */}
                              <div className="pt-2 flex items-center justify-between text-xs font-pixel-vt323 border-t border-white/10">
                                <button
                                  disabled={activePhaseIndex === 0}
                                  onClick={() => {
                                    soundEngine.playClick();
                                    setActivePhaseIndex((prev) => Math.max(0, prev - 1));
                                  }}
                                  className="px-3 py-1 rounded bg-black/50 hover:bg-white/20 disabled:opacity-30 text-white border border-white/20 transition-all cursor-pointer font-pixel-vt323 text-sm"
                                >
                                  ← PREV PHASE
                                </button>

                                <span className="text-amber-200/80 font-pixel-vt323 text-sm hidden sm:inline">
                                  STAGE {activePhaseIndex + 1} / 5
                                </span>

                                <button
                                  disabled={activePhaseIndex === PROJECT_L3_STAGES.length - 1}
                                  onClick={() => {
                                    soundEngine.playClick();
                                    setActivePhaseIndex((prev) => Math.min(PROJECT_L3_STAGES.length - 1, prev + 1));
                                  }}
                                  className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-bold border border-amber-400 transition-all cursor-pointer font-pixel-vt323 text-sm shadow-md"
                                >
                                  NEXT PHASE →
                                </button>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: CREATIVE EXPRESSION WITH 3D FLIP CARDS & PIXEL TYPOGRAPHY */}
              {currentStageId === 5 && (
                <div className="space-y-5 font-pixel-vt323">
                  <div>
                    <h3 className="text-3xl sm:text-4xl text-white font-normal font-pixel-vt323 tracking-wide mb-1">
                      Where Words, Art & Emotion Meet
                    </h3>
                    <p className="text-amber-200 text-base sm:text-lg font-pixel-vt323 tracking-wide italic">
                      &ldquo;{CREATIVE_EXPRESSION_DATA.closingArtQuote}&rdquo;
                    </p>
                  </div>

                  {/* 3D Flip Creative Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {/* 1. Fiction / Novel Card */}
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl group/flip [perspective:1000px]">
                      <div
                        className="w-full h-full transition-transform duration-700 relative rounded-2xl"
                        style={{
                          transform: flippedCreativeCards['fiction'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-gradient-to-br from-amber-950/60 via-black to-slate-950 border border-amber-400/50 shadow-2xl flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="text-amber-300 font-pixel-vt323 text-base font-bold flex items-center gap-1">
                                <BookOpen size={16} className="text-amber-400" />
                                <span>01 // DEBUT NOVEL</span>
                              </span>
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-200 text-[11px] font-pixel-vt323 font-bold">
                                IN_PROGRESS
                              </span>
                            </div>
                            <h4 className="text-2xl text-white font-pixel-vt323 font-bold tracking-wide">
                              {CREATIVE_EXPRESSION_DATA.debutNovel.title}
                            </h4>
                            <p className="text-white/80 text-sm font-pixel-vt323 leading-relaxed line-clamp-4">
                              {CREATIVE_EXPRESSION_DATA.debutNovel.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs font-pixel-vt323 text-amber-200/80">AUTOMATIC 3D FLIP SYNC</span>
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playCardHover();
                                setFlippedCreativeCards((prev) => ({ ...prev, fiction: !prev.fiction }));
                              }}
                              className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
                            >
                              <RotateCw size={12} />
                              <span>FLIP 3D ↻</span>
                            </button>
                          </div>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-black/80 backdrop-blur-md border border-amber-400/60 shadow-2xl flex flex-col justify-between"
                          style={{
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="space-y-2">
                            <span className="text-amber-300 font-pixel-vt323 text-base font-bold block border-b border-white/10 pb-1 uppercase">
                              📖 NOVEL INSIGHTS & THEMES
                            </span>
                            <p className="text-amber-200/90 font-pixel-vt323 text-sm italic">
                              &ldquo;Storytelling is another way of exploring life—one emotion, one conversation at a time.&rdquo;
                            </p>
                            <div className="space-y-1 text-xs font-pixel-vt323 text-white/90">
                              <p>• <strong className="text-amber-300">Core Themes:</strong> Human resilience, memory, choices, quiet courage.</p>
                              <p>• <strong className="text-amber-300">Goal:</strong> Crafting characters readers recognize in themselves.</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playCardHover();
                              setFlippedCreativeCards((prev) => ({ ...prev, fiction: !prev.fiction }));
                            }}
                            className="px-3 py-1 rounded bg-black/60 hover:bg-white/20 text-white font-pixel-vt323 font-bold text-xs border border-white/20 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <RotateCw size={12} />
                            <span>FLIP BACK ↻</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 2. Poetry Card */}
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl group/flip [perspective:1000px]">
                      <div
                        className="w-full h-full transition-transform duration-700 relative rounded-2xl"
                        style={{
                          transform: flippedCreativeCards['poetry'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-gradient-to-br from-indigo-950/60 via-black to-slate-950 border border-amber-400/50 shadow-2xl flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="text-amber-300 font-pixel-vt323 text-base font-bold flex items-center gap-1">
                                <Palette size={16} className="text-amber-400" />
                                <span>02 // POETRY & REFLECTIONS</span>
                              </span>
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-200 text-[11px] font-pixel-vt323 font-bold">
                                VERSES
                              </span>
                            </div>
                            <h4 className="text-2xl text-white font-pixel-vt323 font-bold tracking-wide">
                              Between Words & Silence
                            </h4>
                            <p className="text-white/80 text-sm font-pixel-vt323 leading-relaxed line-clamp-4">
                              {CREATIVE_EXPRESSION_DATA.poetry.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs font-pixel-vt323 text-amber-200/80">AUTOMATIC 3D FLIP SYNC</span>
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playCardHover();
                                setFlippedCreativeCards((prev) => ({ ...prev, poetry: !prev.poetry }));
                              }}
                              className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
                            >
                              <RotateCw size={12} />
                              <span>FLIP 3D ↻</span>
                            </button>
                          </div>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-black/80 backdrop-blur-md border border-amber-400/60 shadow-2xl flex flex-col justify-between"
                          style={{
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="space-y-2">
                            <span className="text-amber-300 font-pixel-vt323 text-base font-bold block border-b border-white/10 pb-1 uppercase">
                              ✒️ POETIC PHILOSOPHY
                            </span>
                            <blockquote className="text-amber-200/90 font-pixel-vt323 text-sm italic border-l-2 border-amber-400 pl-2">
                              &ldquo;Silence is not the absence of sound, but the presence of deep listening.&rdquo;
                            </blockquote>
                            <p className="text-sm font-pixel-vt323 text-white/90 leading-relaxed">
                              Poetry captures the subtle emotions that data and prose cannot express alone.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playCardHover();
                              setFlippedCreativeCards((prev) => ({ ...prev, poetry: !prev.poetry }));
                            }}
                            className="px-3 py-1 rounded bg-black/60 hover:bg-white/20 text-white font-pixel-vt323 font-bold text-xs border border-white/20 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <RotateCw size={12} />
                            <span>FLIP BACK ↻</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3. Voice Arts Card */}
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl group/flip [perspective:1000px]">
                      <div
                        className="w-full h-full transition-transform duration-700 relative rounded-2xl"
                        style={{
                          transform: flippedCreativeCards['voice'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-gradient-to-br from-rose-950/60 via-black to-slate-950 border border-amber-400/50 shadow-2xl flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="text-amber-300 font-pixel-vt323 text-base font-bold flex items-center gap-1">
                                <Volume2 size={16} className="text-amber-400" />
                                <span>03 // VOICE MIMICRY LAB</span>
                              </span>
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-200 text-[11px] font-pixel-vt323 font-bold">
                                15+ VOICES
                              </span>
                            </div>
                            <h4 className="text-2xl text-white font-pixel-vt323 font-bold tracking-wide">
                              Playful Cartoon Mimicry
                            </h4>
                            <p className="text-white/80 text-sm font-pixel-vt323 leading-relaxed line-clamp-4">
                              {CREATIVE_EXPRESSION_DATA.playfulSide.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs font-pixel-vt323 text-amber-200/80">AUTOMATIC 3D FLIP SYNC</span>
                            <button
                              type="button"
                              onClick={() => {
                                soundEngine.playCardHover();
                                setFlippedCreativeCards((prev) => ({ ...prev, voice: !prev.voice }));
                              }}
                              className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
                            >
                              <RotateCw size={12} />
                              <span>FLIP 3D ↻</span>
                            </button>
                          </div>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-black/80 backdrop-blur-md border border-amber-400/60 shadow-2xl flex flex-col justify-between"
                          style={{
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="space-y-2">
                            <span className="text-amber-300 font-pixel-vt323 text-base font-bold block border-b border-white/10 pb-1 uppercase">
                              🎙️ CARTOON ROSTER MIMICRY
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {['Donald Duck', 'Mickey Mouse', 'Shin-chan', 'Anime Vocals', 'SpongeBob', 'Goofy'].map((v) => (
                                <span key={v} className="px-2 py-0.5 rounded bg-black/60 border border-amber-400/30 text-amber-300 text-xs font-pixel-vt323">
                                  {v}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm font-pixel-vt323 text-white/80 leading-relaxed">
                              Vocal modulation and playful character storytelling bring joy to audiences and remind us never to lose our childhood wonder.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playCardHover();
                              setFlippedCreativeCards((prev) => ({ ...prev, voice: !prev.voice }));
                            }}
                            className="px-3 py-1 rounded bg-black/60 hover:bg-white/20 text-white font-pixel-vt323 font-bold text-xs border border-white/20 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <RotateCw size={12} />
                            <span>FLIP BACK ↻</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: VERIFIED CREDENTIALS GALLERY WITH TAP-FLIP */}
              {currentStageId === 6 && (
                <div className="space-y-5 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl text-white font-normal font-pixel-vt323 tracking-wide">
                        Official Credentials & Distinctions
                      </h3>
                      <p className="text-white/80 text-xs font-mono mt-0.5">
                        CREDENTIALS_REPOSITORY // Verified Official Credentials & Distinctions.
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenCertificates()}
                      data-cursor-hover
                      data-cursor-label="Coverflow"
                      className="px-4 py-2 rounded-full bg-amber-300 hover:bg-white text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer shrink-0 flex items-center gap-1.5 self-start sm:self-auto hover:scale-105"
                    >
                      <span>3D Coverflow View</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Verified Credentials Interactive Gallery Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono text-amber-300 font-semibold flex items-center gap-2">
                        <Award size={14} className="text-amber-400" />
                        <span>VERIFIED CREDENTIALS ARCHIVE (TAP CARDS TO FLIP)</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">100% VERIFIED LEDGER</span>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['All', 'Creative & Arts', 'Research', 'Disability & Inclusion', 'Finance', 'Academic & Leadership'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            soundEngine.playCardHover();
                            setSelectedCertCategory(cat);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                            selectedCertCategory === cat
                              ? 'bg-amber-300 text-black font-bold'
                              : 'bg-black/40 text-white/70 hover:text-white border border-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Clean Certificate Grid with 1-Click High-Res Inspection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch pt-1 font-pixel-vt323">
                      {filteredCertificates.map((cert) => (
                        <div key={cert.id} className="w-full flex flex-col">
                          <CertificateFlipCard
                            cert={cert}
                            isCompact={true}
                            onInspect={(c) => {
                              soundEngine.playClick();
                              const customMap = getStoredCustomCertificates();
                              const activeUrl = customMap[c.id] || c.imageUrl || '';
                              setFullscreenCertImage({
                                url: activeUrl,
                                title: c.title,
                                issuer: c.issuer,
                                cert: c
                              });
                            }}
                            allowEdit={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 7: LET'S CONNECT & COLLABORATION MATRIX */}
              {currentStageId === 7 && (
                <div className="space-y-5 pb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white font-normal font-pixel-vt323 tracking-wide mb-1">
                      Let's Connect & Collaborate
                    </h3>
                    <p className="text-white/80 text-xs font-mono">
                      BEACON_NODE // Research collaborations & Project L³ exchanges.
                    </p>
                  </div>

                  {/* Open for topics fast-select */}
                  <div className="p-3.5 rounded-xl bg-black/35 border border-amber-400/30 space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 font-bold block">
                      🎯 ACTIVE DOMAINS FOR COLLABORATION:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {CONTACT_EXPLORING_ITEMS.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 text-white/90 border border-white/15"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Contact & Resume Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-black/60 border border-white/15 transition-colors text-xs group"
                    >
                      <Mail size={18} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="truncate">
                        <span className="text-[10px] text-white/60 block font-mono">EMAIL_DIRECT</span>
                        <span className="font-mono text-white/90 truncate block">{PERSONAL_INFO.email}</span>
                      </div>
                    </a>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-black/30 hover:bg-black/60 border border-white/15 transition-colors text-xs group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Globe size={18} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="truncate">
                          <span className="text-[10px] text-white/60 block font-mono">LINKEDIN_NETWORK</span>
                          <span className="text-white/90 font-mono truncate block">{PERSONAL_INFO.linkedinDisplay}</span>
                        </div>
                      </div>
                      <ExternalLink size={13} className="text-white/40 shrink-0 ml-1" />
                    </a>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/15 text-xs flex items-center gap-3">
                      <Send size={18} className="text-amber-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-white/60 block font-mono">LOCATION</span>
                        <span className="text-white/90 font-mono">{PERSONAL_INFO.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={onOpenResume}
                      className="p-3 rounded-xl bg-black/30 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download size={15} className="text-amber-300" />
                      <span>Resume (CV)</span>
                    </button>
                  </div>

                  {/* Connect With Me Modal Trigger Bar */}
                  {onOpenConnectModal && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenConnectModal}
                        data-cursor-hover
                        data-cursor-label="Connect"
                        className="w-full py-3 rounded-xl bg-amber-300 hover:bg-white text-black font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
                      >
                        <Send size={15} />
                        <span>Open Direct Message Transmission Form</span>
                      </button>
                    </div>
                  )}

                  {/* The Final Words */}
                  <div className="text-center pt-3 border-t border-white/15 space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-semibold">
                      🌌 MULTIVERSE // STILL EXPLORING
                    </span>
                    <p
                      className="text-lg text-white font-normal italic"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      &ldquo;Exploring new ideas. Learning from every experience. Becoming who I am meant to be.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Card Navigation: Prev button & Scene indicators */}
              <div className="flex items-center justify-between border-t border-amber-400/20 pt-3.5 mt-5">
                <button
                  onClick={goToPrevStage}
                  className="px-3.5 py-1.5 rounded bg-black/30 border border-white/20 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  <span>Prev Scene</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {MOVIE_STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => goToStage(s.id)}
                      aria-label={`Go to Stage ${s.id}`}
                      className={`h-1.5 rounded transition-all cursor-pointer ${
                        currentStageId === s.id
                          ? 'bg-amber-300 w-6 shadow-[0_0_8px_#fbbf24]'
                          : 'bg-white/30 hover:bg-white/60 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* 5. BOTTOM MOVIE STAGE CONTROLLER (Cyberpunk Fluid Scrubber) */}
      <div className="fixed bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-4 z-40 pointer-events-none flex justify-center">
        <div className="pixel-hud-box w-full max-w-5xl rounded-full px-3 sm:px-5 py-2 flex items-center justify-between gap-1.5 sm:gap-3 border border-amber-400/40 bg-black/80 shadow-2xl pointer-events-auto backdrop-blur-xl font-pixel-vt323">
          {/* Prev button */}
          <button
            onClick={goToPrevStage}
            aria-label="Previous scene"
            className="p-1.5 sm:p-2 rounded-full bg-black/20 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Stages list - Fully visible 00 to 07 */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5 w-full">
            {MOVIE_STAGES.map((s) => {
              const isActive = currentStageId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => goToStage(s.id)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-amber-300 text-black font-bold shadow-md scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="opacity-60 text-[9px] mr-1">0{s.id}</span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Pure video toggle & Next button */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={onTogglePureVideo}
              aria-label={isPureVideoView ? 'Show content cards' : 'Pure video view'}
              className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer border ${
                isPureVideoView
                  ? 'bg-amber-300 text-black border-amber-300 shadow-md'
                  : 'bg-black/30 border-white/20 text-white/80 hover:text-white'
              }`}
              title={isPureVideoView ? 'Show Content' : 'Hide Cards (Pure Video)'}
            >
              {isPureVideoView ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            <button
              onClick={goToNextStage}
              aria-label="Next scene"
              className="p-1.5 sm:p-2 rounded-full bg-black/20 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 6. FULLSCREEN CERTIFICATE IMAGE LIGHTBOX MODAL WITH 'BACK TO PORTFOLIO' */}
      {fullscreenCertImage && (
        <div
          onClick={() => setFullscreenCertImage(null)}
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[100] pointer-events-auto flex flex-col items-center justify-start p-2 sm:p-4 overflow-y-auto modal-scroll bg-black/90 backdrop-blur-2xl animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl my-auto max-h-[92vh] bg-slate-950 border-2 border-amber-400/60 rounded-2xl shadow-2xl overflow-hidden font-pixel-vt323 pointer-events-auto flex flex-col shrink-0"
          >
            {/* Top Header Navigation Bar with "← Back to Portfolio" */}
            <div className="shrink-0 w-full flex items-center justify-between p-3.5 px-5 border-b border-amber-400/40 bg-black/90 flex-wrap gap-2.5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setFullscreenCertImage(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-base sm:text-lg flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
                >
                  <ArrowLeft size={18} />
                  <span>← BACK TO PORTFOLIO</span>
                </button>

                <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/20">
                  <Award className="text-amber-400 w-5 h-5 shrink-0" />
                  <span className="text-xl text-white font-bold truncate max-w-xs sm:max-w-md">
                    {fullscreenCertImage.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={fullscreenCertImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/40 font-pixel-vt323 font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download Image</span>
                </a>

                <button
                  onClick={() => setFullscreenCertImage(null)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
                  aria-label="Close Lightbox"
                  title="Close and return to portfolio"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Uncropped Certificate Image Display Box */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto modal-scroll p-3 sm:p-5 bg-black/95 flex flex-col items-center justify-start space-y-4">
              <img
                src={fullscreenCertImage.url}
                alt={fullscreenCertImage.title}
                className="max-h-[48vh] sm:max-h-[52vh] w-auto max-w-full object-contain rounded-xl shadow-[0_0_40px_rgba(251,191,36,0.25)] border border-amber-400/40 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=85';
                }}
              />

              {/* Certificate Audit Info Strip */}
              <div className="w-full max-w-3xl p-3 bg-slate-900/90 rounded-xl border border-amber-400/30 flex flex-wrap items-center justify-between text-base text-white/90 gap-2">
                <div>
                  <span className="text-amber-300 font-bold block text-lg">{fullscreenCertImage.title}</span>
                  {fullscreenCertImage.issuer && (
                    <span className="text-white/80 text-sm block">Issued by {fullscreenCertImage.issuer}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>VERIFIED CREDENTIAL LEDGER</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Bar with Second "Back to Portfolio" Action */}
            <div className="shrink-0 w-full p-3 px-5 border-t border-amber-400/30 bg-black/90 flex items-center justify-between">
              <span className="text-sm text-amber-200/80 font-pixel-vt323">
                PRESS ESC OR CLICK 'BACK TO PORTFOLIO' TO RETURN
              </span>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setFullscreenCertImage(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-base flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
              >
                <ArrowLeft size={16} />
                <span>← BACK TO PORTFOLIO</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
