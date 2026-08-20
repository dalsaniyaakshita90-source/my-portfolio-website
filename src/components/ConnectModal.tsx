import React, { useState } from 'react';
import { PERSONAL_INFO, CONTACT_EXPLORING_ITEMS } from '../data/portfolioData';
import { soundEngine } from './AudioAmbience';
import confetti from 'canvas-confetti';
import {
  X,
  Send,
  CheckCircle2,
  Mail,
  Globe,
  MapPin,
  FileText,
  Sparkles,
  ExternalLink,
  MessageSquareQuote
} from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  onOpenResume
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Research Collaborations',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    soundEngine.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 }
    });
    setContactSubmitted(true);
  };

  const handleTopicSelect = (topic: string) => {
    soundEngine.playCardHover();
    setContactForm({ ...contactForm, topic });
  };

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      {/* Frosted Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          soundEngine.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog Card */}
      <div
        onWheel={(e) => e.stopPropagation()}
        className="modal-scroll relative z-10 w-full max-w-2xl pixel-hud-box rounded-2xl border border-amber-400/50 p-6 sm:p-8 bg-slate-950/95 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Cyberpunk corner accents */}
        <span className="cyber-corner-tl" />
        <span className="cyber-corner-tr" />
        <span className="cyber-corner-bl" />
        <span className="cyber-corner-br" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-amber-400/20 pb-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-pixel-vt323 text-sm">
              <Sparkles size={14} className="text-amber-400" />
              <span>DIRECT TRANSMISSION // LET'S CONNECT</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal text-white font-pixel-vt323 tracking-wide"
            >
              Let's Connect & Collaborate
            </h2>
            <p className="text-white/80 text-sm font-pixel-vt323">
              Open for research collaborations, social initiatives & thoughtful ideas.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            data-cursor-hover
            data-cursor-label="Close"
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-scroll overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          {/* Topic Selector Fast Pills */}
          <div className="space-y-2 font-pixel-vt323">
            <span className="text-xs text-amber-300 uppercase tracking-wider block font-bold">
              🎯 SELECT FOCUS / TOPIC OF COLLABORATION:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CONTACT_EXPLORING_ITEMS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleTopicSelect(item)}
                  className={`px-3 py-1 rounded-md text-sm font-pixel-vt323 transition-all cursor-pointer border ${
                    contactForm.topic === item
                      ? 'bg-amber-300 text-black border-amber-300 font-bold shadow-md'
                      : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/15'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Form / Success State */}
          {contactSubmitted ? (
            <div className="p-8 rounded-xl bg-black/40 border border-emerald-400/50 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-mono">TRANSMISSION RECEIVED</h3>
                <p className="text-white/80 text-xs sm:text-sm">
                  Thank you, <span className="text-amber-300 font-semibold">{contactForm.name}</span>. Your message regarding <span className="text-amber-200">{contactForm.topic}</span> has been logged.
                </p>
                <p className="text-white/60 text-xs">
                  Akshita will review your dispatch and reply to <span className="text-white">{contactForm.email}</span> shortly.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setContactSubmitted(false);
                    setContactForm({ name: '', email: '', topic: 'Research Collaborations', message: '' });
                  }}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono cursor-pointer border border-white/20 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-white/70 block">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-white/70 block">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@organization.org"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-white/70 block">SELECTED INITIATIVE / TOPIC</label>
                <select
                  value={contactForm.topic}
                  onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {CONTACT_EXPLORING_ITEMS.map((item) => (
                    <option key={item} value={item} className="bg-slate-950 text-white">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-white/70 block">MESSAGE OR PROPOSAL</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your research inquiry, collaboration proposal, or message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor-hover
                data-cursor-label="Transmit"
                className="w-full py-3 rounded-xl bg-amber-300 hover:bg-white text-black font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
              >
                <Send size={15} />
                <span>Transmit Message to Akshita</span>
              </button>
            </form>
          )}

          {/* Quick Direct Coordinates Footer */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs"
            >
              <Mail size={15} className="text-amber-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-white/50 block font-mono">DIRECT EMAIL</span>
                <span className="font-mono text-white/90 truncate block">{PERSONAL_INFO.email}</span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Globe size={15} className="text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-white/50 block font-mono">LINKEDIN</span>
                  <span className="text-white/90 font-mono">{PERSONAL_INFO.linkedinDisplay}</span>
                </div>
              </div>
              <ExternalLink size={12} className="text-white/40" />
            </a>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs">
              <MapPin size={15} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-white/50 block font-mono">LOCATION</span>
                <span className="text-white/90 font-mono">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {onOpenResume && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="text-xs font-mono text-amber-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <FileText size={13} />
                <span>Looking for Credentials & CV? Open Resume Viewer →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
