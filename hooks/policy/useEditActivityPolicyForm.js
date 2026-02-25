"use client";

import { useEffect, useState } from "react";
import { editActivityPolicy, getActivityLevels, getActivityTypes } from "@/services/activityPolicyService";
import { getPatientsMin } from "@/services/patientService";
import { toast } from "react-toastify";

export function useEditActivityPolicyForm(editingPolicy, onUpdated, onCancelEdit) {
  const [formData, setFormData] = useState({
    id: editingPolicy?.id || editingPolicy?.ID || undefined,
    patientID: editingPolicy?.patientID || "",
    activityTypeID: editingPolicy?.activityTypeID ?? "",
    maxAllowed: editingPolicy?.maxAllowed ?? "",
    levelID: editingPolicy?.levelID ?? "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [patients, setPatients] = useState([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [activityTypes, setActivityTypes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPatients(true);
      setIsLoadingOptions(true);
      try {
        const patientsData = await getPatientsMin();
        setPatients(patientsData.patients || []);

        const [levelsData, typesData] = await Promise.all([
          getActivityLevels(),
          getActivityTypes()
        ]);

        setLevels(levelsData);
        setActivityTypes(typesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPatients([]);
        setLevels([]);
        setActivityTypes([]);
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
        patientID: editingPolicy.patientID || "",
        activityTypeID: editingPolicy.activityTypeID ?? "",
        maxAllowed: editingPolicy.maxAllowed ?? "",
        levelID: editingPolicy.levelID ?? "",
      });
      
      if (patients.length > 0 && editingPolicy.patientID) {
        const currentPatient = patients.find(patient => patient.id === editingPolicy.patientID);
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
      patientID: patient.id
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
      patientID: ""
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
      await editActivityPolicy({
        id: Number(formData.id),
        patientID: formData.patientID.trim(),
        activityTypeID: Number(formData.activityTypeID),
        maxAllowed: Number(formData.maxAllowed),
        levelID: Number(formData.levelID),
      });
      setSuccess(true);
      toast.success("Activity policy updated successfully!");
      if (onUpdated) onUpdated();
      return true;
    } catch (error) {
      console.error("Error updating activity policy:", error);
      setErrors({ submit: "Failed to update form. Please try again." });
      toast.error("Failed to update activity policy");
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
    if (onCancelEdit) onCancelEdit();
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.id === undefined || formData.id === null) newErrors.id = "ID is required";
    if (!formData.patientID.trim()) newErrors.patientID = "Patient ID is required";
    if (formData.activityTypeID === "" || isNaN(Number(formData.activityTypeID))) newErrors.activityTypeID = "Activity Type ID is required";
    if (formData.maxAllowed === "" || isNaN(Number(formData.maxAllowed))) newErrors.maxAllowed = "Max Allowed is required";
    if (formData.levelID === "" || isNaN(Number(formData.levelID))) newErrors.levelID = "Level ID is required";
    return newErrors;
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
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
    activityTypes,
    levels,
    isLoadingOptions,
  };
}