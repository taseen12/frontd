"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRooms } from "@/services/roomService";
import { getGroups } from "@/services/groupService";
import { getGenders } from './../../services/genderService';
import { addPatient } from "@/services/patientService";

export function useAddPatientForm() {
  const [formData, setFormData] = useState({
    ref: "",
    name: "",
    genderID: "",
    groupID: "",
    roomID: "",
  });

  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [genders, setGenders] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  
  // Loading states for API calls
  const [isLoading, setIsLoading] = useState(false);
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

    // Handle Select change
  const handleSelectChange = (name, value) => {
    console.log(name,value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      console.log("Submitting form with data:", formData);
      await addPatient(formData);
      setSuccess(true);
      toast.success("Patient added successfully");
      setFormData({ name: "" });
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add Patient");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Patient name is required";
    }
    return newErrors;
  };

  return {
    formData,
    rooms,
    groups,
    genders,
    errors,
    success,
    isLoading,
    loadingRooms,
    loadingGroups,
    loadingGenders,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
}