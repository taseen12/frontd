"use client";

import { useState, useEffect } from "react";
import { editPatient } from "@/services/patientService";
import { toast } from "react-toastify";
import { getRooms } from "@/services/roomService";
import { getGroups } from "@/services/groupService";
import { getGenders } from './../../services/genderService';

export function useEditPatientForm() {
  // Form state
  const [formData, setFormData] = useState({
    ref: "",
    name: "",
    genderID: "",
    groupID: "",
    roomID: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Success message
  const [success, setSuccess] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [genders, setGenders] = useState([]);
    
    
    // Loading states for API calls
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [loadingGenders, setLoadingGenders] = useState(false);
  
    useEffect(() => {
      const loadRooms = async () => {
        setLoadingRooms(true);
        const data = await getRooms();
        setRooms(data.rooms);
        setLoadingRooms(false);
      };
  
      loadRooms();
    }, []);
  
    useEffect(() => {
      const loadGroups = async () => {
        setLoadingGroups(true);
        const data = await getGroups();
        setGroups(data.groups);
        setLoadingGroups(false);
      };
  
      loadGroups();
    }, []);
  
    useEffect(() => {
      const loadGenders = async () => {
        setLoadingGenders(true);
        const data = await getGenders();
        setGenders(data.genders);
        setLoadingGenders(false);
      };
  
      loadGenders();
    }, []);
  
  const removeNameFields = (data) => {
    const cleaned = {};
    Object.keys(data).forEach((key) => {
      if (key !== "name" && key.toLowerCase().includes("name")) return;
    cleaned[key] = data[key];
  });
    return cleaned;
};

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setLoading(true);

    try {
      const cleanedData = removeNameFields(formData);
      await editPatient(cleanedData);
      setSuccess(true);
      toast.success("Patient updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating form:", error);
      setErrors({ submit: "Failed to update form. Please try again." });
      toast.error("Failed to update Patient");
      return false;
    } finally {
      setLoading(false);
    }
  };

    const handleSelectChange = (name, value) => {
      const updatedFormData = { ...formData, [name]: value };
          setFormData(updatedFormData);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Patient name is required";

    return newErrors;
  };

  return {
    formData,
    setFormData,
    rooms,
    groups,
    genders,
    errors,
    setErrors,
    success,
    loading,
    setLoading,
    loadingRooms,
    loadingGroups,
    loadingGenders,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
}