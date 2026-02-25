import React from 'react';
import { Pill, FileText, AlertTriangle } from 'lucide-react';

const MedicationManagement = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col p-12 font-sans">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-[28px] font-bold text-[#1e3a5a] mb-2 tracking-tight">
            Medication Management
          </h1>
          <p className="text-gray-500 text-[15px]">
            Pharmacy integration and clinical administration.
          </p>
        </header>

        {/* Compliance Alert Box */}
        <div className="mb-10 flex items-center bg-[#fef2f2] border-l-4 border-[#f97316] p-4 rounded-r-md">
          <AlertTriangle className="w-5 h-5 text-[#f97316] mr-3 shrink-0" />
          <p className="text-[14px] text-gray-800">
            <span className="font-bold">Compliance Alert:</span> Ensure all PRN medications have a valid "Indication for Use" documented before signing.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Active Medication Charts */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center text-center transition-all hover:shadow-md cursor-pointer group">
            <div className="bg-[#fff7ed] p-5 rounded-full mb-6">
              <Pill className="w-8 h-8 text-[#f97316] fill-[#f97316]/10" />
            </div>
            <h2 className="text-[20px] font-bold text-[#1e3a5a] mb-3">
              Active Medication Charts
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed max-w-[340px]">
              Access NRMC drug administration records, sign for rounds, and manage PRN effectiveness logs.
            </p>
          </div>

          {/* Card 2: Pharmacy Refills */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center text-center transition-all hover:shadow-md cursor-pointer group">
            <div className="bg-[#f1f5f9] p-5 rounded-full mb-6">
              <FileText className="w-8 h-8 text-[#64748b]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#475569] mb-3">
              Pharmacy Refills
            </h2>
            <p className="text-gray-400 text-[14px] leading-relaxed max-w-[340px]">
              Direct communication with pharmacy for out-of-stock items and upcoming cycle changes.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-8 text-center">
        <p className="text-[11px] text-gray-400 font-medium tracking-wide">
          © 2026 AusAge 360 | NRMC Compliant Administration
        </p>
      </footer>
    </div>
  );
};

export default MedicationManagement;