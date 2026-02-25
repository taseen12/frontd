"use client";

export default function EditResidentForm({ 
  formData, 
  errors, 
  handleChange, 
  handleSelectChange, 
  onNext, 
  onCancel,
  submitResidentData,
  isLoading,
  rooms,
  groups,
  indigenousStatus,
  loadingIndigenousStatus
}) {
  const handleNext = async () => {
    const success = await submitResidentData();
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
        <h1 className="text-2xl font-bold text-[#004a99]">Edit Resident/Guest Information</h1>
        <p className="text-xs text-gray-500 mt-1">
          Update Resident Basic Information
        </p>
      </div>

      <form className="space-y-8">
        {/* Section 1: Personal Identity */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. Personal Identity
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.first_name ? 'border-red-500' : ''}`}
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Surname</label>
              <input 
                type="text" 
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.surname ? 'border-red-500' : ''}`}
              />
              {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Date of Birth</label>
              <input 
                type="date" 
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.date_of_birth ? 'border-red-500' : ''}`}
              />
              {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Gender</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={(e) => handleSelectChange('gender', e.target.value)}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.gender ? 'border-red-500' : ''}`}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Identity</label>
              <select 
                name="identity"
                value={formData.identity}
                onChange={(e) => handleSelectChange('identity', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                disabled={loadingIndigenousStatus}
              >
                <option value="">Select Indigenous Status</option>
                {loadingIndigenousStatus ? (
                  <option value="" disabled>Loading...</option>
                ) : (
                  indigenousStatus && indigenousStatus.length > 0 ? (
                    indigenousStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No options available</option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Preferred Language</label>
              <input 
                type="text" 
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="e.g. English, Italian, Greek" 
                className="border border-gray-300 rounded px-3 py-2 text-sm italic placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Room</label>
              <select 
                name="room_id"
                value={formData.room_id}
                onChange={(e) => handleSelectChange('room_id', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Room</option>
                {rooms?.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name || room.roomNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Group</label>
              <select 
                name="group_id"
                value={formData.group_id}
                onChange={(e) => handleSelectChange('group_id', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Group</option>
                {groups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Section 2: Government & Healthcare Identifiers */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              2. Government & Healthcare Identifiers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Medicare Number (10 digits)</label>
              <input 
                type="text" 
                name="medicare_number"
                value={formData.medicare_number}
                onChange={handleChange}
                placeholder="0000 00000 0" 
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.medicare_number ? 'border-red-500' : ''}`} 
              />
              {errors.medicare_number && <p className="text-red-500 text-xs mt-1">{errors.medicare_number}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Centrelink CRN</label>
              <input 
                type="text" 
                name="centrelink_crn"
                value={formData.centrelink_crn}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.centrelink_crn ? 'border-red-500' : ''}`} 
              />
              {errors.centrelink_crn && <p className="text-red-500 text-xs mt-1">{errors.centrelink_crn}</p>}
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
