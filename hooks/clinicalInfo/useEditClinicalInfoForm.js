"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClinicalInfoByResidentId, updateClinicalInfo } from "@/services/clinicalInfo";

export function useEditClinicalInfoForm(residentId, clinicalInfoId, initialData = {}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Re-initialize form when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log("Re-initializing form with new initialData:", initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  // Function to update form data with clinical info
  const updateFormData = (clinicalData) => {
    console.log("updateFormData called with:", clinicalData);
    
    const formData = {
      residentId: clinicalData.residentId || residentId,
      mobilityStatus: clinicalData.mobilityStatus || "",
      cognitiveStatus: clinicalData.cognitiveStatus || "",
      dietaryRequirement: clinicalData.dietaryRequirement || "", 
      assignedStaffId: clinicalData.assignedStaffId || "", 
      criticalAllergies: clinicalData.criticalAllergies || "",
      notes: clinicalData.notes || "",
      primaryPhysicianName: clinicalData.primaryPhysicianName || "",
      primaryPhysicianPhone: clinicalData.primaryPhysicianPhone || "",
      primaryPhysicianAddress: clinicalData.primaryPhysicianAddress || "",
      primaryPhysicianEmail: clinicalData.primaryPhysicianEmail || ""
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

  const mapFormDataToAPI = (formData) => {
    return {
      residentId: residentId,
      mobilityStatus: formData.mobilityStatus,
      cognitiveStatus: formData.cognitiveStatus,
      dietaryRequirements: formData.dietaryRequirement, // Fixed: Map to API expected field
      assignedStaffId: formData.assignedStaffId, // Fixed: Use correct field name
      criticalAllergies: formData.criticalAllergies,
      notes: formData.notes,
      primaryPhysicianName: formData.primaryPhysicianName,
      primaryPhysicianPhone: formData.primaryPhysicianPhone,
      primaryPhysicianAddress: formData.primaryPhysicianAddress,
      primaryPhysicianEmail: formData.primaryPhysicianEmail
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

    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      await updateClinicalInfo(mapFormDataToAPI(formData));
      toast.success("Clinical information updated successfully");
      return true;
    } catch {
      setErrors({ submit: "Failed to update clinical information. Please try again." });
      toast.error("Failed to update clinical information");
      return false;
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
}