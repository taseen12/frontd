"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getLifestyleInfoByResidentId, updateLifestyleInfo, updateResidentHobbies, updateImportantDates } from "@/services/lifestyleService";

export const useEditLifestyleForm = (residentId, lifestyleId, initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log("Updating form with initialData:", initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  // Function to update form data with lifestyle info
  const updateFormData = (lifestyleData) => {
    console.log("updateFormData called with:", lifestyleData);
    
    const formData = {
      residentId: lifestyleData.residentId || residentId,
      placeOfBirth: lifestyleData.placeOfBirth || "",
      childhoodInfo: lifestyleData.childhoodInfo || "",
      educaitonInfo: lifestyleData.educationInfo || lifestyleData.educationInfo || "", // Handle both API typo and correct field
      careerInfo: lifestyleData.careerInfo || "",
      achivements: lifestyleData.achivements || lifestyleData.achievements || "", // Handle both API typo and correct field
      religiousView: lifestyleData.religiousView || "",
      typicalWakeupTime: lifestyleData.typicalWakeupTime || lifestyleData.typicalWakeUpTime || "", // Handle both variations
      sleepHabbit: lifestyleData.sleepHabbit || "", // Note: API has typo "sleepHabbit"
      extraNotes: lifestyleData.extraNotes || "",
      residentHobbys: lifestyleData.residentHobbys || [],
      importantDates: lifestyleData.importantDates || []
    };
    console.log("Setting form data to:", formData);
    setFormData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mapFormDataToAPI = (formData) => {
    return {
      residentId: formData.residentId,
      placeOfBirth: formData.placeOfBirth,
      childhoodInfo: formData.childhoodInfo,
      educaitonInfo: formData.educaitonInfo, // API expects typo
      careerInfo: formData.careerInfo,
      achivements: formData.achivements, // API expects typo
      religiousView: formData.religiousView,
      typicalWakeupTime: formData.typicalWakeupTime,
      sleepHabbit: formData.sleepHabbit, // API expects typo
      extraNotes: formData.extraNotes,
      residentHobbys: formData.residentHobbys || [],
      importantDates: formData.importantDates || []
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Add validation if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    // Check if event exists before calling preventDefault
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Prevent multiple simultaneous submissions
    if (isLoading) {
      console.warn("Form already submitting, ignoring duplicate submission");
      return false;
    }

    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      // Prepare lifestyle data without hobbies and important dates
      const lifestylePayload = {
        residentId: formData.residentId,
        placeOfBirth: formData.placeOfBirth,
        childhoodInfo: formData.childhoodInfo,
        educaitonInfo: formData.educaitonInfo, // API expects typo
        careerInfo: formData.careerInfo,
        achivements: formData.achivements, // API expects typo
        religiousView: formData.religiousView,
        typicalWakeupTime: formData.typicalWakeupTime,
        sleepHabbit: formData.sleepHabbit, // API expects typo
        extraNotes: formData.extraNotes
      };

      // Submit lifestyle info
      await updateLifestyleInfo(lifestylePayload);

      // Submit important dates separately if they exist
      if (formData.importantDates && formData.importantDates.length > 0) {
        await updateImportantDates(formData.residentId, formData.importantDates);
      }

      // Always submit hobbies (even empty array) to update resident's hobbies
      console.log("Submitting hobbies:", formData.residentHobbys || []);
      await updateResidentHobbies(formData.residentId, formData.residentHobbys || []);

      toast.success("Lifestyle information updated successfully");
      return true;
    } catch (error) {
      console.error("Error submitting lifestyle form:", error);
      setErrors({ 
        submit: error.response?.data?.message || "Failed to update lifestyle information" 
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSelectChange,
    handleSubmit,
    validateForm,
    updateFormData
  };
};
