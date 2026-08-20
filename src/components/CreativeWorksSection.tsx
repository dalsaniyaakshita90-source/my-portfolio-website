import React, { useState } from 'react';
import { CREATIVE_EXPRESSION_DATA } from '../data/portfolioData';
import { Card3DTilt } from './Card3DTilt';
import { soundEngine } from './AudioAmbience';
import {
  Sparkles,
  BookOpen,
  Feather,
  Palette,
  Volume2,
  Smile,
  Music,
  Brush,
  Tv,
  Drama,
  Share2
} from 'lucide-react';

export const CreativeWorksSection: React.FC = () => {
  const [mimicryPlaying, setMimicryPlaying] = useState<string | null>(null);

  const voiceCharacters = [
    { name: 'Shinchan Energetic Tone', freq: 520, tone: 'Playful & Mischievous' },
    { name: 'Doraemon Warm Voice', freq: 440, tone: 'Comforting & Friendly' },
    { name: 'Animated Whimsical Melody', freq: 660, tone: 'Bright & Expressive' },
    { name: 'Dramatic Hero Accent', freq: 330, tone: 'Cinematic & Bold' }
  ];

  const handlePlayVoice = (character: typeof voiceCharacters[0]) => {
    setMimicryPlaying(character.name);
    soundEngine.playMimicrySound(character.name);
    setTimeout(() => {
      setMimicryPlaying(null);
    }, 1200);
  };

  return (
    <section id="creative" className="relative py-28 border-t border-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-purple-400 mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>SECTION 06 • CREATIVE EXPRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Where Words, Art & Emotion Meet
          </h2>
          <p className="text-purple-300 font-serif italic text-lg sm:text-xl font-light">
            &ldquo;{CREATIVE_EXPRESSION_DATA.closingArtQuote}&rdquo;
          </p>
        </div>

        {/* 🌙 Why I Create Hero Card */}
        <Card3DTilt
          maxTilt={4}
          glowColor="rgba(168, 85, 247, 0.2)"
          className="liquid-glass p-8 sm:p-12 rounded-3xl border border-purple-500/30 mb-16 space-y-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
            <Feather className="w-4 h-4" />
            <span>🌙 Why I Create</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Research helps me understand the world. Creativity helps me experience it.
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {CREATIVE_EXPRESSION_DATA.whyICreate.desc}
          </p>
        </Card3DTilt>

        {/* Fiction Novel & Poetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Debut Novel (7 cols) */}
          <div className="lg:col-span-7">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(251, 191, 36, 0.2)"
              className="liquid-glass-gold p-8 sm:p-10 rounded-3xl border border-amber-400/30 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-widest">
                    <BookOpen className="w-4 h-4" />
                    <span>📖 Fiction & Long-form Storytelling</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono">
                    {CREATIVE_EXPRESSION_DATA.debutNovel.status}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  {CREATIVE_EXPRESSION_DATA.debutNovel.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {CREATIVE_EXPRESSION_DATA.debutNovel.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-400/20 text-[11px] font-mono text-amber-300/80">
                // Themes: Emotional Resilience • Human Connections • Psychological Growth
              </div>
            </Card3DTilt>
          </div>

          {/* Poetry (5 cols) */}
          <div className="lg:col-span-5">
            <Card3DTilt
              maxTilt={5}
              glowColor="rgba(168, 85, 247, 0.2)"
              className="liquid-glass p-8 sm:p-10 rounded-3xl border border-purple-500/30 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
                  <Feather className="w-4 h-4" />
                  <span>✒️ Poetry</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  Between Words & Silence
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {CREATIVE_EXPRESSION_DATA.poetry.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs italic font-serif text-purple-200">
                &ldquo;Where thoughts become feelings, and feelings become something others can connect with.&rdquo;
              </div>
            </Card3DTilt>
          </div>
        </div>

        {/* 🎨 Beyond Words & 🌟 Playful Voice Mimicry Interactive Soundboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Beyond Words List (6 cols) */}
          <div className="lg:col-span-6 liquid-glass p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
              <Brush className="w-4 h-4" />
              <span>🎨 Beyond Words: Artistic Disciplines</span>
            </div>
            <p className="text-xs text-slate-300 font-light mb-6">
              Creativity, for me, is not limited to writing. Over the years, I've explored many forms of artistic expression:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              {CREATIVE_EXPRESSION_DATA.beyondWords.map((item) => (
                <div
                  key={item}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Playful Voice Mimicry Interactive Console (6 cols) */}
          <div className="lg:col-span-6 liquid-glass-rose p-8 rounded-3xl border border-rose-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-300 uppercase tracking-widest">
                <Smile className="w-4 h-4 text-rose-400" />
                <span>🌟 A Playful Side: Cartoon Voice Mimicry</span>
              </div>
              <span className="text-[10px] font-mono text-rose-300/80">Interactive Audio</span>
            </div>

            <p className="text-xs text-slate-200 font-light mb-6">
              {CREATIVE_EXPRESSION_DATA.playfulSide.desc}
            </p>

            <div className="space-y-2.5">
              {voiceCharacters.map((char) => (
                <button
                  key={char.name}
                  onClick={() => handlePlayVoice(char)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    mimicryPlaying === char.name
                      ? 'bg-rose-500 text-white border-rose-400 scale-[1.02]'
                      : 'bg-black/40 hover:bg-white/10 border-white/10 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs text-white">{char.name}</div>
                    <div className="text-[10px] font-mono text-rose-300/80">{char.tone}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <Volume2 className={`w-4 h-4 ${mimicryPlaying === char.name ? 'animate-bounce text-yellow-300' : ''}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🌱 The Creator I'm Becoming & 🌍 Looking Ahead */}
        <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-white/10 text-center max-w-4xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-3">
            // THE CREATOR I'M BECOMING
          </span>
          <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed mb-6">
            &ldquo;{CREATIVE_EXPRESSION_DATA.creatorBecoming.desc}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl mx-auto">
            In the years ahead, I hope to publish novels, write poetry collections, document my travels, share thoughtful essays, experiment with new art forms, and continue exploring creativity without boundaries.
          </p>
        </div>
      </div>
    </section>
  );
};
