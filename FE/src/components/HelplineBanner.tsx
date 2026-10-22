import React from 'react';
import {
  Phone,
  MessageCircle,
  HeartHandshake,
  Mail,
  Clock,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from 'lucide-react';

interface HelplineBannerProps {
  onOpenMavenChat: () => void;
}

export const HelplineBanner: React.FC<HelplineBannerProps> = ({ onOpenMavenChat }) => {
  return (
    <section className="py-14 bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#0B2545] text-white relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Headphones className="w-3.5 h-3.5" />
              <span>24x7 Round-The-Clock Healthcare Support</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Emergency assistance or hospitalization queries? We are here 24 hours a day.
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Connect immediately with our certified medical adjudicators, pre-auth coordinators, and senior citizen priority desk officers.
            </p>
          </div>

          {/* Right Action Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 24x7 Emergency Line */}
            <a
              href="tel:18004259449"
              className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-left flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-teal-300 mb-2">
                <Phone className="w-5 h-5" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-300">Toll-Free</span>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-white tracking-tight">
                  1800-425-9449
                </div>
                <div className="text-xs text-slate-300 mt-0.5">24x7 Emergency Desk</div>
              </div>
            </a>

            {/* Senior Citizen Hotline */}
            <a
              href="tel:18001023455"
              className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-left flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-amber-300 mb-2">
                <HeartHandshake className="w-5 h-5" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-300">Priority</span>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-white tracking-tight">
                  1800-102-3455
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Senior Citizen Support</div>
              </div>
            </a>

            {/* WhatsApp Integration Button */}
            <button
              onClick={onOpenMavenChat}
              className="sm:col-span-2 p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold leading-tight">Chat with MAven on WhatsApp</div>
                  <div className="text-xs text-emerald-100 font-normal">Check claim status, find cashless hospital &amp; E-Cards</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
