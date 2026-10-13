import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Headphones,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: 'Corporate Employee Benefits',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                Connect With Us
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0B2545]">
                Get in Touch with our Health Benefits Specialists
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Whether you represent an enterprise exploring custom self-funded plans, an insurance carrier, or a provider hospital seeking empanelment, our leadership team is ready to assist.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <Building className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">Corporate Headquarters</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    HealthCare Tower, 4th Floor, IBC Knowledge Park, Bannerghatta Main Road, Bengaluru, Karnataka 560029, India
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <Headphones className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">Dedicated Helplines</div>
                  <div className="text-xs text-slate-600 mt-0.5 space-y-0.5">
                    <div>General Customer Care: <strong>1800-425-9449</strong> (Toll Free)</div>
                    <div>Senior Citizen Desk: <strong>1800-102-3455</strong></div>
                    <div>Corporate HR Helpdesk: <strong>+91 (080) 4122 8900</strong></div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">Email Communication</div>
                  <div className="text-xs text-slate-600 mt-0.5 space-y-0.5">
                    <div>Claims Query: <strong>claims@healthcare-tpa.com</strong></div>
                    <div>Corporate RFPs: <strong>corporate.sales@healthcare-tpa.com</strong></div>
                    <div>Provider Empanelment: <strong>network@healthcare-tpa.com</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2545]">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A dedicated healthcare relationship manager has been assigned and will connect with your team within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      organization: '',
                      category: 'Corporate Employee Benefits',
                      message: '',
                    });
                  }}
                  className="px-4 py-2 bg-[#0B2545] text-white text-xs font-semibold rounded-lg hover:bg-[#134074]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[#0B2545] tracking-tight">
                  Request Information or Corporate Proposal
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Iyer"
                      className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Organization Name"
                      className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Area of Interest
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                  >
                    <option value="Corporate Employee Benefits">Corporate Health Benefits Administration</option>
                    <option value="International Private Medical Insurance">International Private Medical Insurance (IPMI)</option>
                    <option value="Self-Funded Plan Design">Self-Funded Health Plans &amp; Reinsurance Stop-Loss</option>
                    <option value="Medical Value Travel">Medical Value Travel Concierge</option>
                    <option value="Hospital Empanelment">Hospital Provider Network Empanelment</option>
                    <option value="Individual Claim Query">Individual Claim Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Specifications
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your workforce size, coverage requirements, or specific question..."
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-teal-300" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
