import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { MAVEN_SAMPLE_CONVERSATIONS } from '../data/mockData.ts';

interface MAvenChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHospitalSearch: () => void;
}

interface Message {
  id: string;
  sender: 'maven' | 'user';
  text: string;
  timestamp: string;
}

export const MAvenChatModal: React.FC<MAvenChatModalProps> = ({
  isOpen,
  onClose,
  onOpenHospitalSearch,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'maven',
      text: "Hello! I'm MAven, your HealthCare digital healthcare companion. How can I assist you today? You can ask me about cashless hospitalizations, claim status, E-Card downloads, or emergency helplines.",
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Provide intelligent contextual answer
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('cashless') || lower.includes('hospital')) {
        botResponse =
          "To get cashless admission: Present your HealthCare E-Card and Photo ID at the hospital's TPA / Insurance desk. The hospital initiates pre-authorization directly with us. Approvals are typically granted in under 30 minutes! You can also use our Search Hospitals tool to verify empaneled centers.";
      } else if (lower.includes('card') || lower.includes('e-card') || lower.includes('download')) {
        botResponse =
          "You can download your E-Card instantly by clicking 'Portal Login' at the top of the page, logging in with your Corporate Employee ID or Mobile Number, and selecting 'Download E-Card'. It is accepted at all 28,500+ network hospitals.";
      } else if (lower.includes('claim') || lower.includes('status') || lower.includes('track')) {
        botResponse =
          "You can track your claim in real-time in our Products section using the MAtrix Live Claim Tracker. Try searching with sample ID CLM-89241 or CLM-55102 to see the live step progression!";
      } else if (lower.includes('emergency') || lower.includes('help') || lower.includes('phone') || lower.includes('number')) {
        botResponse =
          "For immediate medical emergencies, call our 24x7 toll-free helpline at 1800-425-9449. For senior citizens, we have a dedicated priority desk at 1800-102-3455.";
      } else if (lower.includes('reimbursement') || lower.includes('document')) {
        botResponse =
          "For reimbursement claims at non-network hospitals, submit: 1. Final itemized hospital bill & payment receipts. 2. Discharge summary. 3. Doctor prescription & pharmacy invoices. 4. Diagnostic test reports. 5. Cancelled cheque for direct bank transfer.";
      } else {
        botResponse =
          "Thank you for contacting HealthCare! I can help you locate nearest network hospitals, guide you through cashless pre-authorization, or track existing claims. Would you like me to look up network hospitals in your city?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'maven',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                <span>MAven Digital Companion</span>
                <span className="text-[10px] bg-teal-500/30 text-teal-200 px-1.5 py-0.5 rounded font-mono">
                  Active
                </span>
              </div>
              <div className="text-[11px] text-slate-300">
                Official Virtual Health Assistant · HealthCare TPA
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'maven' && (
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0B2545] text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {m.text}
                <div
                  className={`text-[9px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 text-slate-500">
                MAven is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-400 shrink-0 font-medium px-1">Prompts:</span>
          {MAVEN_SAMPLE_CONVERSATIONS.slice(0, 3).map((item, i) => (
            <button
              key={i}
              onClick={() => handleSend(item.q)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap cursor-pointer transition-colors"
            >
              {item.q.length > 32 ? item.q.slice(0, 32) + '...' : item.q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about cashless admission, E-Cards, claims..."
              className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B2545] focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 bg-[#0B2545] hover:bg-[#134074] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Official TPA Information Desk</span>
            <button
              onClick={() => {
                onClose();
                onOpenHospitalSearch();
              }}
              className="text-teal-700 font-semibold hover:underline"
            >
              Open Hospital Network Directory →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
