import React, { useState } from 'react';
import { PRODUCTS_DATA, SAMPLE_CLAIMS } from '../data/mockData.ts';
import {
  Layers,
  ShieldAlert,
  Smartphone,
  Search,
  CheckCircle2,
  Clock,
  Building,
  Check,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

import techDashboardImg from '../assets/images/healthcare_tech_dashboard_1791873479411.jpg';

interface ProductsSectionProps {
  onOpenLogin: (role?: 'corporate' | 'member') => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenLogin }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('matrix');
  const [claimSearchInput, setClaimSearchInput] = useState<string>('CLM-89241');
  const [currentClaim, setCurrentClaim] = useState(SAMPLE_CLAIMS['CLM-89241']);
  const [claimError, setClaimError] = useState<string | null>(null);

  const handleClaimSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = claimSearchInput.trim().toUpperCase();

    if (SAMPLE_CLAIMS[query]) {
      setCurrentClaim(SAMPLE_CLAIMS[query]);
      setClaimError(null);
    } else {
      setClaimError(`Claim ID "${query}" not found. Try sample claims: CLM-89241, CLM-55102, or CLM-31994.`);
    }
  };

  const handleSelectSampleClaim = (id: string) => {
    setClaimSearchInput(id);
    if (SAMPLE_CLAIMS[id]) {
      setCurrentClaim(SAMPLE_CLAIMS[id]);
      setClaimError(null);
    }
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Proprietary Technology Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] leading-tight text-balance">
            Digital architecture engineered for zero-paper claims and radical transparency.
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            Our specialized technology stack eliminates administrative friction across the entire benefits ecosystem, connecting HR teams, hospitals, and policyholders on high-velocity digital rails.
          </p>
        </div>

        {/* 3 Products Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PRODUCTS_DATA.map((prod) => {
            const isSelected = selectedProductId === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProductId(prod.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#0B2545] shadow-lg ring-1 ring-[#0B2545]'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      {prod.badgeText}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {prod.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2545] tracking-tight mb-2">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prod.tagline}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {prod.capabilities.slice(0, 3).map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2545]">
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Feature: MAtrix Live Claims Simulator & Tech Showcase */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Screen on Left */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={techDashboardImg}
                  alt="MAtrix Claims Operations and Data Analytics Portal"
                  className="w-full h-[320px] sm:h-[380px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating metrics badge */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0B2545]">Algorithmic Fraud Interception</div>
                  <div className="text-[11px] text-slate-500">MAven Guard active pre-auth screening</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    &lt;45 min turnaround
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Simulator on Right */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-teal-700 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>INTERACTIVE LIVE DEMO</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    MAtrix Real-Time Clearinghouse Simulator
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B2545] tracking-tight">
                  MAtrix Live Claims Lifecycle Simulator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Experience real-time transparency. Inspect live cashless adjudication status, hospital communication notes, and approval vouchers as seen by employees and HR administrators.
                </p>
              </div>

              {/* Claim Search Bar */}
              <form onSubmit={handleClaimSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={claimSearchInput}
                    onChange={(e) => setClaimSearchInput(e.target.value)}
                    placeholder="Enter Claim ID (e.g. CLM-89241)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] focus:bg-white transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Track Status
                </button>
              </form>

              {/* Quick Sample Selector Buttons */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-500 text-[11px]">Try sample claims:</span>
                {Object.keys(SAMPLE_CLAIMS).map((id) => (
                  <button
                    key={id}
                    onClick={() => handleSelectSampleClaim(id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                      currentClaim.claimId === id
                        ? 'bg-[#0B2545] text-white font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>

              {claimError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {claimError}
                </div>
              )}

              {/* Claim Details Card */}
              {currentClaim && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0B2545]">
                          {currentClaim.claimId}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs font-medium text-slate-700">
                          {currentClaim.patientName}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{currentClaim.hospitalName} ({currentClaim.city})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-md bg-emerald-100 text-emerald-800">
                        {currentClaim.status}
                      </span>
                      <div className="text-[11px] font-mono text-slate-600 mt-1">
                        Sanctioned: ₹{currentClaim.approvedAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Step Progression Timeline */}
                  <div className="space-y-3">
                    {currentClaim.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {step.completed ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          ) : step.active ? (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center animate-pulse">
                              <Clock className="w-3 h-3" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                              <span className="text-[10px] font-mono">{idx + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-xs font-semibold ${step.completed || step.active ? 'text-[#0B2545]' : 'text-slate-400'}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200">
                    <span className="text-slate-500 text-[11px]">Policy: {currentClaim.policyNumber}</span>
                    <button
                      onClick={() => onOpenLogin('corporate')}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                    >
                      Open in Full MAtrix Suite →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
