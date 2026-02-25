"use client";

import { useState, useEffect } from "react";
import { addHealthPolicy, getHealthLevels, getHealthTypes } from "@/services/healthPolicyService"; 
import { getPatientsMin } from "@/services/patientService";
import { toast } from "react-toastify";

export function useAddHealthPolicyForm() {
  const [formData, setFormData] = useState({
    patientId: "",
    healthType: "",
    minValue: "",
    maxValue: "",
    healthLevelId: "",
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPatients(true);
      setIsLoadingOptions(true);
      try {
        const [patientsData, levelsData, healthTypesData] = await Promise.all([
          getPatientsMin(),
          getHealthLevels(),
          getHealthTypes() 
        ]);

        setPatients(patientsData.patients || []);
        setLevels(levelsData);
        
        const formattedHealthTypes = Object.entries(healthTypesData).map(([id, name]) => ({
          id,
          name
        }));
        setHealthTypes(formattedHealthTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const getFilteredPatients = () => {
    if (!patientSearchTerm) return patients;
    
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
      patient.ref.toLowerCase().includes(patientSearchTerm.toLowerCase())
    );
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

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setPatientSearchTerm(`${patient.name} (${patient.ref})`);
    setFormData(prev => ({
      ...prev,
      patientId: patient.id
    }));
    setShowPatientsDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setPatientSearchTerm(value);
    setShowPatientsDropdown(true);
    setSelectedPatient(null);
    setFormData(prev => ({
      ...prev,
      patientId: ""
    }));
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
      await addHealthPolicy({
        patientId: formData.patientId.trim(),
        healthType: formData.healthType.trim(),
        minValue: Number(formData.minValue),
        maxValue: Number(formData.maxValue),
        healthLevelId: Number(formData.healthLevelId),
      });
      setSuccess(true);
      toast.success("Health policy added successfully");
      setFormData({ patientId: "", healthType: "", minValue: "", maxValue: "", healthLevelId: "" });
      setPatientSearchTerm("");
      setSelectedPatient(null);
      
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add health policy");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId.trim()) newErrors.patientId = "Patient ID is required";
    if (!formData.healthType.trim()) newErrors.healthType = "Health Type is required";
    if (formData.minValue === "" || isNaN(Number(formData.minValue))) newErrors.minValue = "Min Value is required";
    if (formData.maxValue === "" || isNaN(Number(formData.maxValue))) newErrors.maxValue = "Max Value is required";
    if (formData.healthLevelId === "" || isNaN(Number(formData.healthLevelId))) newErrors.healthLevelId = "Health Level ID is required";
    return newErrors;
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
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
  };
}