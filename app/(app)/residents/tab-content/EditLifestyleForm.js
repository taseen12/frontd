"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Calendar, BookOpen, Briefcase, Trophy, Church, Clock, Moon, Plus, X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEditLifestyleForm } from "@/hooks/lifestyle/useEditLifestyleForm";
import { getHobbies } from "@/services/lifestyleService";

export default function EditLifestyleForm({ 
  formData, 
  errors, 
  handleChange, 
  handleSelectChange,
  onNext, 
  onCancel,
  submitLifestyleInfo,
  isLoading,
  editSection
}) {
  const router = useRouter();
  const [availableHobbies, setAvailableHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  // Fetch available hobbies
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await getHobbies();
        setAvailableHobbies(response.hobbys || []);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      }
    };
    
    fetchHobbies();
  }, []);

  // Initialize selected hobbies from form data
  useEffect(() => {
    if (formData.residentHobbys && formData.residentHobbys.length > 0) {
      setSelectedHobbies(formData.residentHobbys);
    }
  }, [formData.residentHobbys]);

  const handleHobbyToggle = (hobbyId) => {
    setSelectedHobbies(prev => {
      const newSelectedHobbies = prev.includes(hobbyId) 
        ? prev.filter(id => id !== hobbyId)
        : [...prev, hobbyId];
      
      // Update form data to sync with selected hobbies
      handleChange({
        target: {
          name: 'residentHobbys',
          value: newSelectedHobbies
        }
      });
      
      return newSelectedHobbies;
    });
  };

  const handleNext = async () => {
    console.log('EditLifestyleForm handleNext called');
    const success = await submitLifestyleInfo();
    console.log('EditLifestyleForm submitLifestyleInfo result:', success);
    if (success) {
      console.log('Lifestyle info submitted successfully');
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#004a99]">Resident Lifestyle & Personal History</h1>
        <p className="text-xs text-gray-500 mt-1">
          Understanding resident's background for personalized care
        </p>
      </div>

      <form className="space-y-8">
        {/* Section 1: My Life Story */}
        {(!editSection || editSection === 'personal') && (
          <section>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
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

              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                  <BookOpen size={14} /> Education Information
                </label>
                <input 
                  type="text" 
                  name="educaitonInfo"
                  value={formData.educaitonInfo}
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

              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 flex items-center gap-2">
                  <Trophy size={14} /> Achievements
                </label>
                <textarea 
                  name="achivements"
                  value={formData.achivements}
                  onChange={handleChange}
                  rows="2" 
                  placeholder="Personal or professional achievements, awards, recognitions..." 
                  className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                ></textarea>
              </div>

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
                  className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Daily Preferences */}
        {(!editSection || editSection === 'personal') && (
          <section>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
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
                  className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Important Dates */}
        {(!editSection || editSection === 'dates') && (
          <section>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
              <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                3. Important Dates
              </h2>
            </div>
            
            <div className="space-y-4 mb-4">
              <h3 className="text-xs font-medium text-gray-800 mb-4">
                Add important dates for resident:
              </h3>
              
              <div className="space-y-3">
                {formData.importantDates && formData.importantDates.length > 0 ? (
                  formData.importantDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                      <input 
                        type="date"
                        value={date.date ? date.date.split('T')[0] : ''}
                        onChange={(e) => {
                          const newDates = [...formData.importantDates];
                          newDates[index] = {
                            ...newDates[index],
                            date: e.target.value
                          };
                          handleChange({
                            target: {
                              name: 'importantDates',
                              value: newDates
                            }
                          });
                        }}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300"
                      />
                      <input 
                        type="text"
                        value={date.reason || ''}
                        onChange={(e) => {
                          const newDates = [...formData.importantDates];
                          newDates[index] = {
                            ...newDates[index],
                            reason: e.target.value
                          };
                          handleChange({
                            target: {
                              name: 'importantDates',
                              value: newDates
                            }
                          });
                        }}
                        placeholder="Reason for this date (e.g., Birthday, Anniversary)"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newDates = formData.importantDates.filter((_, i) => i !== index);
                          handleChange({
                            target: {
                              name: 'importantDates',
                              value: newDates
                            }
                          });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                    <input 
                      type="date"
                      value=""
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'importantDates',
                            value: [{ date: e.target.value, reason: '' }]
                          }
                        });
                      }}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300"
                    />
                    <input 
                      type="text"
                      value=""
                      onChange={(e) => {
                        const currentDates = formData.importantDates || [];
                        if (currentDates.length === 0) {
                          handleChange({
                            target: {
                              name: 'importantDates',
                              value: [{ date: '', reason: e.target.value }]
                            }
                          });
                        } else {
                          const newDates = [...currentDates];
                          newDates[0] = { ...newDates[0], reason: e.target.value };
                          handleChange({
                            target: {
                              name: 'importantDates',
                              value: newDates
                            }
                          });
                        }
                      }}
                      placeholder="Reason for this date (e.g., Birthday, Anniversary)"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400"
                    />
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => {
                    handleChange({
                      target: {
                        name: 'importantDates',
                        value: [...(formData.importantDates || []), { date: '', reason: '' }]
                      }
                    });
                  }}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus size={16} /> Add More
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Hobbies & Interests */}
        {(!editSection || editSection === 'hobbies') && (
          <section>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
              <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                4. Hobbies & Interests
              </h2>
            </div>
            
            <div className="space-y-4 mb-4">
              <h3 className="text-xs font-medium text-gray-800 mb-4">
                Select hobbies resident enjoys:
              </h3>
              
              <div className="flex flex-wrap gap-3 pl-0">
                {availableHobbies.map((hobby) => {
                  const isSelected = selectedHobbies.includes(hobby.id);
                  
                  return (
                    <button
                      key={hobby.id}
                      type="button"
                      onClick={() => handleHobbyToggle(hobby.id)}
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
          </section>
        )}

        {/* Section 5: Additional Notes */}
        {(!editSection || editSection === 'personal') && (
          <section>
            <div className="flex flex-col mb-4">
              <label className="text-xs font-semibold mb-1">Additional Notes</label>
              <textarea 
                name="extraNotes"
                value={formData.extraNotes}
                onChange={handleChange}
                rows="2" 
                placeholder="Any additional information that would help in providing personalized care..." 
                className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 w-full resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
              ></textarea>
            </div>
          </section>
        )}

        {/* Error Display */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">{errors.submit}</p>
          </div>
        )}

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
