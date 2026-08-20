import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATES_LIST, CertificateItem } from '../data/certificatesData';
import {
  X,
  Award,
  CheckCircle2,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  Grid,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Building2,
  Printer,
  Copy,
  Check,
  Eye,
  FileCheck,
  Upload,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { soundEngine } from './AudioAmbience';
import { CertificateDocumentView } from './CertificateDocumentView';
import { CertificateFlipCard } from './CertificateFlipCard';
import {
  getStoredCustomCertificates,
  saveCustomCertificateImage,
  resetCustomCertificateImage,
  compressAndSaveImageFile
} from '../utils/certificateStore';
import confetti from 'canvas-confetti';

interface CertificatesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCertId?: string | null;
}

export const CertificatesGalleryModal: React.FC<CertificatesGalleryModalProps> = ({
  isOpen,
  onClose,
  initialCertId,
}) => {
  const [viewMode, setViewMode] = useState<'coverflow' | 'grid'>('coverflow');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [inspectingCert, setInspectingCert] = useState<CertificateItem | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundEngine.playNodeSelect();
      if (initialCertId) {
        const foundIndex = CERTIFICATES_LIST.findIndex((c) => c.id === initialCertId);
        if (foundIndex !== -1) {
          setActiveIndex(foundIndex);
          setInspectingCert(CERTIFICATES_LIST[foundIndex]);
        }
      }
    }
  }, [isOpen, initialCertId]);

  if (!isOpen) return null;

  const categories = ['All', 'Disability & Inclusion', 'Research', 'Finance', 'Creative & Arts', 'Academic & Leadership'];

  const filteredCertificates = CERTIFICATES_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePrev = () => {
    soundEngine.playCardHover();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredCertificates.length - 1));
  };

  const handleNext = () => {
    soundEngine.playCardHover();
    setActiveIndex((prev) => (prev < filteredCertificates.length - 1 ? prev + 1 : 0));
  };

  const handleInspect = (cert: CertificateItem) => {
    soundEngine.playNodeSelect();
    setInspectingCert(cert);
    setIsFlipped(false);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#38bdf8'],
    });
  };

  const handleFlipCard = () => {
    soundEngine.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleCopyCode = () => {
    if (!inspectingCert) return;
    const code = inspectingCert.credentialCode || inspectingCert.id;
    navigator.clipboard.writeText(code);
    setCopiedId(true);
    soundEngine.playChime(750, 0.2);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inspectingCert) return;
    const file = e.target.files?.[0];
    if (!file) return;

    compressAndSaveImageFile(inspectingCert.id, file, () => {
      soundEngine.playChime(600, 0.3);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn font-pixel-vt323"
    >
      {/* Hidden file input for browsing gallery in inspector */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Modal Container with Crystal Glass Borders */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#0b0d14]/80 backdrop-blur-xl border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] pointer-events-auto"
      >
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white font-pixel-vt323 tracking-wide">
                  Official Verified Credentials Archive
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold">
                  100% VERIFIED
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/60">
                Tap any card to flip between front certificate image and back verification ledger • Browse from gallery anytime
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-black/60 border border-white/15 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('coverflow');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'coverflow'
                    ? 'bg-amber-300 text-black font-semibold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
                title="3D Coverflow View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Flow</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-amber-300 text-black font-semibold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Document Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="relative z-10 px-6 py-3 border-b border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-300 text-black font-bold shadow-md scale-105'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search 11 certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 font-mono"
            />
          </div>
        </div>

        {/* 3D COVERFLOW VIEW WITH TAP-FLIP CARDS */}
        {viewMode === 'coverflow' && filteredCertificates.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative min-h-[480px]">
            {/* 3D Depth Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[500px] h-[500px] rounded-full border border-amber-400/30 animate-pulse" />
              <div className="absolute w-[680px] h-[680px] rounded-full border border-sky-400/20" />
            </div>

            {/* 3D Carousel Stage */}
            <div className="relative w-full max-w-4xl h-[400px] sm:h-[430px] flex items-center justify-center perspective-[1200px]">
              {filteredCertificates.map((cert, idx) => {
                const offset = idx - activeIndex;
                const absOffset = Math.abs(offset);
                const isVisible = absOffset <= 2;

                if (!isVisible) return null;

                const translateX = offset * 220;
                const translateZ = -absOffset * 150;
                const rotateY = offset * -20;
                const opacity = 1 - absOffset * 0.35;
                const zIndex = 30 - absOffset * 10;
                const isCurrent = offset === 0;

                return (
                  <div
                    key={cert.id}
                    onClick={() => {
                      if (!isCurrent) {
                        soundEngine.playCardHover();
                        setActiveIndex(idx);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                      opacity,
                      zIndex,
                      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease',
                      transformStyle: 'preserve-3d',
                    }}
                    className={`absolute w-[320px] sm:w-[380px] h-[360px] sm:h-[390px] rounded-2xl select-none shadow-2xl transition-all duration-300 ${
                      isCurrent
                        ? 'ring-2 ring-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.4)] scale-105'
                        : 'hover:opacity-90'
                    }`}
                  >
                    <CertificateFlipCard
                      cert={cert}
                      isCompact={true}
                      onInspect={handleInspect}
                      allowEdit={true}
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls & Tap Indicator */}
            <div className="flex items-center justify-between w-full max-w-md mt-4 z-40">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous Certificate"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-amber-300 font-bold">
                  {activeIndex + 1} / {filteredCertificates.length}
                </span>
                <span className="text-[11px] font-mono text-amber-200/80 flex items-center gap-1">
                  <RotateCw size={10} className="animate-spin-slow" />
                  <span>Tap card to flip front/back</span>
                </span>
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
                aria-label="Next Certificate"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* AUTHENTIC DOCUMENT GRID VIEW WITH FLIP CARDS */}
        {viewMode === 'grid' && (
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 modal-scroll">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="w-full">
                <CertificateFlipCard
                  cert={cert}
                  isCompact={true}
                  onInspect={handleInspect}
                  allowEdit={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-white/50">
            <Award className="w-12 h-12 text-white/20 mb-3" />
            <p className="text-sm font-mono text-white/70">No certificates match your query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-3 text-xs font-mono text-amber-300 underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* FULL DOCUMENT INSPECTOR LIGHTBOX */}
      {inspectingCert && (
        <div
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
        >
          <div className="relative w-full max-w-4xl flex flex-col items-center max-h-[94vh]">
            {/* Top Inspector Bar */}
            <div className="w-full flex items-center justify-between mb-3 px-2 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleFlipCard}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-all cursor-pointer shadow-md"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Show Official Certificate' : 'Tap to Flip Verification Ledger'}</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-black border border-white/20 text-white text-xs font-mono transition-all cursor-pointer"
                  title="Browse image from gallery"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Browse Gallery</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'Copied ID!' : 'Copy ID'}</span>
                </button>
              </div>

              <button
                onClick={() => setInspectingCert(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Render Container with 3D Flip */}
            <div className="w-full max-h-[82vh] overflow-y-auto modal-scroll rounded-2xl perspective-[1500px]">
              {!isFlipped ? (
                <div className="w-full animate-fadeIn">
                  <CertificateDocumentView cert={inspectingCert} isCompact={false} />
                </div>
              ) : (
                <div className="w-full rounded-2xl bg-[#0b0f19] border border-sky-400/60 p-6 sm:p-8 text-white space-y-5 shadow-2xl animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-sky-400/30 pb-3">
                    <div className="flex items-center gap-2 text-sky-300 font-mono text-sm font-bold">
                      <Building2 className="w-4 h-4" />
                      <span>METADATA & ISSUING AUTHORITY AUDIT RECORD</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/30 font-bold">
                      100% VALIDATED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white/50 block">ISSUING INSTITUTION</span>
                      <span className="text-white font-semibold text-sm">{inspectingCert.issuer}</span>
                    </div>
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white/50 block">CONFERRAL DATE</span>
                      <span className="text-white font-semibold text-sm">{inspectingCert.date}</span>
                    </div>
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white/50 block">RECIPIENT RECORD</span>
                      <span className="text-white font-semibold text-sm">{inspectingCert.recipient}</span>
                    </div>
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white/50 block">CATEGORY</span>
                      <span className="text-amber-300 font-semibold text-sm">{inspectingCert.category}</span>
                    </div>
                  </div>

                  <div className="bg-black/60 p-4 rounded-xl border border-sky-400/30 font-mono text-xs space-y-2">
                    <div className="text-sky-300 text-[11px] font-bold uppercase flex items-center justify-between">
                      <span>// Verification Record & Ledger Hash</span>
                      <span className="text-emerald-400 text-[10px]">AUTHENTIC RECORD</span>
                    </div>
                    <div className="text-[11px] text-white/60 font-mono break-all leading-relaxed">
                      ID: {inspectingCert.credentialCode || inspectingCert.id} • HASH: 8f9b2c3a7e4d0f1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Recorded in Official Academic & Professional Dossier</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
