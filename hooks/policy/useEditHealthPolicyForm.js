"use client";

import { useEffect, useState } from "react";
import { editHealthPolicy, getHealthLevels, getHealthTypes } from "@/services/healthPolicyService";
import { getPatientsMin } from "@/services/patientService";
import { toast } from "react-toastify";

export function useEditHealthPolicyForm(editingPolicy, onUpdated, onCancelEdit) {
  const [formData, setFormData] = useState({
    id: editingPolicy?.id || editingPolicy?.ID || undefined,
    patientId: editingPolicy?.patientID || editingPolicy?.patientId || "",
    healthType: editingPolicy?.healthType || "",
    minValue: editingPolicy?.minValue ?? "",
    maxValue: editingPolicy?.maxValue ?? "",
    healthLevelId: editingPolicy?.healthLevelId ?? "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [patients, setPatients] = useState([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [levels, setLevels] = useState([]);
  const [healthTypes, setHealthTypes] = useState([]); 
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPatients(true);
      setIsLoadingOptions(true);
      setFetchError(null);
      
      try {

        const [patientsData, levelsData, healthTypesData] = await Promise.all([
          getPatientsMin(),
          getHealthLevels(),
          getHealthTypes() 
        ]);

        setPatients(patientsData.patients || []);
        setLevels(Array.isArray(levelsData) ? levelsData : []);
        
        let formattedHealthTypes = [];
        if (healthTypesData && typeof healthTypesData === 'object') {
          formattedHealthTypes = Object.entries(healthTypesData).map(([id, name]) => ({
            id,
            name
          }));
        }
        setHealthTypes(formattedHealthTypes);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError("Failed to load required data. Please try again.");
        toast.error("Failed to load form data");
        setPatients([]);
        setLevels([]);
        setHealthTypes([]);
      } finally {
        setIsLoadingPatients(false);
        setIsLoadingOptions(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editingPolicy) {
      setFormData({
        id: editingPolicy.id || editingPolicy.ID,
        patientId: editingPolicy.patientID || editingPolicy.patientId || "",
        healthType: editingPolicy.healthType || "",
        minValue: editingPolicy.minValue ?? "",
        maxValue: editingPolicy.maxValue ?? "",
        healthLevelId: editingPolicy.healthLevelId ?? "",
      });
      if (patients.length > 0 && (editingPolicy.patientID || editingPolicy.patientId)) {
        const currentPatient = patients.find(patient => 
          patient.id === (editingPolicy.patientID || editingPolicy.patientId) ||
          patient.id.toString() === (editingPolicy.patientID || editingPolicy.patientId).toString()
        );
        if (currentPatient) {
          setSelectedPatient(currentPatient);
          setPatientSearchTerm(`${currentPatient.name} (${currentPatient.ref})`);
        }
      }
    }
    setErrors({});
    setSuccess(false);
  }, [editingPolicy, patients]);

  const getFilteredPatients = () => {
    if (!patientSearchTerm.trim()) return patients;
    
    return patients.filter(patient => 
      patient.name?.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
      patient.ref?.toLowerCase().includes(patientSearchTerm.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handlePatientSelect = (patient) => {
    if (!patient || !patient.id) return;
    
    setSelectedPatient(patient);
    setPatientSearchTerm(`${patient.name} (${patient.ref})`);
    setFormData(prev => ({
      ...prev,
      patientId: patient.id
    }));
    setShowPatientsDropdown(false);
    
    if (errors.patientId) {
      setErrors(prev => ({
        ...prev,
        patientId: null,
      }));
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setPatientSearchTerm(value);
    setShowPatientsDropdown(true);

    if (!value || (selectedPatient && !value.includes(selectedPatient.name))) {
      setSelectedPatient(null);
      setFormData(prev => ({
        ...prev,
        patientId: ""
      }));
    }
  };

  const handleSearchFocus = () => {
    setShowPatientsDropdown(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowPatientsDropdown(false), 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsLoading(true);

    try {
      const payload = {
        id: Number(formData.id),
        patientId: formData.patientId.toString().trim(),
        healthType: formData.healthType.trim(),
        minValue: Number(formData.minValue),
        maxValue: Number(formData.maxValue),
        healthLevelId: Number(formData.healthLevelId),
      };

      await editHealthPolicy(payload);
      
      setSuccess(true);
      toast.success("Health policy updated successfully!");
      
      if (onUpdated) {
        onUpdated();
      }
      
      return true;
    } catch (error) {
      console.error("Error updating health policy:", error);
      
      // More specific error message based on response
      const errorMessage = error.response?.data?.message || 
                          "Failed to update health policy. Please try again.";
      
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setErrors({});
    setSuccess(false);
    setPatientSearchTerm("");
    setSelectedPatient(null);
    
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id || formData.id === undefined || formData.id === null) {
      newErrors.id = "ID is required";
    }
    
    if (!formData.patientId || formData.patientId.toString().trim() === "") {
      newErrors.patientId = "Patient is required";
    }
    
    if (!formData.healthType || formData.healthType.trim() === "") {
      newErrors.healthType = "Please select a health type";
    }
    
    if (!formData.minValue || isNaN(Number(formData.minValue))) {
      newErrors.minValue = "Minimum value is required";
    } else if (Number(formData.minValue) < 0) {
      newErrors.minValue = "Minimum value must be a positive number";
    }
    
    if (!formData.maxValue || isNaN(Number(formData.maxValue))) {
      newErrors.maxValue = "Maximum value is required";
    } else if (Number(formData.maxValue) < 0) {
      newErrors.maxValue = "Maximum value must be a positive number";
    }
    
    if (formData.minValue && formData.maxValue && 
        Number(formData.maxValue) <= Number(formData.minValue)) {
      newErrors.maxValue = "Maximum value must be greater than minimum value";
    }
    
    if (!formData.healthLevelId || isNaN(Number(formData.healthLevelId))) {
      newErrors.healthLevelId = "Please select a health level";
    }
    
    return newErrors;
  };

  const getHealthTypeName = (id) => {
    const type = healthTypes.find(t => t.id === id);
    return type ? type.name : id;
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
    handleSelectChange,
    patients: getFilteredPatients(),
    isLoadingPatients,
    patientSearchTerm,
    showPatientsDropdown,
    selectedPatient,
    handlePatientSelect,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    setShowPatientsDropdown,
    healthTypes, 
    levels,
    isLoadingOptions,
    fetchError,
    getHealthTypeName, 
  };
}