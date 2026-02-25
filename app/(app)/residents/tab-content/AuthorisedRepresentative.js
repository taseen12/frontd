"use client";

import { useRouter } from "next/navigation";
import { useAddAuthorisedRepresentativeForm } from "@/hooks/authorisedRepresentive/useAddAuthorisedRepresentiveForm";

export default function AuthorisedRepresentative({ 
  onNext, 
  onPrevious,
  onCancel,
  residentId
}) {
  const router = useRouter();
  
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSelectChange,
    submitAuthorisedRepresentativeData
  } = useAddAuthorisedRepresentativeForm(residentId);

  const handleNext = async () => {
    const success = await submitAuthorisedRepresentativeData();
    if (success) {
      onNext();
    }
  };


  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#004a99]">Authorised Representative Information</h1>
        <p className="text-xs text-gray-500 mt-1">
          Person Responsible for Resident/Guest
        </p>
      </div>

      <form className="space-y-8">
        {/* Authorised Representative Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. Authorised Representative (Person Responsible)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Representative Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.fullName ? 'border-red-500' : ''}`} 
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Relationship to Guest</label>
              <input 
                type="text" 
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="e.g. Daughter, Spouse, Legal Guardian" 
                className="border border-gray-300 rounded px-3 py-2 text-sm italic placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Phone</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.phone ? 'border-red-500' : ''}`} 
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="representative@example.com" 
                className={`border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.email ? 'border-red-500' : ''}`} 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Legal Authority Status</label>
              <select 
                name="legalAuthorityStatus"
                value={formData.legalAuthorityStatus}
                onChange={(e) => handleSelectChange('legalAuthorityStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Emergency Contact Only</option>
                <option value="Power of Attorney">Power of Attorney</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mt-6">
          Note: This information is collected in accordance with Privacy Act 1988. Information will be stored securely and only shared with authorised clinical staff or My Aged Care as required by law.
        </p>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4 border-t pt-6">
          <div className="flex space-x-4">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-6 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-semibold bg-[#008a4e] text-white rounded hover:bg-[#006f3e] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save & Continue'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
