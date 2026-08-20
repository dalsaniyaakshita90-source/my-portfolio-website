import React, { useState, useEffect, useRef } from 'react';
import { CertificateItem } from '../data/certificatesData';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Building,
  Calendar,
  User,
  FileText,
  Printer,
  Copy,
  Check,
  Upload,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { soundEngine } from './AudioAmbience';
import {
  getStoredCustomCertificates,
  saveCustomCertificateImage,
  resetCustomCertificateImage,
  compressAndSaveImageFile
} from '../utils/certificateStore';
import confetti from 'canvas-confetti';

interface CertificateDocumentViewProps {
  cert: CertificateItem;
  className?: string;
  isCompact?: boolean;
}

export const CertificateDocumentView: React.FC<CertificateDocumentViewProps> = ({
  cert,
  className = '',
  isCompact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(cert.imageUrl || '');
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const customMap = getStoredCustomCertificates();
    if (customMap[cert.id]) {
      setCurrentImage(customMap[cert.id]);
      setHasCustomImage(true);
    } else {
      setCurrentImage(cert.imageUrl || '');
      setHasCustomImage(false);
    }
  }, [cert.id, cert.imageUrl]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const certCode = cert.credentialCode || cert.id;
    navigator.clipboard.writeText(certCode);
    setCopied(true);
    soundEngine.playChime(700, 0.2);
    setTimeout(() => setCopied(false), 2000);
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

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetCustomCertificateImage(cert.id);
    setCurrentImage(cert.imageUrl || '');
    setHasCustomImage(false);
    soundEngine.playClick();
  };

  const getSealTheme = () => {
    switch (cert.category) {
      case 'Creative & Arts':
        return {
          sealBg: 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600',
          sealBorder: 'border-amber-500',
          sealText: 'text-amber-950',
          accentColor: 'text-amber-800',
          borderStyle: 'border-amber-300',
        };
      case 'Research':
        return {
          sealBg: 'bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600',
          sealBorder: 'border-blue-500',
          sealText: 'text-blue-950',
          accentColor: 'text-blue-900',
          borderStyle: 'border-blue-300',
        };
      case 'Finance':
        return {
          sealBg: 'bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600',
          sealBorder: 'border-emerald-500',
          sealText: 'text-emerald-950',
          accentColor: 'text-emerald-900',
          borderStyle: 'border-emerald-300',
        };
      case 'Disability & Inclusion':
        return {
          sealBg: 'bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600',
          sealBorder: 'border-purple-500',
          sealText: 'text-purple-950',
          accentColor: 'text-purple-900',
          borderStyle: 'border-purple-300',
        };
      default:
        return {
          sealBg: 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600',
          sealBorder: 'border-amber-500',
          sealText: 'text-amber-950',
          accentColor: 'text-slate-800',
          borderStyle: 'border-amber-300',
        };
    }
  };

  const theme = getSealTheme();

  return (
    <div
      className={`relative w-full rounded-2xl bg-[#fdfbf7] text-[#1c1917] shadow-xl overflow-hidden select-text border border-amber-200/80 transition-all ${
        isCompact ? 'p-4 sm:p-5' : 'p-6 sm:p-8'
      } ${className}`}
      style={{
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(217, 119, 6, 0.15)',
      }}
    >
      {/* Hidden file input for browsing device gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Decorative Classical Ornate Border */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-amber-800/20 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-dashed border-amber-800/30 rounded-lg pointer-events-none" />

      {/* Ornate Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-700 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-700 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-700 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-700 pointer-events-none" />

      {/* Subtle Background Watermark Crest */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
        <Award className="w-80 h-80 text-amber-900" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3.5">
        {/* Top Control Bar: Upload from Gallery / Swap Image */}
        <div className="flex items-center justify-between gap-2 border-b border-amber-900/10 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-semibold uppercase tracking-wider">
            <span>OFFICIAL DISTINCTION</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 text-[10px] font-mono font-bold transition-all cursor-pointer border border-amber-900/20"
              title="Browse certificate image from your gallery"
            >
              <Upload size={11} />
              <span>Browse Gallery</span>
            </button>

            {hasCustomImage && (
              <button
                type="button"
                onClick={handleReset}
                className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-mono transition-all cursor-pointer border border-rose-300"
                title="Reset Image"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Certificate Header / Issuing Authority */}
        <div className="text-center space-y-0.5">
          <h4 className="text-xs sm:text-sm font-semibold tracking-widest text-amber-900/80 uppercase font-mono">
            {cert.issuer}
          </h4>

          <h2
            className="text-xl sm:text-2xl text-stone-900 font-normal leading-tight font-serif-instrument"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {cert.title}
          </h2>
        </div>

        {/* Visual Preview Image if present */}
        {currentImage && (
          <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden border border-amber-900/20 shadow-inner group/preview">
            <img
              src={currentImage}
              alt={cert.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-2 text-white text-[10px] font-mono">
              <span className="bg-black/70 px-2 py-0.5 rounded border border-white/20">
                {cert.badge || 'VERIFIED RECORD'}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="bg-amber-400 text-black font-bold px-2 py-0.5 rounded opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                <ImageIcon size={10} />
                <span>Change Image</span>
              </button>
            </div>
          </div>
        )}

        {/* Certificate Body & Recipient */}
        <div className="text-center py-2 px-3 bg-white/80 rounded-xl border border-amber-900/10 backdrop-blur-xs space-y-1">
          <p className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">
            This is proudly conferred to
          </p>

          <h3
            className="text-xl sm:text-2xl text-amber-950 font-normal tracking-wide"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {cert.recipient}
          </h3>

          <p className="text-xs text-stone-700 max-w-xl mx-auto leading-relaxed font-light line-clamp-2">
            {cert.description}
          </p>
        </div>

        {/* Footer: Authentic Seals, Date & Signatures */}
        <div className="pt-2.5 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Official Verification Seal */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-full ${theme.sealBg} border-2 ${theme.sealBorder} flex flex-col items-center justify-center ${theme.sealText} shadow-md shrink-0 relative`}
            >
              <Award className="w-4 h-4" />
              <span className="text-[6px] font-bold tracking-tighter uppercase font-mono">SEAL</span>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1">
                <span>AUTHENTIC RECORD</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
              </div>
              <div className="text-[10px] text-stone-500 font-mono">{cert.date}</div>
            </div>
          </div>

          {/* Verification Code & Copy Action */}
          <div className="flex items-center gap-2">
            <div className="text-right font-mono">
              <span className="text-[9px] text-stone-500 block uppercase">CREDENTIAL LEDGER</span>
              <span className="text-xs font-bold text-amber-900">
                {cert.credentialCode || cert.id}
              </span>
            </div>

            <button
              onClick={handleCopy}
              title="Copy Credential ID"
              className="p-1.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-950 transition-colors border border-amber-300 text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
