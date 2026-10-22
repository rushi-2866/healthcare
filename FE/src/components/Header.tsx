import React, { useState } from 'react';
import {
  Shield,
  Phone,
  MessageCircle,
  Search,
  User,
  Building2,
  Stethoscope,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  HeartHandshake,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  onOpenHospitalSearch: () => void;
  onOpenLogin: (role?: 'member' | 'corporate' | 'hospital' | 'broker') => void;
  onOpenMavenChat: () => void;
  onOpenCashlessModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHospitalSearch,
  onOpenLogin,
  onOpenMavenChat,
  onOpenCashlessModal,
}) => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Utility Bar - Helpline & WhatsApp */}
      <div className="bg-[#0B2545] text-slate-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>24x7 Emergency:</span>
              <a href="tel:18004259449" className="text-white hover:text-teal-300 transition-colors font-mono font-semibold">
                1800-425-9449
              </a>
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-400" />
              <span>Senior Citizen Priority Desk:</span>
              <a href="tel:18001023455" className="text-white hover:text-teal-300 transition-colors font-mono font-semibold">
                1800-102-3455
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenMavenChat}
              className="flex items-center gap-1 text-teal-300 hover:text-white transition-colors cursor-pointer"
              title="Chat with MAven Assistant"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="font-medium">WhatsApp / MAven Help</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={onOpenCashlessModal}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:inline-block"
            >
              Planned Admission Intimation
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-[#0B2545] text-teal-400 flex items-center justify-center shadow-xs group-hover:bg-[#134074] transition-colors">
              <Shield className="w-5 h-5 fill-teal-400/20 stroke-teal-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0B2545] leading-none">
                Health<span className="text-teal-600">Care</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-medium mt-0.5">
                TPA & Benefits Admin
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-slate-700">
            {/* Services Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#services"
                className="flex items-center gap-1 hover:text-[#134074] transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:rotate-180" />
              </a>

              {activeDropdown === 'services' && (
                <div className="absolute top-14 left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2.5 animate-in fade-in slide-in-from-top-1 z-50">
                  <a
                    href="#services"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">Benefits Administration</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Optimized cashless claims & policy management</div>
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">International Private Medical Insurance (IPMI)</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Comprehensive coverage across 140+ countries</div>
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">Self-Funded Health Plans</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Corporate health trusts & actuarial containment</div>
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">Medical Value Travel</div>
                    <div className="text-[11px] text-slate-500 leading-tight">High-acuity cross-border surgical concierge</div>
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    <div className="text-xs font-semibold text-slate-900">Borderless Network</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Direct clearinghouse across 28,500+ hospital nodes</div>
                  </a>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#products"
                className="flex items-center gap-1 hover:text-[#134074] transition-colors cursor-pointer"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:rotate-180" />
              </a>

              {activeDropdown === 'products' && (
                <div className="absolute top-14 left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2.5 animate-in fade-in slide-in-from-top-1 z-50">
                  <a
                    href="#products"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">MAtrix Claims OS</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Enterprise benefits dashboard & tracking</div>
                  </a>
                  <a
                    href="#products"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-slate-900">MAven Guard</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Automated forensic billing & medical audit</div>
                  </a>
                  <a
                    href="#products"
                    className="block px-4 py-2.5 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    <div className="text-xs font-semibold text-slate-900">Digital Member Desk</div>
                    <div className="text-[11px] text-slate-500 leading-tight">Mobile app, instant E-Card, teleconsults</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#stats" className="hover:text-[#134074] transition-colors whitespace-nowrap">
              Footprint
            </a>

            <a href="#hospitals" className="hover:text-[#134074] transition-colors whitespace-nowrap">
              Network
            </a>

            <a href="#subsidiaries" className="hover:text-[#134074] transition-colors whitespace-nowrap">
              Subsidiaries
            </a>

            <a href="#about" className="hover:text-[#134074] transition-colors whitespace-nowrap">
              About Us
            </a>

            <a href="#contact" className="hover:text-[#134074] transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Action Elements */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Network Hospitals Button */}
            <button
              onClick={onOpenHospitalSearch}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0B2545] bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-teal-700" />
              <span>Search Network Hospitals</span>
            </button>

            {/* Portal Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#134074] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-teal-300" />
                <span>Portal Login</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {loginDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLoginDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Select Portal
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        onOpenLogin('member');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="p-1.5 rounded-md bg-blue-50 text-blue-700">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Member / Beneficiary</div>
                        <div className="text-[11px] text-slate-500">Track claim, download e-card</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        onOpenLogin('corporate');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-700">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Corporate HR & Admin</div>
                        <div className="text-[11px] text-slate-500">MAtrix dashboard & utilization</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        onOpenLogin('hospital');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="p-1.5 rounded-md bg-teal-50 text-teal-700">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Hospital Partner Desk</div>
                        <div className="text-[11px] text-slate-500">Cashless pre-auth submissions</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        onOpenLogin('broker');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center gap-3 transition-colors cursor-pointer border-t border-slate-100"
                    >
                      <div className="p-1.5 rounded-md bg-amber-50 text-amber-700">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Broker & Insurer Partner</div>
                        <div className="text-[11px] text-slate-500">Portfolio analytics & reports</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onOpenLogin('member')}
              className="p-2 text-slate-700 hover:text-slate-900"
              title="Portal Login"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHospitalSearch();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Hospitals</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin('member');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0B2545] text-white text-xs font-semibold"
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Login</span>
            </button>
          </div>

          <div className="space-y-1 text-sm font-medium text-slate-700 border-t border-slate-100 pt-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Services (Benefits Admin, IPMI, Self-Funded)
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Products (MAtrix & MAven Guard)
            </a>
            <a
              href="#hospitals"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Hospital Network (28,500+)
            </a>
            <a
              href="#stats"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Footprint & Reach
            </a>
            <a
              href="#subsidiaries"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Subsidiaries & Governance
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Contact & Helplines
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMavenChat();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900"
            >
              <span className="font-semibold">Ask MAven Healthcare Assistant</span>
              <span className="text-[11px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-medium">Chat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
