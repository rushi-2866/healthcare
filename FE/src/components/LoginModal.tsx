import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  initialRole?: 'member' | 'corporate' | 'hospital' | 'broker';
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  initialRole = 'member',
  onClose,
}) => {
  const [role, setRole] = useState<'member' | 'corporate' | 'hospital' | 'broker'>(initialRole);
  const [identifier, setIdentifier] = useState('EMP-84920');
  const [password, setPassword] = useState('••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let name = 'Rajesh Verma (Employee ID: HC-9481)';
    if (role === 'corporate') name = 'Pooja Iyer (HR Director, TechCorp Global)';
    if (role === 'hospital') name = 'Apollo Hospital TPA Desk (Staff ID: AP-402)';
    if (role === 'broker') name = 'Aon India Benefits Consulting';
    setLoggedInUser(name);
    setIsLoggedIn(true);
  };

  const resetForm = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-base">HealthCare Secure Portal</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Single Sign-On &amp; Role-Based Benefits Access
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Authentication Successful
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Welcome back, <strong className="text-[#0B2545]">{loggedInUser}</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Active Policy:</span>
                <span className="font-mono font-semibold text-slate-800">GMC-ICICI-2026-99214</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>E-Card Status:</span>
                <span className="font-semibold text-emerald-700">Validated · Active</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Sum Insured:</span>
                <span className="font-mono font-semibold text-slate-800">₹7,50,000</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-2.5 px-4 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Role Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setRole('member');
                  setIdentifier('EMP-84920');
                }}
                className={`py-2 px-1 text-[11px] font-semibold rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  role === 'member'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Member</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('corporate');
                  setIdentifier('hr.admin@techcorp.com');
                }}
                className={`py-2 px-1 text-[11px] font-semibold rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  role === 'corporate'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Corporate</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('hospital');
                  setIdentifier('HOSP-APOLLO-003');
                }}
                className={`py-2 px-1 text-[11px] font-semibold rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  role === 'hospital'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Hospital</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('broker');
                  setIdentifier('BROKER-AON-881');
                }}
                className={`py-2 px-1 text-[11px] font-semibold rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  role === 'broker'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Broker</span>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {role === 'member'
                    ? 'Health ID / Corporate Employee ID / Mobile'
                    : role === 'corporate'
                    ? 'Corporate Work Email'
                    : role === 'hospital'
                    ? 'Provider Empanelment ID / Rohini Code'
                    : 'Broker Partner Code'}
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Password / OTP PIN
                  </label>
                  <a href="#" className="text-[11px] text-teal-700 hover:underline">
                    Get OTP on Mobile
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                  <span>Remember session</span>
                </label>
                <a href="#" className="hover:underline text-slate-600">
                  Forgot credentials?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Lock className="w-3.5 h-3.5 text-teal-300" />
                <span>Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Desk</span>
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
              New employee? Consult your organization&apos;s HR benefits portal or click &quot;Register with Health ID&quot;.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
