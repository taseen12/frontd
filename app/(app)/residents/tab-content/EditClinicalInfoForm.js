"use client";

import React, { useState, useEffect } from 'react';
import { User, Stethoscope, Phone, Mail, MapPin, Calendar, Heart, BookOpen, Briefcase, Trophy, Church, Clock, Moon, Plus, X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEditClinicalInfoForm } from "@/hooks/clinicalInfo/useEditClinicalInfoForm";
import { getEmployees } from "@/services/employeeService";
import { getMobilityStatus, getCognitiveStatus, getDietaryStatus } from "@/services/configService";

export default function EditAdmissionNotesForm({ 
  formData, 
  errors, 
  handleChange, 
  handleSelectChange, 
  onNext, 
  onCancel,
  submitClinicalInfo,
  isLoading,
  employees
}) {
  const [mobilityStatusOptions, setMobilityStatusOptions] = useState([]);
  const [cognitiveStatusOptions, setCognitiveStatusOptions] = useState([]);
  const [dietaryStatusOptions, setDietaryStatusOptions] = useState([]);
  const [loadingConfigs, setLoadingConfigs] = useState(false);

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
    const success = await submitClinicalInfo();
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
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#004a99]">Edit Resident Admission & Clinical Intake</h1>
        <p className="text-xs text-gray-500 mt-1">
          Update Clinical Assessment & Admission Information
        </p>
      </div>

      <form className="space-y-8">
        {/* Clinical Information Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. Clinical Assessment & Admission Notes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Mobility Status</label>
              <select 
                name="mobilityStatus"
                value={formData.mobilityStatus || ""}
                onChange={(e) => handleSelectChange('mobilityStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Mobility Status</option>
                {mobilityStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Cognitive Status</label>
              <select 
                name="cognitiveStatus"
                value={formData.cognitiveStatus || ""}
                onChange={(e) => handleSelectChange('cognitiveStatus', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Cognitive Status</option>
                {cognitiveStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Dietary Requirements</label>
              <select 
                name="dietaryRequirement" // Fixed: Match the field name in formData
                value={formData.dietaryRequirement || ""}
                onChange={(e) => handleSelectChange('dietaryRequirement', e.target.value)}
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
                value={formData.assignedStaffId || ""}
                onChange={(e) => handleSelectChange('assignedStaffId', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="">Select Staff Member</option>
                {employees?.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Clinical Notes Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              2. Clinical Notes
            </h2>
          </div>
         
          <div className="grid grid-cols-1 gap-x-6 gap-y-4">
             <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Critical Allergies</label>
              <textarea 
                name="criticalAllergies"
                value={formData.criticalAllergies || ""}
                onChange={handleChange}
                placeholder="e.g. Penicillin, Peanuts, Shellfish"
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Initial Clinical Observations & Admission Notes</label>
              <textarea 
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                placeholder="Enter detailed clinical notes, observations, and recommendations..."
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </section>

        {/* Primary Physician Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              3. Primary Physician Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Physician Name</label>
              <input 
                type="text" 
                name="primaryPhysicianName"
                value={formData.primaryPhysicianName || ""}
                onChange={handleChange}
                placeholder="Dr. John Smith"
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Physician Phone</label>
              <input 
                type="tel" 
                name="primaryPhysicianPhone"
                value={formData.primaryPhysicianPhone || ""}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Physician Address</label>
              <input 
                type="text" 
                name="primaryPhysicianAddress"
                value={formData.primaryPhysicianAddress || ""}
                onChange={handleChange}
                placeholder="123 Medical Center Dr, City, State 12345"
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Physician Email</label>
              <input 
                type="email" 
                name="primaryPhysicianEmail"
                value={formData.primaryPhysicianEmail || ""}
                onChange={handleChange}
                placeholder="doctor@medicalcenter.com"
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
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
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-semibold rounded transition ${
                isLoading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-[#008a4e] text-white rounded hover:bg-[#006f3e]'
              }`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}