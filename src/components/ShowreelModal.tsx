import React from 'react';
import { X, Play, Sparkles, ExternalLink, Award, Heart } from 'lucide-react';
import portraitImg from '../assets/images/akshita_portrait_1787143112510.jpg';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificates: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onOpenCertificates }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              Showreel & Portfolio Showcase
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Video Frame */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            <video
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4"
            />
          </div>

          {/* Profile & Initiative Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <img
                src={portraitImg}
                alt="Akshita Dalsaniya"
                className="w-14 h-14 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="font-semibold text-sm text-white">Akshita Dalsaniya</h4>
                <p className="text-xs text-white/60">Founder, Project L³</p>
                <p className="text-[11px] font-mono text-red-400 mt-0.5">CFA Level I Candidate</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Credentials</span>
                </div>
                <p className="text-xs text-white/80">11 Academic & Research Certifications</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenCertificates();
                }}
                className="text-xs text-red-400 hover:text-red-300 font-medium underline text-left mt-2"
              >
                View all 11 certificates →
              </button>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono mb-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Project L³ Mission</span>
                </div>
                <p className="text-xs text-white/80">Love. Laughter. Life. (Disability Inclusion)</p>
              </div>
              <span className="text-[11px] text-white/50">Designing inclusion into every system</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
