"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAvailableRooms } from "@/services/roomService";
import { getGroups } from "@/services/groupService";
import { getGenders, getIndigenousStatus } from "./../../services/configService";
import { addResident } from "@/services/residentService";

export function useAddResidentsForm() {
  const [formData, setFormData] = useState({
    // Personal Identity
    first_name: "",
    surname: "",
    date_of_birth: "",
    gender: "",
    identity: "",
    language: "",
    room_id: "",
    group_id: "",
    
    // Government & Healthcare Identifiers
    medicare_number: "",
    centrelink_crn: "",
    
    // Store resident ID after creation
    residentId: ""
  });

  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [genders, setGenders] = useState([]);
  const [indigenousStatus, setIndigenousStatus] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  // Loading states for API calls
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingGenders, setLoadingGenders] = useState(false);
  const [loadingIndigenousStatus, setLoadingIndigenousStatus] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      setLoadingRooms(true);
      try {
        const data = await getAvailableRooms();
        setRooms(data.rooms || []);
      } catch (error) {
        console.error("Error loading rooms:", error);
        toast.error("Failed to load rooms");
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
  }, []);

  useEffect(() => {
    const loadGroups = async () => {
      setLoadingGroups(true);
      try {
        const data = await getGroups();
        setGroups(data.groups || []);
      } catch (error) {
        console.error("Error loading groups:", error);
        toast.error("Failed to load groups");
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    const loadGenders = async () => {
      setLoadingGenders(true);
      try {
        const data = await getGenders();
        setGenders(data.genders || []);
      } catch (error) {
        console.error("Error loading genders:", error);
        toast.error("Failed to load genders");
      } finally {
        setLoadingGenders(false);
      }
    };

    loadGenders();
  }, []);

  useEffect(() => {
    const loadIndigenousStatus = async () => {
      setLoadingIndigenousStatus(true);
      try {
        const data = await getIndigenousStatus();
        console.log("Indigenous Status API Response:", data); // Debug log
        // The API returns { inds: [...] } structure
        setIndigenousStatus(data.inds || []);
      } catch (error) {
        console.error("Error loading indigenous status:", error);
        toast.error("Failed to load indigenous status options");
      } finally {
        setLoadingIndigenousStatus(false);
      }
    };

    loadIndigenousStatus();
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
    console.log(name, value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Documents array
  const handleDocumentsChange = (documents) => {
    setFormData((prev) => ({
      ...prev,
      documents,
    }));
  };

  // Handle Important Dates array
  const handleImportantDatesChange = (dates) => {
    setFormData((prev) => ({
      ...prev,
      important_dates: dates,
    }));
  };

  // Handle Hobbies array
  const handleHobbiesChange = (hobbies) => {
    setFormData((prev) => ({
      ...prev,
      hobbies,
    }));
  };

  const mapFormDataToAPI = (formData) => {
    const apiData = {
      refNo: `Res${Math.random().toString(36).substr(2, 4)}`,
      firstName: formData.first_name || "",
      surname: formData.surname || "",
      medicareNumber: formData.medicare_number || "",
      centrelinkCrn: formData.centrelink_crn || "",
      dateOfBirth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : "2026-02-09T05:30:30.876Z",
      gender: formData.gender || "",
      identity: formData.identity || "",
      language: formData.language || "",
      roomId: formData.room_id || "",
      groupId: formData.group_id ? parseInt(formData.group_id) : 2
    };

    return apiData;
  };

  const submitResidentData = async () => {
    if (!validateIntakeForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      const apiData = mapFormDataToAPI(formData);
      const response = await addResident(apiData);
      
      // Debug: Log the actual response
      console.log("API Response:", response);
      
      // Store the resident ID from the response
      let residentId = null;
      
      // Check if response contains residentId directly (based on API response structure)
      if (response && response.residentId) {
        residentId = response.residentId;
      }
      // Check if response contains residents array
      else if (response && response.residents && Array.isArray(response.residents)) {
        // Find the newly created resident by matching refNo
        const newResident = response.residents.find(r => r.refNo === apiData.refNo);
        if (newResident && newResident.id) {
          residentId = newResident.id;
        }
      }
      // Try other possible response structures
      else if (!residentId && response && response.id) {
        residentId = response.id;
      } else if (!residentId && response && response.resident && response.resident.id) {
        residentId = response.resident.id;
      } else if (!residentId && response && response.data && response.data.id) {
        residentId = response.data.id;
      } else if (!residentId && response && response.data && response.data.resident && response.data.resident.id) {
        residentId = response.data.resident.id;
      }
      
      if (residentId) {
        setFormData(prev => ({ ...prev, residentId }));
        console.log("Stored resident ID:", residentId);
      } else {
        console.warn("Could not find resident ID in response:", response);
      }
      
      toast.success("Resident basic information saved successfully");
      return true;
    } catch (error) {
      console.error("Error submitting resident data:", error);
      setErrors({ submit: "Failed to save resident information. Please try again." });
      toast.error("Failed to save resident information");
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
      await addResident(formData);
      setSuccess(true);
      toast.success("Resident added successfully");
      
      // Reset form
      setFormData({
        first_name: "",
        surname: "",
        date_of_birth: "",
        gender: "",
        identity: "",
        language: "",
        room_id: "",
        group_id: "",
        medicare_number: "",
        centrelink_crn: "",
      });
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add Resident");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateIntakeForm = () => {
    const newErrors = {};
    
    // Only validate first name for Resident Intake tab
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    rooms,
    groups,
    genders,
    indigenousStatus,
    errors,
    success,
    isLoading,
    loadingRooms,
    loadingGroups,
    loadingGenders,
    loadingIndigenousStatus,
    handleChange,
    handleSelectChange,
    handleDocumentsChange,
    handleImportantDatesChange,
    handleHobbiesChange,
    handleSubmit,
    submitResidentData,
    validateIntakeForm,
  };
}