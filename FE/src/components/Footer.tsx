import React from 'react';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldAlert,
  HeartHandshake,
} from 'lucide-react';

interface FooterProps {
  onOpenHospitalSearch: () => void;
  onOpenLogin: (role?: 'member' | 'corporate' | 'hospital' | 'broker') => void;
  onOpenMavenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHospitalSearch,
  onOpenLogin,
  onOpenMavenChat,
}) => {
  return (
    <footer className="bg-[#07192F] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Outbound Verification Advisory Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B2545]/80 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white text-xs">
                Official Outbound Verification &amp; Security Advisory
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                HealthCare representatives will ONLY initiate contact via verified email addresses ending in <strong className="text-teal-300">@healthcare-tpa.com</strong> and official telecom SMS sender IDs. We never solicit banking OTPs, debit card CVVs, or fee payments for cashless admission approval.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="text-[11px] font-semibold text-teal-300 hover:text-white whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            Report Suspicious Contact
          </a>
        </div>

        {/* Multi-Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Shield className="w-4 h-4 fill-white/20 stroke-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Health<span className="text-teal-400">Care</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              HealthCare Healthcare Services Ltd. is a pioneer in digital health benefits administration, powering cashless hospitalization for millions worldwide.
            </p>
            <div className="text-[11px] text-slate-400 font-mono space-y-1">
              <div>IRDAI Reg. No: <strong>003</strong></div>
              <div>CIN: U85110KA2002PLC030948</div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Services
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Benefits Administration
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  International Private Medical (IPMI)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Self-Funded Health Plans
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Medical Value Travel
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Borderless Provider Network
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenHospitalSearch}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  Cashless Provider Search
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Products & Technology */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Products &amp; Tech
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a href="#products" className="hover:text-teal-300 transition-colors">
                  MAtrix Claims OS
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-teal-300 transition-colors">
                  MAven Guard Forensic Audit
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('member')}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  Digital Member Desk &amp; E-Card
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('corporate')}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  Corporate HR Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('hospital')}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  Hospital Pre-Auth Gateway
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMavenChat}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  MAven WhatsApp Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Subsidiaries */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Group Subsidiaries
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a href="#subsidiaries" className="hover:text-teal-300 transition-colors">
                  HealthCare Insurance Broking
                </a>
              </li>
              <li>
                <a href="#subsidiaries" className="hover:text-teal-300 transition-colors">
                  HealthCare Global (UK &amp; DIFC)
                </a>
              </li>
              <li>
                <a href="#subsidiaries" className="hover:text-teal-300 transition-colors">
                  Mayfair We Care Ltd.
                </a>
              </li>
              <li>
                <a href="#subsidiaries" className="hover:text-teal-300 transition-colors">
                  IHX Technologies Ltd.
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Compliance */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Governance
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  IRDAI Public Disclosures
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  Grievance Redressal Policy
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  Insurance Ombudsman Details
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  Whistleblower Mechanism
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  Senior Citizen Citizen Charter
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  Privacy Policy &amp; Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 HealthCare Healthcare Services Ltd. All Rights Reserved. Third Party Administrator - Health Insurance.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Terms of Use
            </a>
            <span>·</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Public Disclosures
            </a>
            <span>·</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">
              Corporate Office
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
