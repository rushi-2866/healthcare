import React from 'react';
import {
  Building2,
  Globe2,
  Stethoscope,
  Cpu,
  ShieldCheck,
  Award,
  Users2,
  FileCheck,
} from 'lucide-react';

export const SubsidiariesSection: React.FC = () => {
  const subsidiaries = [
    {
      name: 'HealthCare Insurance Broking Pvt. Ltd.',
      jurisdiction: 'India (IRDAI Broking Lic. #482)',
      role: 'Corporate Benefits Advisory',
      description:
        'Strategic group health, term life, and executive risk advisory servicing 1,200+ multinational and domestic enterprises.',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
    {
      name: 'HealthCare Global Ltd.',
      jurisdiction: 'United Kingdom & UAE (DIFC)',
      role: 'IPMI & Cross-Border Concierge',
      description:
        'International health insurance administration and global medical concierge providing borderless healthcare across EMEA and APAC.',
      icon: <Globe2 className="w-5 h-5 text-teal-600" />,
    },
    {
      name: 'Mayfair We Care Ltd.',
      jurisdiction: 'United Kingdom & Europe',
      role: 'International Claims & Evacuations',
      description:
        'Specialized overseas claims management, 24/7 air ambulance evacuation, and worldwide medical provider relationship governance.',
      icon: <Stethoscope className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: 'IHX Technologies Ltd.',
      jurisdiction: 'Health-Tech Innovation Center',
      role: 'Data Interoperability & FHIR Rails',
      description:
        'Proprietary clearinghouse infrastructure connecting hospital management systems (HIS) directly with insurers for paperless data exchange.',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="subsidiaries" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Group Ecosystem &amp; Subsidiaries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] leading-tight">
            Integrated healthcare services network across domestic &amp; global borders.
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            Operating specialized subsidiaries to deliver end-to-end benefits consulting, cross-border health operations, and high-velocity digital clearinghouse technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {subsidiaries.map((sub, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {sub.icon}
                </div>
                <div className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">
                  {sub.role}
                </div>
                <h3 className="text-base font-bold text-[#0B2545] tracking-tight mt-1 mb-2">
                  {sub.name}
                </h3>
                <div className="text-[10px] font-mono text-slate-400 mb-3">
                  {sub.jurisdiction}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sub.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Governance & Certifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Regulatory Standards
              </span>
              <h3 className="text-xl font-bold text-[#0B2545] tracking-tight">
                Governance, Security &amp; Compliance Benchmarks
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Operating with institutional diligence under the direct regulatory oversight of insurance authorities.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">IRDAI TPA Lic. #003</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Continuous licensing compliance with annual statutory disclosures.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Award className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">ISO 27001 &amp; SOC-2</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Enterprise bank-grade encryption for all member protected health info (PHI).</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">NABH Guidelines</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Strict adherence to clinical quality protocols across empaneled hospitals.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
