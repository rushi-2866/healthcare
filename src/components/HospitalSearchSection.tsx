import React, { useState, useMemo } from 'react';
import { NETWORK_HOSPITALS } from '../data/mockData.ts';
import { Hospital } from '../types/index.ts';
import {
  Search,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle,
  Building,
  Filter,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';

interface HospitalSearchSectionProps {
  onSelectHospitalForPreAuth: (hospital: Hospital) => void;
}

export const HospitalSearchSection: React.FC<HospitalSearchSectionProps> = ({
  onSelectHospitalForPreAuth,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [onlyCashless, setOnlyCashless] = useState<boolean>(true);

  const cities = ['All', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const specialties = [
    'All',
    'Cardiology',
    'Oncology',
    'Orthopedics',
    'Neurology',
    'Pediatrics',
    'Robotic Surgery',
    'Multispeciality',
  ];

  const filteredHospitals = useMemo(() => {
    return NETWORK_HOSPITALS.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = selectedCity === 'All' || h.city === selectedCity;
      const matchesSpecialty =
        selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);
      const matchesCashless = !onlyCashless || h.isCashless;

      return matchesSearch && matchesCity && matchesSpecialty && matchesCashless;
    });
  }, [searchTerm, selectedCity, selectedSpecialty, onlyCashless]);

  return (
    <section id="hospitals" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Pan-India Provider Network
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Spring Boot REST: @GetMapping(&quot;/api/v1/hospitals/search&quot;)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] leading-tight">
              Search &amp; Locate Network Hospitals
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Access over 28,500+ cashless partner medical centers with guaranteed pre-authorization turnaround and standardized tariffs.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono">
            Showing <span className="font-bold text-[#0B2545]">{filteredHospitals.length}</span> of 28,500+ vetted providers
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by hospital name, locality, or keyword..."
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 transition-all"
              />
            </div>

            {/* City Select */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Cities' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Select */}
            <div className="lg:col-span-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 cursor-pointer"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Specialties' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Cashless Only Toggle */}
            <div className="lg:col-span-2 flex items-center justify-end sm:justify-start">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyCashless}
                  onChange={(e) => setOnlyCashless(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded-sm border-slate-300 focus:ring-teal-500"
                />
                <span>Cashless Only</span>
              </label>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200/80 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Quick Filter:</span>
            {['Bengaluru', 'Mumbai', 'Delhi NCR', 'Oncology', 'Cardiology'].map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  if (cities.includes(pill)) setSelectedCity(pill);
                  if (specialties.includes(pill)) setSelectedSpecialty(pill);
                }}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-colors text-[11px] cursor-pointer"
              >
                {pill}
              </button>
            ))}
            {(searchTerm || selectedCity !== 'All' || selectedSpecialty !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('All');
                  setSelectedSpecialty('All');
                }}
                className="ml-auto text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Hospital Cards Grid */}
        {filteredHospitals.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Building className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No network hospitals matched your filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting the city, specialty, or search keyword to find empaneled partner hospitals.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('All');
                setSelectedSpecialty('All');
              }}
              className="mt-4 px-4 py-2 bg-[#0B2545] text-white text-xs font-semibold rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Cashless Available
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {hospital.tier} Network
                    </span>
                  </div>

                  {/* Hospital Name */}
                  <h3 className="text-base font-bold text-[#0B2545] tracking-tight leading-snug">
                    {hospital.name}
                  </h3>

                  {/* Location & Address */}
                  <div className="flex items-start gap-2 mt-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      {hospital.address}, {hospital.city} - {hospital.pincode}
                    </span>
                  </div>

                  {/* Operational Metrics */}
                  <div className="mt-4 py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Avg Pre-Auth: <strong className="text-[#0B2545]">{hospital.preAuthAvgTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hospital.rating}</span>
                    </div>
                  </div>

                  {/* Specialties List */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {hospital.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium py-1.5 px-2 rounded-lg hover:bg-slate-50"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Call Desk</span>
                  </a>

                  <button
                    onClick={() => onSelectHospitalForPreAuth(hospital)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Intimate Admission</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
