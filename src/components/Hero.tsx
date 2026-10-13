import React from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  Activity,
  CreditCard,
  Building,
} from 'lucide-react';

interface HeroProps {
  onOpenHospitalSearch: () => void;
  onOpenMavenChat: () => void;
  onOpenCashlessModal: () => void;
  onOpenLogin: (role?: 'member' | 'corporate') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenHospitalSearch,
  onOpenMavenChat,
  onOpenCashlessModal,
  onOpenLogin,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-[#F8FAFC] pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Kicker */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-[#0B2545] tracking-wide uppercase">IRDAI Reg. TPA #003</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>ISO 27001 Certified Data Security</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-teal-700 font-semibold">Over 12.5M Lives Secured</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2545] leading-[1.15] text-balance">
              Intelligent solutions for modern healthcare &amp; benefits administration.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Empowering leading corporations, insurers, and members with seamless cashless hospitalizations, algorithmic fraud prevention, real-time claims intelligence, and human-first clinical concierge care across 28,500+ provider nodes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#134074] rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenHospitalSearch}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B2545] bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-teal-600" />
                <span>Search Hospitals</span>
              </button>
            </div>

            {/* Interactive MAven Mascot Helper Preview Prompt */}
            <div className="pt-2">
              <div
                onClick={onOpenMavenChat}
                className="group relative flex items-start sm:items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-teal-50/80 via-blue-50/60 to-white border border-teal-200/90 shadow-xs hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-teal-100" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#0B2545] tracking-tight">
                      Meet MAven - Your digital healthcare companion
                    </span>
                    <span className="text-[11px] font-medium text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                      24/7 Virtual Assistant
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5">
                    &ldquo;Have a question about cashless admission, policy limits, or E-Card download? Click to ask.&rdquo;
                  </p>
                </div>
                <div className="hidden sm:flex items-center text-xs font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Chat Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_healthcare_admin_1791873479323.jpg"
                alt="HealthCare operations center and medical benefits administration team"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent pointer-events-none" />

              {/* Inset Credibility Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-800">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-[#0B2545]">MAtrix Live Clearinghouse</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Avg Turnaround: 28 mins
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-[#0B2545] font-mono tabular-nums">98.4%</div>
                    <div className="text-[10px] text-slate-500">Cashless Pre-Auth</div>
                  </div>
                  <div className="border-x border-slate-200">
                    <div className="font-bold text-[#0B2545] font-mono tabular-nums">28.5K+</div>
                    <div className="text-[10px] text-slate-500">Hospitals Empaneled</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0B2545] font-mono tabular-nums">Zero</div>
                    <div className="text-[10px] text-slate-500">Paper Vouchers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Dock Below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Instant Beneficiary &amp; Employer Actions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={onOpenHospitalSearch}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2545] group-hover:text-teal-700 transition-colors">
                  Find Hospital
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">28,500+ cashless centers</div>
              </div>
            </button>

            <a
              href="#products"
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2545] group-hover:text-blue-700 transition-colors">
                  Track Claim
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Live MAtrix stage tracker</div>
              </div>
            </a>

            <button
              onClick={() => onOpenLogin('member')}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2545] group-hover:text-indigo-700 transition-colors">
                  Download E-Card
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Instant digital health pass</div>
              </div>
            </button>

            <button
              onClick={onOpenCashlessModal}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2545] group-hover:text-emerald-700 transition-colors">
                  Intimate Admission
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Planned surgery pre-auth</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
