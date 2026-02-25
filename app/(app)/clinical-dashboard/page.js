import React from 'react';
import { LineChart, Bandage } from 'lucide-react';

const ClinicalDashboard = () => {
  const cards = [
    {
      title: "Clinical Dashboard",
      description: "Monitor SIRS triggers, high-risk fallers, and medication administration gaps across the facility.",
      icon: <LineChart className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-50",
      badge: "3 Alerts"
    },
    {
      title: "Wound Care Management",
      description: "Track wound staging, dressing change frequencies, and healing progress with photographic evidence.",
      icon: <Bandage className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col p-8 font-sans">
      {/* Header Section */}
      <div className="mb-10 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-[#1e3a5a] mb-2">Clinical Oversight</h1>
        <p className="text-gray-500 text-sm">Real-time health monitoring and clinical interventions.</p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Icon Box */}
            <div className={`${card.iconBg} p-4 rounded-xl mb-6`}>
              {card.icon}
            </div>

            {/* Title & Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-gray-800">{card.title}</h2>
              {card.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {card.badge}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-12 text-center">
        <p className="text-[11px] text-gray-400 uppercase tracking-tight">
          © 2026 AusAge 360 | Clinical Governance Standard v4.2
        </p>
      </footer>
    </div>
  );
};

export default ClinicalDashboard;