import React from 'react';
import { Shield, Building, Award, CheckCircle2, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                About HealthCare
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] leading-tight text-balance">
                Pioneering digital healthcare access and claims integrity since 2002.
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              HealthCare Healthcare Services Ltd. is a premier third-party administrator (TPA) and health benefits manager. We bridge policyholders, corporate employers, insurance carriers, and healthcare providers to deliver a paperless, transparent, and empathetic hospitalization experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-[#0B2545] mb-1">Our Core Mission</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To democratize access to exceptional medical care by eliminating administrative friction and accelerating cashless pre-authorization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-[#0B2545] mb-1">Data-First Technology</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Combining medical expertise with real-time algorithmic clearinghouse software to eliminate billing fraud and optimize corporate healthcare budgets.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quantified Evidence & Testimonials */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border border-slate-200 shadow-xs relative">
              <Quote className="w-8 h-8 text-teal-700/20 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                &ldquo;HealthCare transformed our corporate health program. Over 96% of our 45,000 employees availed cashless admission without a single out-of-pocket dispute. Their MAtrix dashboard gave us real-time visibility into claims costs.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <div className="w-9 h-9 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                  SK
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">Sanjay Krishnamurthy</div>
                  <div className="text-[11px] text-slate-500">VP &amp; Global Head of Total Rewards, Top Indian IT Enterprise</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">Awarded Best Healthcare TPA of the Year</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Recognized for algorithmic turnaround and cashless hospital empanelment.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
