import React, { useState } from 'react';
import { X, Send, Mail, Phone, MapPin, CheckCircle2, Calendar } from 'lucide-react';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', date: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#09090b] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Schedule a Call</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h4 className="font-semibold text-lg text-white mb-2">Request Received</h4>
            <p className="text-xs text-white/70 mb-6">
              Thank you, {form.name}. We will confirm your call invitation via {form.email} shortly.
            </p>
            <button
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="px-6 py-2 rounded-full bg-white text-black text-xs font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Sarah Connor"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. sarah@domain.com"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Preferred Date / Time</label>
              <input
                type="datetime-local"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Project or Inquiry Details</label>
              <textarea
                rows={3}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share your goals, project scope, or research topic..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Schedule</span>
            </button>

            <div className="pt-2 text-center text-[11px] text-white/50">
              Direct: dalsaniyaakshita90@gmail.com • +91 9725433903
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
