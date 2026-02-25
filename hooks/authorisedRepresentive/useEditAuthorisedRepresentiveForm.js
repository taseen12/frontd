"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { 
  getAuthorisedRepresentativeById, 
  editAuthorisedRepresentative 
} from "@/services/authorisedRepresentative";

console.log("useEditAuthorisedRepresentiveForm hook loaded");

export const useEditAuthorisedRepresentiveForm = (residentId, representativeId, initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Function to update form data with representative info
  const updateFormData = (representativeData) => {
    console.log("updateFormData called with:", representativeData);
    
    const formData = {
      id: representativeData.id || representativeId,
      residentId: residentId || "",
      representiveFullName: representativeData.fullName || "", 
      representivePhone: representativeData.phone || "", 
      representiveEmail: representativeData.email || "", 
      relationshipToResident: representativeData.relationship || "", 
      legalAuthorityStatus: representativeData.legalAuthorityStatus || "" 
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
      id: representativeId,
      residentId: residentId || "static-resident-123",
      fullName: formData.representiveFullName, 
      phone: formData.representivePhone, 
      email: formData.representiveEmail || null, 
      relationship: formData.relationshipToResident || null, 
      legalAuthorityStatus: formData.legalAuthorityStatus || null 
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.representiveFullName.trim()) {
      newErrors.representiveFullName = "Representative full name is required";
    }
    if (!formData.representivePhone.trim()) {
      newErrors.representivePhone = "Representative phone is required";
    }

    // Email validation
    if (formData.representiveEmail && !/\S+@\S+\.\S+/.test(formData.representiveEmail)) {
      newErrors.representiveEmail = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (formData.representivePhone && !phoneRegex.test(formData.representivePhone)) {
      newErrors.representivePhone = "Invalid phone format";
    }

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
      await editAuthorisedRepresentative(mapFormDataToAPI(formData));
      setSuccess(true);
      toast.success("Authorised representative updated successfully");
      return true;
    } catch {
      setErrors({ submit: "Failed to update authorised representative. Please try again." });
      toast.error("Failed to update authorised representative");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    loadingData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    validateForm,
    updateFormData
  };
}