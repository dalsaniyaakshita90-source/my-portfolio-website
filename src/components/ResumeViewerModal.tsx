import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { X, Printer, Download, Copy, Check, ExternalLink, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { soundEngine } from './AudioAmbience';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEngine.playChime(600, 0.2);
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `AKSHITA DALSANIYA
Research Enthusiast | Founder, Project L³ | CFA Level I Candidate
Building inclusive futures through research, collaboration, and innovation.
Rajkot, Gujarat, India | dalsaniyaakshita90@gmail.com | +91 9725433903 | linkedin.com/in/Akshita-dalsaniya

EDUCATION:
Bachelor of Business Administration (BBA) - RK University | CGPA: 8.0/10 (Exp 2027)

RESEARCH & FOUNDERSHIP:
- Research Intern, Hanoi University of Mining and Geology (HUMG), Vietnam (Score 3.7/4.0)
- Founder, Project L³ (Love. Laughter. Life.) - Research-driven disability inclusion initiative

HONORS:
- Silver Award, Queen's Commonwealth Essay Competition (International)
- State-Level Representative, RBI90 Quiz (Reserve Bank of India)
- Qualifier, National Finance Literacy Quiz (SEBI / NISM)`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    soundEngine.playChime(750, 0.2);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Modal Action Bar (No print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs font-mono text-slate-300 ml-2">Akshita_Dalsaniya_Curriculum_Vitae.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-bold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Paper View (High Contrast Clean Format) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 bg-white text-slate-900 font-sans leading-normal">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-slate-950 font-serif">
              AKSHITA DALSANIYA
            </h1>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              Research Enthusiast | Founder, Project L³ | CFA Level I Candidate
            </div>
            <div className="text-xs italic text-slate-600 mt-1">
              Building inclusive futures through research, collaboration, and innovation.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700 mt-3">
              <span className="flex items-center gap-1">📍 Rajkot, Gujarat, India</span>
              <span className="flex items-center gap-1">📧 {PERSONAL_INFO.email}</span>
              <span className="flex items-center gap-1">📱 {PERSONAL_INFO.phone}</span>
              <span className="flex items-center gap-1">🔗 {PERSONAL_INFO.linkedinDisplay}</span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              Final year Bachelor of Business Administration (BBA) student at RK University with international research experience in sustainable industrial development through Hanoi University of Mining and Geology, Vietnam. Founder of Project L³ (Love. Laughter. Life.), a research driven social innovation initiative focused on disability inclusion and inclusive system design. Passionate about interdisciplinary research at the intersection of sustainability, behavioural science, entrepreneurship, and inclusive innovation, while strengthening my foundation in finance as a CFA Level I Candidate.
            </p>
          </div>

          {/* Section: Education */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              EDUCATION
            </h2>
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
              <span>Bachelor of Business Administration (BBA)</span>
              <span>Expected Graduation: 2027</span>
            </div>
            <div className="text-xs text-slate-700 italic">RK University | Rajkot, Gujarat, India</div>
            <div className="text-xs text-slate-800 mt-1">
              <strong>Academic Focus:</strong> Business Research • Financial Management • Economics • Entrepreneurship • Sustainability • Social Innovation
            </div>
            <div className="text-xs text-slate-800 font-semibold mt-0.5">
              CGPA: 8.0 / 10.0
            </div>
          </div>

          {/* Section: Research Experience */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              RESEARCH EXPERIENCE
            </h2>
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
              <span>Research Intern</span>
              <span>August 2025 – September 2025</span>
            </div>
            <div className="text-xs text-slate-700 italic mb-1.5">Hanoi University of Mining and Geology (HUMG), Vietnam</div>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
              <li>Conducted interdisciplinary research on sustainable industrial development, exploring relationships between resource management, environmental sustainability, and industrial growth.</li>
              <li>Performed literature reviews, research documentation, qualitative analysis, and data interpretation to support evidence-based findings.</li>
              <li>Collaborated within an international research environment, strengthening cross-cultural communication and analytical research skills.</li>
              <li>Successfully completed the internship with a final performance score of <strong>3.7 / 4.0</strong>.</li>
            </ul>
          </div>

          {/* Section: Projects */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              PROJECTS
            </h2>
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
              <span>Project L³ (Love. Laughter. Life.) — Founder</span>
              <span>2026 – Present</span>
            </div>
            <div className="text-xs text-slate-700 italic mb-1.5">Research-driven social innovation initiative dedicated to building more inclusive systems for people with disabilities.</div>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
              <li>Conducting literature reviews and stakeholder research on disability inclusion, accessibility, behavioural science, and inclusive design.</li>
              <li>Designing an evidence-based framework integrating research, stakeholder engagement, and human-centred problem solving.</li>
              <li>Building collaborations with educators, therapists, NGOs, researchers, and disability organizations.</li>
              <li>Developing scalable solutions that promote dignity, independence, and equal opportunities.</li>
            </ul>
          </div>

          {/* Section: Leadership & Campus Involvement */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              LEADERSHIP & CAMPUS INVOLVEMENT
            </h2>
            
            <div className="mb-2.5">
              <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                <span>Business Fair Coordinator — The Joy Toy (RK University)</span>
                <span>2025</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-800">
                <li>Co-led a student business venture during the university business fair, securing the <strong>second-highest revenue</strong> among participating teams.</li>
                <li>Coordinated team operations, customer engagement, pricing strategy, and execution under time-sensitive conditions.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                <span>Volunteer Coordinator — MFesta, RK University</span>
                <span>2024 – 2025</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-800">
                <li>Managed and coordinated activities for approximately 500 participants during the university’s flagship cultural festival.</li>
                <li>Collaborated with organizing committees to ensure smooth event execution and participant engagement.</li>
              </ul>
            </div>
          </div>

          {/* Section: Professional Development */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              PROFESSIONAL DEVELOPMENT
            </h2>
            <div className="text-xs font-bold text-slate-900">Chartered Financial Analyst (CFA) Program — CFA Institute</div>
            <div className="text-xs text-slate-800">
              • CFA Level I Candidate: Building expertise in investment analysis, financial reporting, portfolio management, ethics, and quantitative methods.
            </div>
          </div>

          {/* Section: Honors & Distinctions */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              HONORS & DISTINCTIONS
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
              <li><strong>Silver Award, The Queen's Commonwealth Essay Competition (International)</strong> organized by The Royal Commonwealth Society.</li>
              <li><strong>State-Level Representative in the RBI90 Quiz</strong> conducted by the Reserve Bank of India.</li>
              <li>Participated and qualified in the <strong>National Finance Literacy Quiz</strong> conducted by NISM (SEBI).</li>
            </ul>
          </div>

          {/* Section: Creative Works */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              CREATIVE WORKS
            </h2>
            <div className="text-xs font-bold text-slate-900">Debut Novel — Author (Manuscript in Progress)</div>
            <div className="text-xs text-slate-800">
              Currently writing an original fiction novel exploring human relationships, identity, emotional resilience, and psychological growth through long-form storytelling.
            </div>
          </div>

          {/* Section: Skills & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-300">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-mono mb-1">SKILLS</h3>
              <div className="text-xs text-slate-800 space-y-0.5">
                <div><strong>Research:</strong> Literature Review • Qualitative Research • Academic Writing • Data Interpretation</div>
                <div><strong>Technical:</strong> Microsoft Excel • PowerPoint • Word • Canva • Notion • Google Workspace</div>
                <div><strong>Professional:</strong> Project Management • Stakeholder Engagement • Public Speaking • Cross-cultural Communication</div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-mono mb-1">LANGUAGES</h3>
              <div className="text-xs text-slate-800 space-y-0.5">
                <div>• Gujarati — Native Proficiency</div>
                <div>• English — Professional Working Proficiency</div>
                <div>• Hindi — Professional Working Proficiency</div>
                <div>• Spanish & French — Beginner (Self-Learning)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
