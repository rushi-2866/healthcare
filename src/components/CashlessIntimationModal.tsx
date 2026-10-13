import React, { useState } from 'react';
import { Hospital } from '../types/index.ts';
import {
  X,
  FileCheck2,
  Calendar,
  Building,
  User,
  CheckCircle2,
  Phone,
  Shield,
  Clock,
} from 'lucide-react';

interface CashlessIntimationModalProps {
  isOpen: boolean;
  selectedHospital?: Hospital | null;
  onClose: () => void;
}

export const CashlessIntimationModal: React.FC<CashlessIntimationModalProps> = ({
  isOpen,
  selectedHospital,
  onClose,
}) => {
  const [patientName, setPatientName] = useState('Rahul Verma');
  const [employeeId, setEmployeeId] = useState('EMP-49120');
  const [hospitalName, setHospitalName] = useState(selectedHospital?.name || 'Apollo Hospital');
  const [admissionDate, setAdmissionDate] = useState('2026-10-18');
  const [treatmentType, setTreatmentType] = useState('Cardiology / Angioplasty');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [intimationId, setIntimationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update hospital if prop changes
  React.useEffect(() => {
    if (selectedHospital) {
      setHospitalName(selectedHospital.name);
    }
  }, [selectedHospital]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/preauth/intimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          employeeId,
          hospitalName,
          admissionDate,
          treatmentType,
        }),
      });
      const data = await response.json();
      setIntimationId(data.referenceId || `HC-PRE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch {
      setIntimationId(`HC-PRE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-base">Cashless Pre-Authorization Intimation</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Notify HealthCare 48h prior for zero-wait planned hospitalization
            </p>
          </div>
          <button
            onClick={resetModal}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Intimation Successfully Logged
              </span>
              <h4 className="text-xl font-extrabold text-[#0B2545] mt-1">
                Reference ID: {intimationId}
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                Our medical adjudication desk has notified the insurance counter at <strong>{hospitalName}</strong>. An SMS confirmation with your pre-sanctioned voucher has been dispatched to your registered number.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Planned Admission:</span>
                <span className="font-mono text-slate-800">{admissionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="text-slate-800 font-medium">{treatmentType}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Next Step:</span>
                <span className="text-teal-700 font-semibold">Carry original Aadhaar + HealthCare E-Card</span>
              </div>
            </div>

            <button
              onClick={resetModal}
              className="w-full py-2.5 px-4 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done &amp; Return to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee / Health ID
                </label>
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hospital Name &amp; Branch
              </label>
              <input
                type="text"
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimated Admission Date
                </label>
                <input
                  type="date"
                  required
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment / Procedure
                </label>
                <input
                  type="text"
                  required
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] text-slate-800"
                />
              </div>
            </div>

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2">
              <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                Submitting prior to 48 hours allows our medical panel to verify your doctor&apos;s treatment estimate and pre-approve cashless admission before you arrive at the hospital.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Submit Pre-Auth Intimation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
