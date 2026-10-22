import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { StatsBar } from './components/StatsBar.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { HospitalSearchSection } from './components/HospitalSearchSection.tsx';
import { HelplineBanner } from './components/HelplineBanner.tsx';
import { SubsidiariesSection } from './components/SubsidiariesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MAvenChatModal } from './components/MAvenChatModal.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { CashlessIntimationModal } from './components/CashlessIntimationModal.tsx';
import { Hospital } from './types/index.ts';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [mavenChatOpen, setMavenChatOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginInitialRole, setLoginInitialRole] = useState<'member' | 'corporate' | 'hospital' | 'broker'>('member');
  const [cashlessModalOpen, setCashlessModalOpen] = useState(false);
  const [selectedHospitalForPreAuth, setSelectedHospitalForPreAuth] = useState<Hospital | null>(null);

  const handleOpenHospitalSearch = () => {
    const el = document.getElementById('hospitals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLogin = (role?: 'member' | 'corporate' | 'hospital' | 'broker') => {
    if (role) setLoginInitialRole(role);
    setLoginModalOpen(true);
  };

  const handleSelectHospitalForPreAuth = (hospital: Hospital) => {
    setSelectedHospitalForPreAuth(hospital);
    setCashlessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B2545] antialiased">
      {/* Top Header */}
      <Header
        onOpenHospitalSearch={handleOpenHospitalSearch}
        onOpenLogin={handleOpenLogin}
        onOpenMavenChat={() => setMavenChatOpen(true)}
        onOpenCashlessModal={() => {
          setSelectedHospitalForPreAuth(null);
          setCashlessModalOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenHospitalSearch={handleOpenHospitalSearch}
          onOpenMavenChat={() => setMavenChatOpen(true)}
          onOpenCashlessModal={() => {
            setSelectedHospitalForPreAuth(null);
            setCashlessModalOpen(true);
          }}
          onOpenLogin={handleOpenLogin}
        />

        {/* Footprint & Statistics Counter Bar */}
        <StatsBar />

        {/* Core Expertise / Services */}
        <ServicesSection
          onOpenCashlessModal={() => {
            setSelectedHospitalForPreAuth(null);
            setCashlessModalOpen(true);
          }}
          onOpenMavenChat={() => setMavenChatOpen(true)}
        />

        {/* Products & Technology Suite with Live Claims Tracker */}
        <ProductsSection onOpenLogin={handleOpenLogin} />

        {/* Hospital Network Search Filter Section */}
        <HospitalSearchSection
          onSelectHospitalForPreAuth={handleSelectHospitalForPreAuth}
        />

        {/* Quick Helpline & WhatsApp Integration Banner */}
        <HelplineBanner onOpenMavenChat={() => setMavenChatOpen(true)} />

        {/* Subsidiaries & Ecosystem */}
        <SubsidiariesSection />

        {/* About & Corporate Governance */}
        <AboutSection />

        {/* Contact Us & Inquiries */}
        <ContactSection />
      </main>

      {/* Multi-Column Footer */}
      <Footer
        onOpenHospitalSearch={handleOpenHospitalSearch}
        onOpenLogin={handleOpenLogin}
        onOpenMavenChat={() => setMavenChatOpen(true)}
      />

      {/* Floating Action Button: Quick MAven Healthcare Assistant */}
      <button
        onClick={() => setMavenChatOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 bg-[#0B2545] hover:bg-[#134074] text-white rounded-full shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer group"
        aria-label="Open MAven Assistant"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-teal-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0B2545]" />
        </div>
        <span className="text-xs font-bold tracking-tight">Ask MAven</span>
      </button>

      {/* Modals */}
      <MAvenChatModal
        isOpen={mavenChatOpen}
        onClose={() => setMavenChatOpen(false)}
        onOpenHospitalSearch={handleOpenHospitalSearch}
      />

      <LoginModal
        isOpen={loginModalOpen}
        initialRole={loginInitialRole}
        onClose={() => setLoginModalOpen(false)}
      />

      <CashlessIntimationModal
        isOpen={cashlessModalOpen}
        selectedHospital={selectedHospitalForPreAuth}
        onClose={() => setCashlessModalOpen(false)}
      />
    </div>
  );
}
