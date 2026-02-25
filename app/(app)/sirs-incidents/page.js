import { AlertCircle, Search, BrainCircuit, Pill, ShieldCheck } from 'lucide-react';

const SirsIncidents = () => {
  const cards = [
    { title: "SIRS Register", desc: "Log and track all mandatory reporting events and Priority 1 triggers.", icon: AlertCircle, bg: "bg-[#fef2f2]", color: "text-[#ef4444]" },
    { title: "New Investigation", desc: "Initiate root cause analysis (RCA) and preventive action planning.", icon: Search, bg: "bg-[#f5f3ff]", color: "text-[#8b5cf6]" },
    { title: "AI Discovery Lab", desc: "Analyze historical patterns to predict and prevent future incidents.", icon: BrainCircuit, bg: "bg-[#f5f3ff]", color: "text-[#8b5cf6]" },
    { title: "Medication Incidents", desc: "Immediate reporting for pharmacy errors or administration gaps.", icon: Pill, bg: "bg-[#fef2f2]", color: "text-[#ef4444]" },
    { title: "Quality Indicators", desc: "Monthly clinical indicator summaries and governance audits.", icon: ShieldCheck, bg: "bg-[#f0fdf4]", color: "text-[#22c55e]" },
  ];

  return (
    <div className="bg-[#f8fafc] p-12 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-[#1e3a5a] text-2xl font-bold mb-2">SIRS & Governance Hub</h1>
          <p className="text-gray-500 text-sm">Mandatory reporting, clinical indicators, and incident management.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mb-6`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-[#1e3a5a] text-[15px] font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-[12px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            © 2026 AusAge 360 | Secure Governance Portal
          </p>
        </footer>
      </div>
    </div>
  );
};
export default SirsIncidents;