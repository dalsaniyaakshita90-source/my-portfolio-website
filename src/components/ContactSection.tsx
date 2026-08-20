import React, { useState } from 'react';
import { PERSONAL_INFO, CONTACT_EXPLORING_ITEMS } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  Heart,
  Globe
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Research Collaborations',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playChime(880, 0.4);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#818cf8', '#38bdf8', '#f43f5e']
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>SECTION 08 • LET’S CONNECT & COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Every Meaningful Journey Begins With a Conversation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Whether it's a new idea, a shared curiosity, or a challenge worth solving, I'd love to hear your story too.
          </p>
        </div>

        {/* Narrative & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Direct Info & Exploring Areas (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card3DTilt
              maxTilt={6}
              glowColor="rgba(251, 191, 36, 0.2)"
              className="liquid-glass-gold p-8 rounded-3xl border border-amber-400/30"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" />
                <span>📬 Connect With Me</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-4">
                Let's Start a Conversation
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 text-slate-200 hover:text-amber-300 transition-all"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block font-mono">Email Direct</span>
                    <span className="font-medium">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 text-slate-200 hover:text-amber-300 transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Phone</span>
                    <span className="font-medium">{PERSONAL_INFO.phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Location</span>
                    <span className="font-medium">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-400/50 text-slate-200 hover:text-indigo-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">LinkedIn Profile</span>
                      <span className="font-medium">{PERSONAL_INFO.linkedinDisplay}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </Card3DTilt>

            {/* Currently Exploring Capsule */}
            <div className="liquid-glass p-7 rounded-3xl border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                🌍 Currently Open To
              </h4>
              <div className="flex flex-wrap gap-2">
                {CONTACT_EXPLORING_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Collaboration Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(129, 140, 248, 0.2)"
              className="liquid-glass-strong p-8 sm:p-10 rounded-3xl border border-white/15"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    Message Dispatched with Empathy!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto mb-6">
                    Thank you, {formData.name}. Akshita has received your inquiry regarding <em>"{formData.topic}"</em> and will reply promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'Research Collaborations', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                  >
                    Send Another Thought
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>💌 Send a Direct Collaboration Note</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Maya / Alex"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@university.edu"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Inquiry Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {CONTACT_EXPLORING_ITEMS.map((topic) => (
                        <option key={topic} value={topic} className="bg-slate-900 text-white">
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Message or Perspective</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your research concept, question, Project L³ idea, or collaborative thought..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message & Connect</span>
                  </button>
                </form>
              )}
            </Card3DTilt>
          </div>
        </div>

        {/* 🌱 Before You Leave & 🌎 A Personal Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card3DTilt
            maxTilt={5}
            glowColor="rgba(244, 63, 94, 0.15)"
            className="liquid-glass p-8 rounded-3xl border border-white/10"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block mb-2">
              🌱 BEFORE YOU LEAVE...
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Curiosity has the power to change lives. Every question we ask expands our understanding. Every perspective we embrace makes us more human. And every small act of inclusion brings us one step closer to a better world.
            </p>
          </Card3DTilt>

          <Card3DTilt
            maxTilt={5}
            glowColor="rgba(251, 191, 36, 0.15)"
            className="liquid-glass p-8 rounded-3xl border border-white/10"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block mb-2">
              🌎 A PERSONAL NOTE
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              I don't aspire to have all the answers. I aspire to keep asking better questions. To continue exploring places I've never been, meeting people I've never known, understanding lives different from my own, and using everything I learn to create meaningful change. This portfolio is not the story of everything I've achieved. It's the beginning of everything I hope to become.
            </p>
          </Card3DTilt>
        </div>

        {/* 🌌 The Final Words */}
        <div className="text-center max-w-2xl mx-auto pt-12 border-t border-slate-800">
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-amber-400 mb-4">
            🌌 THE FINAL WORDS
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            Still Exploring.
          </h3>
          <p className="text-base sm:text-lg font-serif italic text-amber-200/90 leading-relaxed space-y-1">
            Exploring new ideas.<br />
            Learning from every experience.<br />
            Becoming a better human, one question at a time.
          </p>
          <div className="mt-8 text-[11px] font-mono text-slate-500">
            © {new Date().getFullYear()} Akshita Dalsaniya • Founder, Project L³ • All Rights Reserved
          </div>
        </div>
      </div>
    </section>
  );
};
