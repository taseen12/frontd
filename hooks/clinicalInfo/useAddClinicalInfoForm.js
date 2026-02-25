"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addClinicalInfo } from "@/services/clinicalInfo";
import { getEmployees } from "@/services/employeeService";

export function useAddClinicalInfoForm(residentId) {
  const [formData, setFormData] = useState({
    residentId: residentId || "bc06b473-2b3f-4844-96d7-3803becac880",
    mobilityStatus: "",
    cognitiveStatus: "",
    dietaryRequirements: "",
    assignedStaffId: "",
    criticalAllergies: "",
    notes: "",
    primaryPhysicianName: "",
    primaryPhysicianPhone: "",
    primaryPhysicianAddress: "",
    primaryPhysicianEmail: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.employees || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      }
    };

    fetchEmployees();
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

  const mapFormDataToAPI = (formData) => {
    return {
      residentId: residentId || formData.residentId || "bc06b473-2b3f-4844-96d7-3803becac880",
      mobilityStatus: formData.mobilityStatus || null,
      cognitiveStatus: formData.cognitiveStatus || null,
      dietaryRequirements: formData.dietaryRequirements || null,
      assignedStaffId: formData.assignedStaffId || null,
      criticalAllergies: formData.criticalAllergies || null,
      notes: formData.notes || null,
      primaryPhysicianName: formData.primaryPhysicianName || null,
      primaryPhysicianPhone: formData.primaryPhysicianPhone || null,
      primaryPhysicianAddress: formData.primaryPhysicianAddress || null,
      primaryPhysicianEmail: formData.primaryPhysicianEmail || null
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.mobilityStatus.trim()) {
      newErrors.mobilityStatus = "Mobility status is required";
    }
    if (!formData.cognitiveStatus.trim()) {
      newErrors.cognitiveStatus = "Cognitive status is required";
    }
    if (!formData.primaryPhysicianName.trim()) {
      newErrors.primaryPhysicianName = "Primary physician name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitClinicalInfo = async () => {
    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      const apiData = mapFormDataToAPI(formData);
      await addClinicalInfo(apiData);
      setSuccess(true);
      toast.success("Clinical information saved successfully");
      return true;
    } catch (error) {
      console.error("Error submitting clinical info:", error);
      setErrors({ submit: "Failed to save clinical information. Please try again." });
      toast.error("Failed to save clinical information");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      residentId: residentId ,
      mobilityStatus: "",
      cognitiveStatus: "",
      dietaryRequirements: "",
      assignedStaffId: "",
      criticalAllergies: "",
      notes: "",
      primaryPhysicianName: "",
      primaryPhysicianPhone: "",
      primaryPhysicianAddress: "",
      primaryPhysicianEmail: ""
    });
    setErrors({});
    setSuccess(false);
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    employees,
    handleChange,
    handleSelectChange,
    submitClinicalInfo,
    resetForm,
    validateForm,
  };
}
