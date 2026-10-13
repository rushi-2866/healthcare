import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData.ts';
import {
  ShieldCheck,
  Globe,
  PieChart,
  PlaneTakeoff,
  Network,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenCashlessModal: () => void;
  onOpenMavenChat: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenCashlessModal,
  onOpenMavenChat,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const selectedService =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-indigo-600" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5 text-emerald-600" />;
      case 'Network':
        return <Network className="w-5 h-5 text-sky-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Core Expertise &amp; Administration Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] leading-tight text-balance">
            Comprehensive health benefits infrastructure tailored for modern enterprises.
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            From localized group health schemes to multinational expatriate policies and self-funded corporate trusts, our clinical engines deliver measurable containment and frictionless care.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Service Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            {SERVICES_DATA.map((service, index) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-md ring-1 ring-[#0B2545]'
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-900 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-lg shrink-0 ${
                        isSelected ? 'bg-white/10 text-teal-300' : 'bg-white shadow-xs'
                      }`}
                    >
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono ${isSelected ? 'text-teal-300' : 'text-slate-500'}`}>
                          0{index + 1}
                        </span>
                        <span aria-hidden="true" className={isSelected ? 'text-slate-500' : 'text-slate-300'}>
                          ·
                        </span>
                        <span className={`text-[11px] font-semibold tracking-wide uppercase ${isSelected ? 'text-slate-300' : 'text-teal-700'}`}>
                          {service.badge}
                        </span>
                      </div>
                      <div className={`text-sm font-bold tracking-tight mt-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {service.title}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-teal-300 translate-x-1' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Detail Card */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">
                  {selectedService.badge}
                </span>
                <h3 className="text-2xl font-extrabold text-[#0B2545] tracking-tight mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <div className="text-right bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xl font-bold font-mono text-[#0B2545] tabular-nums">
                  {selectedService.metric}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {selectedService.metricLabel}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Key Operational Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200/90 flex items-start gap-2.5 text-xs text-slate-800 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Ribbon */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Need a customized corporate proposal or provider review?
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenMavenChat}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B2545] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Ask Details</span>
                  </button>
                  <button
                    onClick={onOpenCashlessModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#134074] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
