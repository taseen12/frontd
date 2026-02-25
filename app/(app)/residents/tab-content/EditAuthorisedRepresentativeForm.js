"use client";

export default function EditAuthorisedRepresentativeForm({ 
  formData, 
  errors, 
  handleChange, 
  handleSelectChange, 
  onNext, 
  onCancel,
  submitAuthorisedRepresentativeData,
  isLoading
}) {
  const handleNext = async () => {
    const success = await submitAuthorisedRepresentativeData();
    if (success) {
      // Don't call onNext - just let the parent handle the state change
      // This will keep us on the same page and show updated data
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#004a99]">Edit Authorised Representative Information</h1>
        <p className="text-xs text-gray-500 mt-1">
          Update Person Responsible for Resident/Guest
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
              <label className="text-xs font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="representiveFullName"
                value={formData.representiveFullName}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.representiveFullName ? 'border-red-500' : ''}`}
              />
              {errors.representiveFullName && <p className="text-red-500 text-xs mt-1">{errors.representiveFullName}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Relationship to Resident <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="relationshipToResident"
                value={formData.relationshipToResident}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.relationshipToResident ? 'border-red-500' : ''}`}
              />
              {errors.relationshipToResident && <p className="text-red-500 text-xs mt-1">{errors.relationshipToResident}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="representivePhone"
                value={formData.representivePhone}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.representivePhone ? 'border-red-500' : ''}`}
              />
              {errors.representivePhone && <p className="text-red-500 text-xs mt-1">{errors.representivePhone}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Email Address</label>
              <input 
                type="email" 
                name="representiveEmail"
                value={formData.representiveEmail}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.representiveEmail ? 'border-red-500' : ''}`}
              />
              {errors.representiveEmail && <p className="text-red-500 text-xs mt-1">{errors.representiveEmail}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Legal Authority Status</label>
              <select 
                name="legalAuthorityStatus"
                value={formData.legalAuthorityStatus}
                onChange={(e) => handleSelectChange('legalAuthorityStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Legal Authority Status</option>
                <option value="Full Guardian">Full Guardian</option>
                <option value="Partial Guardian">Partial Guardian</option>
                <option value="Power of Attorney">Power of Attorney</option>
                <option value="Next of Kin">Next of Kin</option>
                <option value="Carer">Carer</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`px-4 py-2 text-sm font-semibold rounded transition ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-[#008a4e] text-white rounded hover:bg-[#006f3e]'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
