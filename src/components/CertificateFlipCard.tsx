import React, { useState, useEffect, useRef } from 'react';
import { CertificateItem } from '../data/certificatesData';
import {
  RotateCw,
  Upload,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Calendar,
  Image as ImageIcon,
  RefreshCw,
  Maximize2,
  Eye
} from 'lucide-react';
import { soundEngine } from './AudioAmbience';
import {
  getStoredCustomCertificates,
  saveCustomCertificateImage,
  resetCustomCertificateImage,
  compressAndSaveImageFile
} from '../utils/certificateStore';
import confetti from 'canvas-confetti';

interface CertificateFlipCardProps {
  cert: CertificateItem;
  isCompact?: boolean;
  onInspect?: (cert: CertificateItem) => void;
  allowEdit?: boolean;
  className?: string;
  defaultFlipped?: boolean;
}

export const CertificateFlipCard: React.FC<CertificateFlipCardProps> = ({
  cert,
  isCompact = false,
  onInspect,
  allowEdit = true,
  className = '',
  defaultFlipped = false
}) => {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped);
  const [currentImage, setCurrentImage] = useState<string>(cert.imageUrl || '');
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync custom image from localStorage
  useEffect(() => {
    const updateImage = () => {
      const customMap = getStoredCustomCertificates();
      if (customMap[cert.id]) {
        setCurrentImage(customMap[cert.id]);
        setHasCustomImage(true);
      } else {
        setCurrentImage(cert.imageUrl || '');
        setHasCustomImage(false);
      }
    };

    updateImage();

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.certId === cert.id) {
        updateImage();
      }
    };

    window.addEventListener('certificate_images_updated', handleStorageUpdate);
    return () => window.removeEventListener('certificate_images_updated', handleStorageUpdate);
  }, [cert.id, cert.imageUrl]);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      // Don't flip if clicking interactive controls
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }
    }
    soundEngine.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = cert.credentialCode || cert.id;
    navigator.clipboard.writeText(code);
    setCopiedId(true);
    soundEngine.playChime(750, 0.2);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    compressAndSaveImageFile(cert.id, file, (dataUrl) => {
      setCurrentImage(dataUrl);
      setHasCustomImage(true);
      soundEngine.playChime(600, 0.3);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetCustomCertificateImage(cert.id);
    setCurrentImage(cert.imageUrl || '');
    setHasCustomImage(false);
    soundEngine.playClick();
  };

  return (
    <div
      className={`relative select-none perspective-[1200px] group/flip ${className}`}
      onClick={handleFlip}
      data-cursor-hover
      data-cursor-label={isFlipped ? 'Tap to View Front' : 'Tap to Flip Ledger'}
    >
      {/* Hidden file input for browsing device gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 3D Flipping Card Container */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out transform-style-3d cursor-pointer"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* ================= FRONT SIDE (Authentic Certificate Preview & Visual) ================= */}
        <div
          className={`w-full h-full rounded-2xl bg-black/50 backdrop-blur-md border border-amber-400/30 overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-5 backface-hidden transition-all duration-300 group-hover/flip:border-amber-400/70 group-hover/flip:shadow-[0_0_30px_rgba(251,191,36,0.25)] ${
            isCompact ? 'min-h-[380px]' : 'min-h-[440px]'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
            <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-pixel-vt323 font-semibold uppercase tracking-wider truncate">
              {cert.category}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Tap to Flip Button indicator */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs font-pixel-vt323 transition-all cursor-pointer hover:scale-105"
                title="Tap to Flip Ledger"
              >
                <RotateCw size={11} className="animate-spin-slow" />
                <span>Flip Ledger</span>
              </button>
            </div>
          </div>

          {/* Certificate Image Frame */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
            className={`relative w-full rounded-xl overflow-hidden border border-amber-400/30 bg-black/60 group/img my-1 shrink-0 cursor-pointer ${
              isCompact ? 'h-36 sm:h-44' : 'h-48'
            }`}
            title="Click card image to flip ledger"
          >
            <img
              src={currentImage}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              onError={(e) => {
                // Fallback gracefully if broken image
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=85';
              }}
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Badge on Image */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none z-10">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-amber-400/40 text-amber-300 text-xs font-pixel-vt323 font-bold truncate">
                {cert.badge || 'VERIFIED DISTINCTION'}
              </span>
              <span className="text-xs font-pixel-vt323 text-white/90 bg-black/70 px-1.5 py-0.5 rounded border border-white/10">
                {cert.date}
              </span>
            </div>

            {/* Quick Gallery Edit Controls overlay on hover */}
            {allowEdit && (
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-2 py-1 rounded-md bg-black/85 hover:bg-amber-400 text-white hover:text-black border border-amber-400/50 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer shadow-lg"
                  title="Upload from device gallery"
                >
                  <Upload size={11} />
                  <span>Gallery</span>
                </button>

                {hasCustomImage && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="p-1 rounded-md bg-black/85 hover:bg-rose-500/80 text-rose-300 border border-rose-400/40 transition-all cursor-pointer"
                    title="Reset to Original Image"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Certificate Metadata summary */}
          <div className="space-y-1.5 mt-2">
            <h4 className="text-white font-bold text-sm sm:text-base font-pixel-vt323 leading-snug line-clamp-2 group-hover/flip:text-amber-200 transition-colors">
              {cert.title}
            </h4>
            <p className="text-amber-300/90 text-xs font-pixel-vt323 truncate">{cert.issuer}</p>
            <p className="text-white/80 text-xs font-pixel-vt323 leading-relaxed line-clamp-2">
              {cert.description}
            </p>
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-xs font-pixel-vt323">
            <span className="text-white/50 truncate font-mono text-[10px]">ID: {cert.credentialCode || cert.id}</span>
            <div className="flex items-center gap-2">
              {onInspect && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspect(cert);
                  }}
                  className="px-3 py-1 rounded bg-amber-300 hover:bg-white text-black font-pixel-vt323 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md hover:scale-105"
                >
                  <Eye size={12} />
                  <span>VIEW CERTIFICATE</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (Official Verification Ledger & Audit Data) ================= */}
        <div
          className={`w-full h-full rounded-2xl bg-[#090d18] border-2 border-amber-400/60 overflow-hidden shadow-2xl flex flex-col justify-between p-5 backface-hidden transition-all duration-300 absolute inset-0 ${
            isCompact ? 'min-h-[380px]' : 'min-h-[440px]'
          }`}
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-400/30 pb-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold">
              <Award size={14} className="text-amber-400" />
              <span>OFFICIAL VERIFICATION LEDGER</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-mono font-bold hover:bg-amber-300 cursor-pointer shadow-md"
            >
              <RotateCw size={10} />
              <span>Flip Front</span>
            </button>
          </div>

          {/* Ledger Records Grid */}
          <div className="space-y-2 text-xs font-mono my-2 overflow-y-auto max-h-[190px] pr-1 scrollbar-thin">
            <div className="bg-black/40 p-2 rounded-lg border border-white/10">
              <span className="text-[9px] text-white/50 uppercase block">RECIPIENT</span>
              <span className="text-white font-semibold">{cert.recipient}</span>
            </div>

            <div className="bg-black/40 p-2 rounded-lg border border-white/10">
              <span className="text-[9px] text-white/50 uppercase block">ISSUING INSTITUTION</span>
              <span className="text-amber-200 font-semibold">{cert.issuer}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                <span className="text-[9px] text-white/50 uppercase block">CONFERRAL DATE</span>
                <span className="text-white">{cert.date}</span>
              </div>
              <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                <span className="text-[9px] text-white/50 uppercase block">STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  <span>100% Verified</span>
                </span>
              </div>
            </div>

            <div className="bg-black/50 p-2 rounded-lg border border-amber-400/20 text-[10px] text-white/70">
              <span className="text-amber-300 block font-semibold mb-0.5">CRITERIA / SUMMARY:</span>
              <p className="leading-relaxed">{cert.description}</p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] transition-colors cursor-pointer"
            >
              {copiedId ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              <span>{copiedId ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              {allowEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-[10px] transition-colors cursor-pointer"
                  title="Browse image from gallery"
                >
                  <Upload size={10} />
                  <span>Browse Image</span>
                </button>
              )}

              {cert.externalLink && (
                <a
                  href={cert.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-black/60 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 text-[10px]"
                >
                  <span>Portal</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
