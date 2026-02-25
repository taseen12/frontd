"use client";

import { useRouter } from "next/navigation";
import { FileEdit, UserRound, CloudUpload, FileSignature, Stethoscope } from 'lucide-react';
import { useAddClinicalInfoForm } from "@/hooks/clinicalInfo/useAddClinicalInfoForm";
import { getMobilityStatus, getCognitiveStatus, getDietaryStatus } from "@/services/configService";
import { useState, useEffect } from 'react';

export default function AdmissionNotes({ 
  onNext, 
  onPrevious, 
  onCancel,
  residentId 
}) {
  const router = useRouter();
  const [mobilityStatusOptions, setMobilityStatusOptions] = useState([]);
  const [cognitiveStatusOptions, setCognitiveStatusOptions] = useState([]);
  const [dietaryStatusOptions, setDietaryStatusOptions] = useState([]);
  const [loadingConfigs, setLoadingConfigs] = useState(false);
  
  const {
    formData,
    errors,
    isLoading,
    employees,
    handleChange,
    handleSelectChange,
    submitClinicalInfo
  } = useAddClinicalInfoForm(residentId);

  // Fetch config options on component mount
  useEffect(() => {
    const fetchConfigOptions = async () => {
      setLoadingConfigs(true);
      try {
        const [mobilityData, cognitiveData, dietaryData] = await Promise.all([
          getMobilityStatus(),
          getCognitiveStatus(),
          getDietaryStatus()
        ]);
        
        setMobilityStatusOptions(mobilityData.mobilitys || []);
        setCognitiveStatusOptions(cognitiveData.cognitives || []);
        setDietaryStatusOptions(dietaryData.dietarys || []);
      } catch (error) {
        console.error("Error fetching config options:", error);
      } finally {
        setLoadingConfigs(false);
      }
    };

    fetchConfigOptions();
  }, []);

  const handleNext = async () => {
    console.log("AdmissionNotes handleNext called");
    const success = await submitClinicalInfo();
    console.log("submitClinicalInfo returned:", success);
    if (success) {
      console.log("Calling onNext to navigate to lifestyle");
      onNext();
    } else {
      console.log("submitClinicalInfo failed, not calling onNext");
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#004a99]">Resident Admission & Clinical Intake</h1>
        <p className="text-xs text-gray-500 mt-1">
          Required for Care Planning
        </p>
      </div>

      <form className="space-y-8">
        {/* Section 1: Administrative Details */}
        

        {/* Section 1: Clinical Assessment & Admission Notes */}
        <section>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            {/* <UserRound size={16} className="text-[#004a99]" /> */}
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. Clinical Assessment & Admission Notes
            </h2>
          </div>
          
          {/* <div className="mb-4">
            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
              Required for Care Planning
            </span>
          </div> */}

          {/* First section: Mobility, Cognitive, Allergies, Dietary, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Mobility Status <span className="text-red-500">*</span></label>
              <select 
                name="mobilityStatus"
                value={formData.mobilityStatus}
                onChange={(e) => handleSelectChange('mobilityStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Level</option>
                {mobilityStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Cognitive Status (Dementia/Confusion)</label>
              <select 
                name="cognitiveStatus"
                value={formData.cognitiveStatus}
                onChange={(e) => handleSelectChange('cognitiveStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Status</option>
                {cognitiveStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Dietary Requirements / IDDSI Level</label>
              <select 
                name="dietaryRequirements"
                value={formData.dietaryRequirements}
                onChange={(e) => handleSelectChange('dietaryRequirements', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Dietary Requirements</option>
                {dietaryStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Assigned Staff</label>
              <select 
                name="assignedStaffId"
                value={formData.assignedStaffId}
                onChange={(e) => handleSelectChange('assignedStaffId', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Staff</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              {errors.assignedStaffId && <p className="text-red-500 text-xs mt-1">{errors.assignedStaffId}</p>}
            </div>
          </div>

          {/* Second section: Clinical Notes */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
              <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                2. Clinical Notes
              </h2>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-xs font-semibold mb-1">Critical Allergies</label>
              <textarea 
                name="criticalAllergies"
                value={formData.criticalAllergies}
                onChange={handleChange}
                placeholder="e.g. Penicillin, Peanuts, Shellfish"
                className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-gray-300 ${errors.criticalAllergies ? 'border-red-500' : ''}`}
              />
              {errors.criticalAllergies && <p className="text-red-500 text-xs mt-1">{errors.criticalAllergies}</p>}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1">Initial Clinical Observations & Admission Notes
</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter detailed clinical notes, observations, and recommendations..."
                  className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-gray-300 ${errors.notes ? 'border-red-500' : ''}`}
                />
                {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
              </div>
            </div>
          </div>

          {/* Third section: Physician Information */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
              {/* <Stethoscope className="text-[#004a99]" size={16} /> */}
              <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                3. Primary Physician Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1">Primary Physician Name</label>
                <input 
                  type="text" 
                  name="primaryPhysicianName"
                  value={formData.primaryPhysicianName}
                  onChange={handleChange}
                  placeholder="Dr. Smith" 
                  className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-gray-300 ${errors.primaryPhysicianName ? 'border-red-500' : ''}`}
                />
                {errors.primaryPhysicianName && <p className="text-red-500 text-xs mt-1">{errors.primaryPhysicianName}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1">Primary Physician Phone</label>
                <input 
                  type="tel" 
                  name="primaryPhysicianPhone"
                  value={formData.primaryPhysicianPhone}
                  onChange={handleChange}
                  placeholder="(03) 1234 5678" 
                  className={`border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.primaryPhysicianPhone ? 'border-red-500' : ''}`}
                />
                {errors.primaryPhysicianPhone && <p className="text-red-500 text-xs mt-1">{errors.primaryPhysicianPhone}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1">Primary Physician Email</label>
                <input 
                  type="email" 
                  name="primaryPhysicianEmail"
                  value={formData.primaryPhysicianEmail}
                  onChange={handleChange}
                  placeholder="doctor@clinic.com" 
                  className={`border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.primaryPhysicianEmail ? 'border-red-500' : ''}`}
                />
                {errors.primaryPhysicianEmail && <p className="text-red-500 text-xs mt-1">{errors.primaryPhysicianEmail}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1">Primary Physician Address</label>
                <input 
                  type="text" 
                  name="primaryPhysicianAddress"
                  value={formData.primaryPhysicianAddress}
                  onChange={handleChange}
                  placeholder="123 Clinic Street, Suburb, State, Postcode" 
                  className={`border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${errors.primaryPhysicianAddress ? 'border-red-500' : ''}`}
                />
                {errors.primaryPhysicianAddress && <p className="text-red-500 text-xs mt-1">{errors.primaryPhysicianAddress}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mt-6">
          Note: This information is collected in accordance with the Privacy Act 1988. Information will be stored securely and only shared with authorised clinical staff or My Aged Care as required by law.
        </p>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4 border-t pt-6">
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
            className="px-6 py-2 text-sm font-semibold bg-[#008a4e] text-white rounded hover:bg-[#006f3e] transition"
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}