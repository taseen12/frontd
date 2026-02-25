"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addAuthorisedRepresentative } from "@/services/authorisedRepresentative";

export function useAddAuthorisedRepresentativeForm(residentId) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    relationship: "",
    legalAuthorityStatus: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      residentId: residentId || "bc06b473-2b3f-4844-96d7-3803becac880", // Use provided residentId, fallback to static
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || null,
      relationship: formData.relationship || null,
      legalAuthorityStatus: formData.legalAuthorityStatus || null
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Representative full name is required";
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitAuthorisedRepresentativeData = async () => {
    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      const apiData = mapFormDataToAPI(formData);
      await addAuthorisedRepresentative(apiData);
      toast.success("Authorised representative information saved successfully");
      return true;
    } catch (error) {
      console.error("Error submitting authorised representative data:", error);
      setErrors({ submit: "Failed to save authorised representative information. Please try again." });
      toast.error("Failed to save authorised representative information");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      await addAuthorisedRepresentative(mapFormDataToAPI(formData));
      setSuccess(true);
      toast.success("Authorised representative added successfully");
      
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        relationship: "",
        legalAuthorityStatus: ""
      });
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add authorised representative");
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
    handleChange,
    handleSelectChange,
    handleSubmit,
    submitAuthorisedRepresentativeData,
    validateForm,
  };
}