import React from 'react';
import { STATS_DATA } from '../data/mockData.ts';

export const StatsBar: React.FC = () => {
  return (
    <section id="stats" className="py-12 lg:py-16 bg-[#0B2545] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-700/70">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              National &amp; Global Footprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Scale that powers millions of seamless healthcare journeys.
            </h2>
          </div>
          <div className="text-xs text-slate-300 max-w-sm">
            Audited operational benchmarks across public and private sector health insurance schemes.
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {STATS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`space-y-2 ${
                idx !== STATS_DATA.length - 1 ? 'lg:border-r lg:border-slate-800 lg:pr-6' : ''
              }`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-teal-300">
                {item.label}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
