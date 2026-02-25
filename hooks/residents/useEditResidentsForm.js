import { useState, useEffect } from "react";
import { getIndigenousStatus } from "@/services/configService";
import { getResidentBasicInfo } from "@/services/residentService";
import { getAvailableRooms } from "@/services/roomService";
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
  const [availableRooms, setAvailableRooms] = useState([]);
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
        console.log("Group ID field:", residentInfo?.groupId);
        setResident(residentInfo);
        
        // Fetch rooms for display
        try {
          const roomsResponse = await axios.get("/api/Rooms");
          console.log("Rooms API response:", roomsResponse.data);
          setRooms(roomsResponse.data.rooms || []);
        } catch (roomsError) {
          console.log("Error fetching rooms:", roomsError);
          setRooms([]);
        }

        // Initialize form with resident data
        if (residentInfo) {
          console.log("Initializing form with resident data...");
          updateFormData(residentInfo);
        }

        // Fetch available rooms for editing
        try {
          const availableRoomsData = await getAvailableRooms();
          console.log("Available rooms API response:", availableRoomsData);
          let availableRoomsList = availableRoomsData.rooms || [];
          
          // If resident has a current room that's not in available rooms, add it
          if (residentInfo?.roomId) {
            const currentRoomId = residentInfo.roomId;
            const currentRoomExists = availableRoomsList.some(room => room.id === currentRoomId);
            
            if (!currentRoomExists) {
              // Find the current room from the rooms array and add it to available rooms
              const currentRoom = rooms.find(r => r.id === currentRoomId);
              if (currentRoom) {
                availableRoomsList = [currentRoom, ...availableRoomsList];
                console.log("Added current room to available rooms:", currentRoom);
              }
            }
          }
          
          setAvailableRooms(availableRoomsList);
        } catch (availableRoomsError) {
          console.log("Error fetching available rooms:", availableRoomsError);
          setAvailableRooms([]);
        }

        // Fetch groups
        try {
          const groupsResponse = await axios.get(OTHERS_API_ENDPOINTS.GROUPS);
          console.log("Groups API response:", groupsResponse.data);
          // Check the structure of groups data
          const groupsData = groupsResponse.data.groups || groupsResponse.data || [];
          console.log("Groups data extracted:", groupsData);
          setGroups(groupsData);
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

  // Add current room to available rooms if it's not already there
  useEffect(() => {
    if (resident?.roomId && rooms.length > 0 && availableRooms.length > 0) {
      const currentRoomId = resident.roomId;
      const currentRoomExists = availableRooms.some(room => room.id === currentRoomId);
      
      if (!currentRoomExists) {
        // Find current room from rooms array and add it to available rooms
        const currentRoom = rooms.find(r => r.id === currentRoomId);
        if (currentRoom) {
          setAvailableRooms(prev => [currentRoom, ...prev]);
          console.log("Added current room to available rooms:", currentRoom);
        }
      }
    }
  }, [resident?.roomId, rooms, availableRooms]);

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
    if (!roomId) return "Not specified";
    
    const room = rooms.find(r => r.id === roomId);
    console.log("Found room:", room);
    return room ? room.name : roomId.toString();
  };

  // Helper function to get group name by ID
  const getGroupNameById = (groupId) => {
    console.log("Getting group name for ID:", groupId);
    console.log("Type of groupId:", typeof groupId);
    console.log("Available groups:", groups);
    
    if (!groupId || groupId === 0 || groupId === "0") return "Not specified";
    
    // Convert both to strings for comparison since API returns string IDs
    const groupIdStr = String(groupId).trim();
    
    // Find group by string comparison
    const group = groups.find(g => String(g.id).trim() === groupIdStr);
    
    console.log("Found group:", group);
    
    if (group) {
      return group.name || groupIdStr;
    }
    
    return groupIdStr;
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
    availableRooms,
    groups,
    loading,
    error,
    getRoomNameById,
    getGroupNameById
  };
};