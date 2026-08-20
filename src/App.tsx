import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight, Award, FileText } from 'lucide-react';
import { FullPortfolioDrawer } from './components/FullPortfolioDrawer';
import { CertificatesGalleryModal } from './components/CertificatesGalleryModal';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { ConnectModal } from './components/ConnectModal';
import { CinematicMovieScene, MOVIE_STAGES } from './components/CinematicMovieScene';
import { soundEngine } from './components/AudioAmbience';
import { InteractiveCursor } from './components/InteractiveCursor';
import { ParallaxLayer } from './components/ParallaxLayer';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  // Cinematic Movie Stage state (0 to 7)
  const [currentStageId, setCurrentStageId] = useState<number>(0);
  const [isPureVideoView, setIsPureVideoView] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Continuous Scrubbing & Fluid Drag State
  const [dragProgress, setDragProgress] = useState<number>(0); // 0.0 to 7.0 continuous float
  const [isInteracting, setIsInteracting] = useState(false);

  // Smooth lerped camera coordinates for movie-like fluid glide
  const [cameraState, setCameraState] = useState({
    x: MOVIE_STAGES[0].originX,
    y: MOVIE_STAGES[0].originY,
    zoom: MOVIE_STAGES[0].zoomScale
  });

  // Modals & Drawers state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerInitialTab, setDrawerInitialTab] = useState<
    'about' | 'manifesto' | 'chapters' | 'research' | 'project-l3' | 'creative' | 'recognition' | 'contact' | 'certificates'
  >('about');
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  // Custom JavaScript fade system with requestAnimationFrame
  const fadeTo = (targetOpacity: number, duration: number = 500, onComplete?: () => void) => {
    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(step);
  };

  const handleLoadedData = () => {
    fadeTo(1, 600);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      fadeTo(0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = '0';

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        fadingOutRef.current = false;
        videoRef.current.play().catch(() => {});
        fadeTo(1, 600);
      }
    }, 100);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    if (video.readyState >= 2) {
      fadeTo(1, 600);
    }

    return () => {
      if (fadeAnimRef.current !== null) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
    };
  }, []);

  // Smooth lerp camera interpolation loop (60FPS movie glide)
  useEffect(() => {
    let animFrame: number;

    const lerpCamera = () => {
      const floorIdx = Math.floor(dragProgress);
      const ceilIdx = Math.min(floorIdx + 1, MOVIE_STAGES.length - 1);
      const fraction = dragProgress - floorIdx;

      const stageA = MOVIE_STAGES[floorIdx] || MOVIE_STAGES[0];
      const stageB = MOVIE_STAGES[ceilIdx] || stageA;

      const targetX = stageA.originX + (stageB.originX - stageA.originX) * fraction;
      const targetY = stageA.originY + (stageB.originY - stageA.originY) * fraction;
      const targetZoom = stageA.zoomScale + (stageB.zoomScale - stageA.zoomScale) * fraction + (isInteracting ? 0.06 : 0);

      setCameraState((prev) => {
        const ease = 0.12;
        const newX = prev.x + (targetX - prev.x) * ease;
        const newY = prev.y + (targetY - prev.y) * ease;
        const newZoom = prev.zoom + (targetZoom - prev.zoom) * ease;
        return { x: newX, y: newY, zoom: newZoom };
      });

      animFrame = requestAnimationFrame(lerpCamera);
    };

    animFrame = requestAnimationFrame(lerpCamera);
    return () => cancelAnimationFrame(animFrame);
  }, [dragProgress, isInteracting]);

  // Sync dragProgress with stage changes
  const handleStageSelect = (stageId: number) => {
    soundEngine.playNodeSelect();
    setCurrentStageId(stageId);
    setDragProgress(stageId);
    if (isPureVideoView) {
      setIsPureVideoView(false);
    }
  };

  const handleToggleAutoPlay = () => {
    soundEngine.playCardHover();
    setIsAutoPlay(!isAutoPlay);
    if (!isAutoPlay && currentStageId === 0) {
      handleStageSelect(1);
    }
  };

  // Wheel / Trackpad smooth scrubbing through all stages
  const wheelTimeout = useRef<number | null>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.scene-card-scroll') ||
      target.closest('.modal-scroll') ||
      target.closest('.pixel-hud-box') ||
      target.closest('.overflow-y-auto') ||
      target.closest('.overflow-auto') ||
      target.closest('textarea') ||
      target.closest('input') ||
      target.closest('select')
    ) {
      return;
    }

    e.preventDefault();
    setIsInteracting(true);
    
    const sensitivity = 0.0022;
    const delta = e.deltaY * sensitivity;

    setDragProgress((prev) => {
      const next = Math.max(0, Math.min(prev + delta, 7.0));
      const targetId = Math.round(next);
      if (targetId !== currentStageId) {
        soundEngine.playCardHover();
        setCurrentStageId(targetId);
      }
      return next;
    });

    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    wheelTimeout.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 180);
  }, [currentStageId]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Mouse / Touch Drag Scrubbing on Background Canvas
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startProgress = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('.pixel-hud-box') ||
      target.closest('.modal-scroll')
    ) {
      return;
    }

    isDragging.current = true;
    startY.current = e.clientY;
    startProgress.current = dragProgress;
    setIsInteracting(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = (startY.current - e.clientY) * 0.005;
    const next = Math.max(0, Math.min(startProgress.current + deltaY, 7.0));
    setDragProgress(next);

    const targetId = Math.round(next);
    if (targetId !== currentStageId) {
      soundEngine.playCardHover();
      setCurrentStageId(targetId);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsInteracting(false);
  };

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      soundEngine.playChime(600, 0.2);
    }
  };

  const openCertificatesModal = (certId?: string) => {
    soundEngine.playNodeSelect();
    if (certId) {
      setSelectedCertId(certId);
    } else {
      setSelectedCertId(null);
    }
    setIsCertificatesOpen(true);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative min-h-screen bg-[#07090e] overflow-hidden flex flex-col justify-between select-none cursor-grab active:cursor-grabbing touch-none"
    >
        {/* Interactive Precision Trailing Cursor */}
        <InteractiveCursor />

        {/* 2. Master Cinematic Background Video with Continuous Fluid Camera Glide */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{
            transformOrigin: `${cameraState.x}% ${cameraState.y}%`,
            transform: `scale(${cameraState.zoom})`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onLoadedData={handleLoadedData}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="w-full h-full object-cover object-center"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          />
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>

        {/* 3. Top Navigation Bar */}
        <header className="relative z-40 px-4 sm:px-6 pt-4 sm:pt-5">
          <nav className="liquid-glass rounded-full px-4 sm:px-6 py-2 flex items-center justify-between max-w-5xl mx-auto border border-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40">
            {/* Status Indicator + Quick Scene Jump Links */}
            <div className="flex items-center gap-2.5 sm:gap-5 text-xs sm:text-sm">
              <div
                data-cursor-hover
                data-cursor-label="Scene"
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-amber-400/40 text-amber-300 text-[11px] font-mono shrink-0 transition-transform duration-200 hover:scale-105"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="hidden sm:inline">SCENE</span>
                <span>0{currentStageId}</span>
              </div>

              <button
                onClick={() => handleStageSelect(0)}
                data-cursor-hover
                data-cursor-label="Prologue"
                className={`transition-all duration-200 cursor-pointer text-xs sm:text-sm hover:scale-105 ${
                  currentStageId === 0 ? 'text-amber-300 font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Prologue
              </button>

              <button
                onClick={() => handleStageSelect(1)}
                data-cursor-hover
                data-cursor-label="Identity"
                className={`transition-all duration-200 cursor-pointer text-xs sm:text-sm hover:scale-105 ${
                  currentStageId === 1 ? 'text-amber-300 font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Identity
              </button>

              <button
                onClick={() => handleStageSelect(3)}
                data-cursor-hover
                data-cursor-label="Research"
                className={`transition-all duration-200 cursor-pointer text-xs sm:text-sm hover:scale-105 hidden md:inline ${
                  currentStageId === 3 ? 'text-amber-300 font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Research
              </button>

              <button
                onClick={() => handleStageSelect(4)}
                data-cursor-hover
                data-cursor-label="Project L³"
                className={`transition-all duration-200 cursor-pointer text-xs sm:text-sm hover:scale-105 hidden sm:inline ${
                  currentStageId === 4 ? 'text-amber-300 font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                Project L³
              </button>

              <button
                onClick={() => openCertificatesModal()}
                data-cursor-hover
                data-cursor-label="Credentials"
                className="text-amber-300/90 hover:text-amber-200 font-mono text-xs transition-all duration-200 cursor-pointer hover:scale-105 flex items-center gap-1 border border-amber-400/30 px-2.5 py-0.5 rounded-full bg-amber-400/10"
              >
                <Award size={12} className="text-amber-400" />
                <span>Credentials</span>
              </button>
            </div>

            {/* Right Action Zone */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Audio Ambience Toggle */}
              <button
                onClick={toggleSound}
                data-cursor-hover
                data-cursor-label="Sound"
                aria-label={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                title={isAudioMuted ? 'Sound: Muted' : 'Sound: Active'}
              >
                {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Direct Connect Action */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsConnectOpen(true);
                }}
                data-cursor-hover
                data-cursor-label="Connect"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all duration-200 cursor-pointer border border-white/20 hover:scale-105"
              >
                Let's Connect
              </button>

              {/* Resume CV View */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsResumeOpen(true);
                }}
                data-cursor-hover
                data-cursor-label="CV"
                className="px-3.5 py-1.5 rounded-full bg-amber-300 text-black text-xs font-mono font-bold transition-all duration-200 cursor-pointer hover:bg-white hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                <FileText size={12} />
                <span>Resume CV</span>
              </button>
            </div>
          </nav>
        </header>

        {/* 4. Prologue Hero Centerpiece - Balanced in the exact viewport center */}
        {currentStageId === 0 && !isPureVideoView && (
          <main className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none scene-card-enter my-auto">
            <ParallaxLayer speed={0.06} className="flex flex-col items-center">
              {/* Refined Monogram Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-amber-400/40 text-amber-200 text-xs font-mono mb-3 backdrop-blur-md transition-all duration-300 hover:border-amber-400 shadow-lg">
                <Sparkles size={13} className="text-amber-400" />
                <span>AKSHITA DALSANIYA // PORTFOLIO</span>
              </div>

              {/* Main Title */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-white mb-3 tracking-tight pointer-events-auto drop-shadow-2xl transition-transform duration-300 hover:scale-105 cursor-default font-pixel-vt323"
              >
                Built for the curious
              </h1>

              {/* Drag / Wheel Indicator */}
              <div className="flex items-center gap-2 text-white/80 text-xs font-mono tracking-wider pt-2 pointer-events-auto drop-shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>DRAG SCREEN OR USE WHEEL TO SCRUB SCENES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </ParallaxLayer>
          </main>
        )}

        {/* 5. Cinematic Movie Scene: Staged Content Controller & Fluid Zoom Flow */}
        <CinematicMovieScene
          currentStageId={currentStageId}
          dragProgress={dragProgress}
          onStageChange={handleStageSelect}
          onOpenCertificates={openCertificatesModal}
          onOpenResume={() => {
            soundEngine.playClick();
            setIsResumeOpen(true);
          }}
          onOpenConnectModal={() => {
            soundEngine.playClick();
            setIsConnectOpen(true);
          }}
          isPureVideoView={isPureVideoView}
          onTogglePureVideo={() => setIsPureVideoView(!isPureVideoView)}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={handleToggleAutoPlay}
        />

        {/* 6. Modals */}
        <FullPortfolioDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          initialTab={drawerInitialTab}
          onOpenCertificatesGallery={() => openCertificatesModal()}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <CertificatesGalleryModal
          isOpen={isCertificatesOpen}
          onClose={() => {
            setIsCertificatesOpen(false);
            setSelectedCertId(null);
          }}
          initialCertId={selectedCertId}
        />

        <ResumeViewerModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <ConnectModal
          isOpen={isConnectOpen}
          onClose={() => setIsConnectOpen(false)}
          onOpenResume={() => {
            setIsConnectOpen(false);
            setIsResumeOpen(true);
          }}
        />
      </div>
  );
}
