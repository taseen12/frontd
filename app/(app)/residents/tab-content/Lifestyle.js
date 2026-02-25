"use client";

import React from 'react';
import { Heart, Calendar, BookOpen, Briefcase, Trophy, Church, Clock, Moon, Plus, X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAddLifestyleForm } from "@/hooks/lifestyle/useAddLifestyleForm";

export default function Lifestyle({ 
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
    availableHobbies,
    handleChange,
    handleSelectChange,
    handleHobbyToggle,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    submitLifestyleInfo
  } = useAddLifestyleForm(residentId);

  const handleNext = async () => {
    const success = await submitLifestyleInfo();
    if (success) {
      if (typeof onNext === 'function') {
        onNext();
      } else {
        console.warn('onNext prop is not a function or not provided');
      }
    } else {
      console.error('Failed to submit lifestyle info');
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      console.warn('onCancel prop is not a function or not provided');
    }
  };

  const handlePrevious = () => {
    if (typeof onPrevious === 'function') {
      onPrevious();
    } else {
      console.warn('onPrevious prop is not a function or not provided');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#004a99]">Resident Lifestyle & Personal History</h1>
        <p className="text-xs text-gray-500 mt-1">
          Understanding the resident's background for personalized care
        </p>
      </div>

      <form className="space-y-8">
        {/* Section 1: Personal Background */}
        <section>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            {/* <Heart className="text-[#004a99]" size={16} /> */}
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. My Life Story
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <Heart size={14} /> Place of Birth <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="City, Country" 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <BookOpen size={14} /> Childhood Information
              </label>
              <input 
                type="text" 
                name="childhoodInfo"
                value={formData.childhoodInfo}
                onChange={handleChange}
                placeholder="Memorable childhood experiences, family background..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <BookOpen size={14} /> Education Information
              </label>
              <input 
                type="text" 
                name="educationInfo"
                value={formData.educationInfo}
                onChange={handleChange}
                placeholder="Schools attended, qualifications, areas of study..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <Briefcase size={14} /> Career Information
              </label>
              <input 
                type="text" 
                name="careerInfo"
                value={formData.careerInfo}
                onChange={handleChange}
                placeholder="Previous occupations, career highlights, skills..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <Trophy size={14} /> Achievements
              </label>
              <textarea 
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows="2" 
                placeholder="Personal or professional achievements, awards, recognitions..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Section 2: Daily Preferences */}
        <section>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            {/* <Clock className="text-[#004a99]" size={16} /> */}
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              2. Daily Preferences
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Typical Wake-up Time</label>
              <select 
                name="typicalWakeupTime"
                value={formData.typicalWakeupTime}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select wake-up time</option>
                <option value="5:00 AM">5:00 AM</option>
                <option value="5:30 AM">5:30 AM</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="6:30 AM">6:30 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="7:30 AM">7:30 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="8:30 AM">8:30 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:30 AM">9:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <Moon size={14} /> Sleep Habits
              </label>
              <input 
                type="text" 
                name="sleepHabbit"
                value={formData.sleepHabbit}
                onChange={handleChange}
                placeholder="Sleep patterns, preferences, nighttime routines..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Section 3: SPIRITUAL & CULTURAL NEEDS */}
        <section>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            {/* <Heart className="text-[#004a99]" size={16} /> */}
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              3. SPIRITUAL & CULTURAL NEEDS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                <Church size={14} /> Religious Views
              </label>
              <input 
                type="text" 
                name="religiousView"
                value={formData.religiousView}
                onChange={handleChange}
                placeholder="Religious beliefs, spiritual practices, preferences..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-xs font-semibold text-gray-700 mb-1">Important Days</h3>
              
              <div className="space-y-3">
                {formData.residentImportantDates.map((date, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <input 
                        type="date"
                        value={date.timestamp || ''}
                        onChange={(e) => handleArrayChange('residentImportantDates', index, e.target.value, 'timestamp')}
                        placeholder="Select date"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('residentImportantDates', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <input 
                      type="text"
                      value={date.reason || ''}
                      onChange={(e) => handleArrayChange('residentImportantDates', index, e.target.value, 'reason')}
                      placeholder="Reason for this date (e.g., Birthday, Anniversary)"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
                
                {formData.residentImportantDates.length === 0 && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input 
                        type="date"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            addArrayItem('residentImportantDates');
                            setTimeout(() => {
                              handleArrayChange('residentImportantDates', 0, e.target.value, 'timestamp');
                            }, 0);
                          }
                        }}
                        placeholder="Select date"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <input 
                      type="text"
                      value=""
                      onChange={(e) => {
                        if (e.target.value && formData.residentImportantDates.length === 0) {
                          addArrayItem('residentImportantDates');
                          setTimeout(() => {
                            handleArrayChange('residentImportantDates', 0, e.target.value, 'reason');
                          }, 0);
                        } else if (formData.residentImportantDates.length > 0) {
                          handleArrayChange('residentImportantDates', 0, e.target.value, 'reason');
                        }
                      }}
                      placeholder="Reason for this date (e.g., Birthday, Anniversary)"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('residentImportantDates')}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus size={16} /> Add More
                </button>
              </div>
            </div>
          </div>

          
        </section>

        {/* Section 4: INTERESTS & SOCIAL ENGAGEMENT */}
        <section>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            {/* <Calendar className="text-[#004a99]" size={16} /> */}
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              4. INTERESTS & SOCIAL ENGAGEMENT
            </h2>
          </div>

          <div className="space-y-4 mb-4">
            <h3 className="text-xs font-medium text-gray-800 mb-4">
              Select hobbies the resident enjoys:
            </h3>
            
            <div className="flex flex-wrap gap-3 pl-0">
              {availableHobbies.map((hobby) => {
                const isSelected = formData.residentHobbys.includes(hobby.id);
                
                return (
                  <button
                    key={hobby.id}
                    type="button" // Important to prevent form submission
                    onClick={() => handleHobbyToggle(hobby.id, hobby.name)}
                    className={`px-6 py-2 rounded-full border transition-all duration-200 text-sm font-semibold ${
                      isSelected 
                        ? 'bg-[#004a99] border-[#004a99] text-white' 
                        : 'bg-white dark:bg-gray-700 border-[#004a99] text-[#004a99] dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {hobby.name}
                  </button>
                );
              })}
            </div>
          </div>
          
          {availableHobbies.length === 0 && (
            <p className="text-sm text-gray-500 italic">Loading available hobbies...</p>
          )}
        </section>

        {/* Section 5: Additional Notes */}
        <section>
          <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold mb-1">Additional Notes</label>
            <textarea 
              name="extraNotes"
              value={formData.extraNotes}
              onChange={handleChange}
              rows="2" 
              placeholder="Any additional information that would help in providing personalized care..." 
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400 w-full resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
        </section>

        {/* Error Display */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
          <button type="button" onClick={handleCancel} className="px-6 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleNext}
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-semibold rounded transition ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-[#008a4e] text-white rounded hover:bg-[#006f3e]'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}