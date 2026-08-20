import React, { useState } from 'react';
import { ViewMode3D } from '../types';
import { soundEngine } from './AudioAmbience';
import { Sparkles, Volume2, VolumeX, Award, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  viewMode: ViewMode3D;
  onViewModeChange: (mode: ViewMode3D) => void;
  onOpenResume: () => void;
  onOpenCertificates: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onViewModeChange,
  onOpenResume,
  onOpenCertificates,
  onOpenContact
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    if (!newState) {
      soundEngine.init();
      soundEngine.setMuted(false);
      soundEngine.playChime(660, 0.3);
    } else {
      soundEngine.setMuted(true);
    }
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Chapters', href: '#chapters' },
    { label: 'Research', href: '#research' },
    { label: 'Project L³', href: '#project-l3' },
    { label: 'Creative', href: '#creative' },
    { label: 'Recognition', href: '#recognition' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-10 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between liquid-glass-strong px-5 sm:px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        {/* Brand Name */}
        <a
          href="#hero"
          onClick={() => soundEngine.playNodeSelect()}
          className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#03060f] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <span className="font-serif font-bold text-base sm:text-lg tracking-tight">
            Akshita Dalsaniya
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-slate-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => soundEngine.playNodeSelect()}
              className="hover:text-amber-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (Sound, Certificates, CV) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-md shadow-amber-400/20'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isMuted ? 'Enable Ambient Atmospheric Sound' : 'Mute Ambient Sound'}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 11 Certificates Modal Button */}
          <button
            onClick={() => {
              soundEngine.playChime(750, 0.2);
              onOpenCertificates();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-mono transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>11 Certificates</span>
          </button>

          {/* CV Button */}
          <button
            onClick={() => {
              soundEngine.playChime(600, 0.2);
              onOpenResume();
            }}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto liquid-glass-strong p-6 rounded-3xl border border-white/10 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  soundEngine.playNodeSelect();
                  setMobileMenuOpen(false);
                }}
                className="py-2 border-b border-white/5 hover:text-amber-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCertificates();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>View 11 Official Certificates</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Download / Print CV</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
