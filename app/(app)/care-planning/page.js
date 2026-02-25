import React from 'react';
import { Accessibility, UserCheck, Activity, Utensils, Calendar, Users, FilePlus } from 'lucide-react';

const CarePlanning = () => {
  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4 mt-10">
      <Icon className="w-4 h-4 text-[#b8860b]" />
      <h3 className="text-[11px] font-bold text-[#b8860b] uppercase tracking-widest">{title}</h3>
    </div>
  );

  const SmallCard = ({ title, desc, icon: Icon, iconBg, iconColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 transition-hover hover:shadow-md cursor-pointer">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-gray-800">{title}</h4>
        <p className="text-[13px] text-gray-500">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f7f9] p-12 font-sans text-[#1e3a5a]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-2">
          <h1 className="text-[28px] font-bold mb-1">Care Planning & Lifestyle</h1>
          <p className="text-gray-500 text-sm">Multidisciplinary coordination and resident engagement.</p>
        </header>

        <SectionHeader icon={Accessibility} title="Allied Health & Mobility" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SmallCard title="Physio Referrals" desc="Submit reviews for falls, pain, or mobility changes." icon={FilePlus} iconBg="bg-[#e0f2fe]" iconColor="text-[#0ea5e9]" />
          <SmallCard title="Mobility Care Plans" desc="Transfer instructions and equipment requirements." icon={UserCheck} iconBg="bg-[#eee7ff]" iconColor="text-[#6366f1]" />
          <SmallCard title="Daily Exercise Log" desc="Track completion of prescribed rehab drills." icon={Activity} iconBg="bg-[#f0fdf4]" iconColor="text-[#22c55e]" />
        </div>

        <SectionHeader icon={Users} title="Holistic Wellbeing" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SmallCard title="Catering & Nutrition" desc="Manage IDDSI textures and dietary needs." icon={Utensils} iconBg="bg-[#fff7ed]" iconColor="text-[#f97316]" />
          <SmallCard title="Lifestyle Calendar" desc="Plan social events and facility activities." icon={Calendar} iconBg="bg-[#fdf2f8]" iconColor="text-[#ec4899]" />
          <SmallCard title="Engagement Tracker" desc="Record participation in social activities." icon={Users} iconBg="bg-[#f0fbff]" iconColor="text-[#0891b2]" />
        </div>

        <SectionHeader icon={FilePlus} title="Compliance & End of Life" />
        <div className="w-full">
          <SmallCard title="Advance Care Planning" desc="Document NFR orders and spiritual preferences." icon={FilePlus} iconBg="bg-[#fef2f2]" iconColor="text-[#ef4444]" />
        </div>

        <footer className="mt-16 text-center text-[11px] text-gray-400">
          © 2026 AusAge 360 | Person-Centred Care Excellence
        </footer>
      </div>
    </div>
  );
};
export default CarePlanning;