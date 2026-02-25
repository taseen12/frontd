"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addLifestyleInfo, getHobbies } from "@/services/lifestyleService";

export function useAddLifestyleForm(residentId) {
  const [formData, setFormData] = useState({
    residentId: residentId || "bc06b473-2b3f-4844-96d7-3803becac880",
    placeOfBirth: "",
    childhoodInfo: "",
    educationInfo: "",
    careerInfo: "",
    achievements: "",
    religiousView: "",
    typicalWakeupTime: "",
    sleepHabbit: "",
    extraNotes: "",
    residentImportantDates: [],
    residentHobbys: [],
    createdAt: new Date().toISOString(),
    createdBy: "system"
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableHobbies, setAvailableHobbies] = useState([]);

  // Fetch available hobbies on component mount
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await getHobbies();
        setAvailableHobbies(response.hobbys || []);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    fetchHobbies();
  }, []);

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

  const handleHobbyToggle = (hobbyId, hobbyName) => {
    const currentHobbies = formData.residentHobbys;
    
    if (currentHobbies.includes(hobbyId)) {
      // Remove hobby if already selected (store only ID)
      setFormData({
        ...formData,
        residentHobbys: currentHobbies.filter(h => h !== hobbyId)
      });
    } else {
      // Add hobby if not selected (store only ID)
      setFormData({
        ...formData,
        residentHobbys: [...currentHobbies, hobbyId]
      });
    }
  };

  const handleArrayChange = (fieldName, index, value, subField = null) => {
    if (fieldName === 'residentImportantDates' && subField) {
      // Handle important dates object fields
      const updatedArray = [...formData[fieldName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [subField]: value
      };
      setFormData({
        ...formData,
        [fieldName]: updatedArray,
      });
    } else {
      // Handle simple array fields
      const updatedArray = [...formData[fieldName]];
      updatedArray[index] = value;
      setFormData({
        ...formData,
        [fieldName]: updatedArray,
      });
    }
  };

  const addArrayItem = (fieldName) => {
    if (fieldName === 'residentImportantDates') {
      // Add new important date object with timestamp and reason
      setFormData({
        ...formData,
        [fieldName]: [...formData[fieldName], { timestamp: '', reason: '' }],
      });
    } else {
      // For other arrays, add empty string
      setFormData({
        ...formData,
        [fieldName]: [...formData[fieldName], ""],
      });
    }
  };

  const removeArrayItem = (fieldName, index) => {
    const updatedArray = formData[fieldName].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Add validation if needed for required fields
    // For now, all fields are optional
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitLifestyleInfo = async () => {
    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      // Create payload matching backend expected format
      const payload = {
        residentId: residentId || formData.residentId,
        lifeStyle: {
          placeOfBirth: formData.placeOfBirth,
          childhoodInfo: formData.childhoodInfo,
          educaitonInfo: formData.educationInfo, // Keep as is to match backend
          careerInfo: formData.careerInfo,
          achivements: formData.achievements, // Keep as is to match backend
          religiousView: formData.religiousView,
          typicalWakeupTime: formData.typicalWakeupTime,
          sleepHabbit: formData.sleepHabbit,
          extraNotes: formData.extraNotes
        },
        residentImportantDates: formData.residentImportantDates
          .filter(date => 
            (date.timestamp && date.timestamp.trim() !== "") || (date.reason && date.reason.trim() !== "")
          )
          .map(date => ({
            date: date.timestamp, // Map timestamp to date field for API
            reason: date.reason
          })),
        residentHobbys: formData.residentHobbys.filter(hobby => hobby.trim() !== "")
      };

      console.log("Submitting lifestyle payload:", payload);
      await addLifestyleInfo(payload);
      setSuccess(true);
      toast.success("Lifestyle information saved successfully");
      return true;
    } catch (error) {
      console.error("Error submitting lifestyle info:", error);
      setErrors({ submit: "Failed to save lifestyle information. Please try again." });
      toast.error("Failed to save lifestyle information");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      residentId: "bc06b473-2b3f-4844-96d7-3803becac880",
      placeOfBirth: "",
      childhoodInfo: "",
      educationInfo: "",
      careerInfo: "",
      achievements: "",
      religiousView: "",
      typicalWakeupTime: "",
      sleepHabbit: "",
      extraNotes: "",
      residentImportantDates: [],
      residentHobbys: [],
      createdAt: new Date().toISOString(),
      createdBy: "system"
    });
    setErrors({});
    setSuccess(false);
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    availableHobbies,
    handleChange,
    handleSelectChange,
    handleHobbyToggle,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    submitLifestyleInfo,
    resetForm,
    validateForm,
  };
}
