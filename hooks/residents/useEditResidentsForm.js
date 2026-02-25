// import { useState, useEffect } from "react";
// import { getIndigenousStatus } from "@/services/configService";

// export const useEditResidentsForm = (residentId, initialData = {}) => {
//   const [formData, setFormData] = useState(initialData);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [indigenousStatus, setIndigenousStatus] = useState([]);
//   const [loadingIndigenousStatus, setLoadingIndigenousStatus] = useState(false);

//   // Function to update form data with resident info
//   const updateFormData = (residentData) => {
//     console.log("updateFormData called with:", residentData);
//     console.log("residentData.identity:", residentData.identity);
//     console.log("residentData.indigenousStatus:", residentData.indigenousStatus);
//     console.log("residentData.indigenous_status:", residentData.indigenous_status);
    
//     const dateValue = residentData.dateOfBirth ? new Date(residentData.dateOfBirth).toISOString().split('T')[0] : "";
    
//     const formData = {
//       id: residentData.id || residentId,
//       ref_no: residentData.refNo || "",
//       medicare_number: residentData.medicareNumber || "",
//       centrelink_crn: residentData.centrelinkCRN || "",
//       first_name: residentData.firstName || "",
//       surname: residentData.surname || "",
//       date_of_birth: dateValue,
//       gender: residentData.gender || "",
//       identity: residentData.identity || residentData.inds || residentData.indigenousStatus || residentData.indigenous_status || "",
//       language: residentData.language || "",
//       room_id: residentData.roomId || "",
//       group_id: residentData.groupId || 0
//     };
//     console.log("Setting form data to:", formData);
//     console.log("Form identity field:", formData.identity);
//     setFormData(formData);
//   };

//   // Initialize form with resident data when available
//   useEffect(() => {
//     if (residentId && Object.keys(initialData).length === 0) {
//       // Only fetch if we don't have initial data
//       const fetchResidentData = async () => {
//         try {
//           // Dynamic import to avoid module resolution issues
//           const { getResidentBasicInfo } = await import("@/services/residentService");
//           const response = await getResidentBasicInfo(residentId);
//           const residentInfo = response.resident || response;
//           console.log("Fetched resident data:", residentInfo);
//           updateFormData(residentInfo);
//         } catch (error) {
//           console.error("Error fetching resident data:", error);
//         }
//       };
      
//       fetchResidentData();
//     }
//   }, [residentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const submitResidentData = async () => {
//     try {
//       setIsLoading(true);
//       setErrors({});
      
//       // Create payload matching API schema
//       const payload = {
//         id: residentId,
//         refNo: formData.ref_no || "", // Form: ref_no → API: refNo
//         medicareNumber: formData.medicare_number || "", // Form: medicare_number → API: medicareNumber
//         centrelinkCrn: formData.centrelink_crn || "", // Form: centrelink_crn → API: centrelinkCrn
//         firstName: formData.first_name || "", // Form: first_name → API: firstName
//         surname: formData.surname || "", // Form: surname → API: surname (matches)
//         dateOfBirth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : "", // Convert YYYY-MM-DD back to ISO
//         gender: formData.gender || "", // Form: gender → API: gender (matches)
//         identity: formData.identity || "", // Form: identity → API: identity (matches)
//         language: formData.language || "", // Form: language → API: language (matches)
//         roomId: formData.room_id || "", // Form: room_id → API: roomId
//         groupId: formData.group_id || 0 // Form: group_id → API: groupId
//       };

//       console.log("Submitting resident payload:", payload);
//       console.log("Form data:", formData);

//       // Dynamic import to avoid module resolution issues
//       const { editResident } = await import("@/services/residentService");
//       console.log("Submitting resident payload:", payload);
//       const response = await editResident(payload);
//       console.log("Update response:", response);
//       return response;
//     } catch (error) {
//       console.error("Error updating resident:", error);
//       setErrors({ 
//         submit: error.response?.data?.message || "Failed to update resident information" 
//       });
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch indigenous status options on component mount
//   useEffect(() => {
//     const loadIndigenousStatus = async () => {
//       setLoadingIndigenousStatus(true);
//       try {
//         const data = await getIndigenousStatus();
//         console.log("Indigenous Status API Response:", data);
//         // The API returns { inds: [...] } structure
//         setIndigenousStatus(data.inds || []);
//       } catch (error) {
//         console.error("Error loading indigenous status:", error);
//       } finally {
//         setLoadingIndigenousStatus(false);
//       }
//     };

//     loadIndigenousStatus();
//   }, []);

//   const resetForm = () => {
//     setFormData(initialData);
//     setErrors({});
//   };

//   return {
//     formData,
//     errors,
//     isLoading,
//     indigenousStatus,
//     loadingIndigenousStatus,
//     handleChange,
//     handleSelectChange,
//     submitResidentData,
//     resetForm,
//     updateFormData
//   };
// };


import { useState, useEffect } from "react";
import { getIndigenousStatus } from "@/services/configService";
import { getResidentBasicInfo } from "@/services/residentService";
import { OTHERS_API_ENDPOINTS } from "@/config/api";
import axios from "@/lib/axios";

export const useEditResidentsForm = (residentId, initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [indigenousStatus, setIndigenousStatus] = useState([]);
  const [loadingIndigenousStatus, setLoadingIndigenousStatus] = useState(false);
  
  // Additional state for resident data
  const [resident, setResident] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all initial data
  useEffect(() => {
    const fetchAllData = async () => {
      if (!residentId) return;
      
      try {
        setLoading(true);
        
        // Fetch resident details
        const residentData = await getResidentBasicInfo(residentId);
        const residentInfo = residentData.resident || residentData;
        console.log("Resident data received:", residentInfo);
        console.log("DOB field:", residentInfo?.dob);
        console.log("Room ID field:", residentInfo?.roomId);
        setResident(residentInfo);
        
        // Initialize form with resident data
        if (residentInfo) {
          console.log("Initializing form with resident data...");
          updateFormData(residentInfo);
        }

        // Fetch rooms
        try {
          const roomsResponse = await axios.get("/api/rooms");
          console.log("Rooms API response:", roomsResponse.data);
          setRooms(roomsResponse.data.rooms || []);
        } catch (roomsError) {
          console.log("Error fetching rooms:", roomsError);
          setRooms([]);
        }

        // Fetch groups
        try {
          const groupsResponse = await axios.get(OTHERS_API_ENDPOINTS.GROUPS);
          console.log("Groups API response:", groupsResponse.data);
          setGroups(groupsResponse.data.groups || []);
        } catch (groupsError) {
          console.log("Error fetching groups:", groupsError);
          setGroups([]);
        }

        // Fetch indigenous status
        try {
          setLoadingIndigenousStatus(true);
          const indigenousStatusData = await getIndigenousStatus();
          console.log("Indigenous status API response:", indigenousStatusData);
          setIndigenousStatus(indigenousStatusData.inds || []);
        } catch (statusError) {
          console.log("Error fetching indigenous status:", statusError);
          setIndigenousStatus([]);
        } finally {
          setLoadingIndigenousStatus(false);
        }
        
      } catch (err) {
        console.error("Error fetching resident data:", err);
        setError("Failed to load resident details");
      } finally {
        setLoading(false);
      }
    };

    if (residentId) {
      fetchAllData();
    }
  }, [residentId]);

  // Function to update form data with resident info
  const updateFormData = (residentData) => {
    console.log("updateFormData called with:", residentData);
    console.log("residentData.identity:", residentData.identity);
    console.log("residentData.indigenousStatus:", residentData.indigenousStatus);
    console.log("residentData.indigenous_status:", residentData.indigenous_status);
    
    const dateValue = residentData.dateOfBirth ? new Date(residentData.dateOfBirth).toISOString().split('T')[0] : "";
    
    const newFormData = {
      id: residentData.id || residentId,
      ref_no: residentData.refNo || "",
      medicare_number: residentData.medicareNumber || "",
      centrelink_crn: residentData.centrelinkCRN || "",
      first_name: residentData.firstName || "",
      surname: residentData.surname || "",
      date_of_birth: dateValue,
      gender: residentData.gender || "",
      identity: residentData.identity || residentData.inds || residentData.indigenousStatus || residentData.indigenous_status || "",
      language: residentData.language || "",
      room_id: residentData.roomId || "",
      group_id: residentData.groupId || 0
    };
    console.log("Setting form data to:", newFormData);
    console.log("Form identity field:", newFormData.identity);
    setFormData(newFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitResidentData = async () => {
    try {
      setIsLoading(true);
      setErrors({});
      
      // Create payload matching API schema
      const payload = {
        id: residentId,
        refNo: formData.ref_no || "",
        medicareNumber: formData.medicare_number || "",
        centrelinkCrn: formData.centrelink_crn || "",
        firstName: formData.first_name || "",
        surname: formData.surname || "",
        dateOfBirth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : "",
        gender: formData.gender || "",
        identity: formData.identity || "",
        language: formData.language || "",
        roomId: formData.room_id || "",
        groupId: formData.group_id || 0
      };

      console.log("Submitting resident payload:", payload);
      console.log("Form data:", formData);

      const { editResident } = await import("@/services/residentService");
      const response = await editResident(payload);
      console.log("Update response:", response);
      
      // Refresh resident data after successful update
      if (response) {
        const refreshedData = await getResidentBasicInfo(residentId);
        const refreshedInfo = refreshedData.resident || refreshedData;
        setResident(refreshedInfo);
        updateFormData(refreshedInfo);
      }
      
      return response;
    } catch (error) {
      console.error("Error updating resident:", error);
      setErrors({ 
        submit: error.response?.data?.message || "Failed to update resident information" 
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get room name by ID
  const getRoomNameById = (roomId) => {
    console.log("Getting room name for ID:", roomId);
    console.log("Available rooms:", rooms);
    const room = rooms.find(r => r.id === roomId);
    const roomName = room ? room.name : roomId || "Not specified";
    console.log("Room name result:", roomName);
    return roomName;
  };

  // Helper function to get group name by ID
  const getGroupNameById = (groupId) => {
    console.log("Getting group name for ID:", groupId);
    console.log("Available groups:", groups);
    const group = groups.find(g => g.id === groupId);
    const groupName = group ? group.name : groupId || "Not specified";
    console.log("Group name result:", groupName);
    return groupName;
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    // Form state and handlers
    formData,
    errors,
    isLoading,
    indigenousStatus,
    loadingIndigenousStatus,
    handleChange,
    handleSelectChange,
    submitResidentData,
    resetForm,
    updateFormData,
    
    // Resident data and helpers
    resident,
    rooms,
    groups,
    loading,
    error,
    getRoomNameById,
    getGroupNameById
  };
};