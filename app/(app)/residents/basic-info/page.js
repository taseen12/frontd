// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { ArrowLeft, Users, UserCheck, HeartPulse, Heart } from "lucide-react";
// import { getResidentBasicInfo } from "@/services/residentService";
// import { getAuthorisedRepresentativeByResidentId } from "@/services/authorisedRepresentative";
// import { getClinicalInfoByResidentId, updateClinicalInfo } from "@/services/clinicalInfo";
// import { getLifestyleInfoByResidentId, updateLifestyleInfo, getImportantDatesByResidentId, getResidentHobbies } from "@/services/lifestyleService";
// import { useEditResidentsForm } from "@/hooks/residents/useEditResidentsForm";
// import { useEditAuthorisedRepresentiveForm } from "@/hooks/authorisedRepresentive/useEditAuthorisedRepresentiveForm";
// import { useEditClinicalInfoForm } from "@/hooks/clinicalInfo/useEditClinicalInfoForm";
// import { useEditLifestyleForm } from "@/hooks/lifestyle/useEditLifestyleForm";
// import { OTHERS_API_ENDPOINTS } from "@/config/api";
// import axios from "@/lib/axios";
// import EditResidentForm from '@/app/(app)/residents/tab-content/EditResidentForm';
// import EditAuthorisedRepresentativeForm from '@/app/(app)/residents/tab-content/EditAuthorisedRepresentativeForm';
// import EditClinicalInfoForm from '@/app/(app)/residents/tab-content/EditClinicalInfoForm';
// import EditLifestyleForm from '@/app/(app)/residents/tab-content/EditLifestyleForm';

// export default function BasicInfoPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const residentId = searchParams.get('id');
  
//   const [resident, setResident] = useState(null);
//   const [authorisedRepresentative, setAuthorisedRepresentative] = useState(null);
//   const [clinicalInfo, setClinicalInfo] = useState(null);
//   const [lifestyleInfo, setLifestyleInfo] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [indigenousStatus, setIndigenousStatus] = useState([]);
//   const [loadingIndigenousStatus, setLoadingIndigenousStatus] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("personal");
//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [isEditingRepresentative, setIsEditingRepresentative] = useState(false);
//   const [isEditingClinical, setIsEditingClinical] = useState(false);
//   const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);
//   const [availableHobbies, setAvailableHobbies] = useState([]);

//   // Initialize resident form hook
//   const residentForm = useEditResidentsForm(residentId, {
//     id: residentId,
//     ref_no: "",
//     medicare_number: "",
//     centrelink_crn: "",
//     first_name: "",
//     surname: "",
//     date_of_birth: "",
//     gender: "",
//     identity: "",
//     language: "",
//     roomId: "",
//     groupId: 0
//   });

//   // Initialize authorised representative form hook
//   const representativeForm = useEditAuthorisedRepresentiveForm(residentId, authorisedRepresentative?.id);

//   // Initialize clinical info form hook
//   const clinicalForm = useEditClinicalInfoForm(residentId, clinicalInfo?.id);

//   // Initialize lifestyle form hook
//   const lifestyleForm = useEditLifestyleForm(residentId, lifestyleInfo?.id);

//   useEffect(() => {
//     const fetchResidentData = async () => {
//       try {
//         setLoading(true);
        
//         if (!residentId) {
//           setError("Resident ID is required");
//           return;
//         }
        
//         // Fetch resident details using basic info API
//         const residentData = await getResidentBasicInfo(residentId);
//         const residentInfo = residentData.resident || residentData;
//         console.log("Resident data received:", residentInfo);
//         console.log("DOB field:", residentInfo?.dob);
//         console.log("Room ID field:", residentInfo?.roomId);
//         setResident(residentInfo);
        
//         // Initialize form with resident data
//         if (residentInfo) {
//           console.log("Initializing form with resident data...");
//           residentForm.updateFormData(residentInfo);
//         }
        
//         // Fetch authorised representative
//         try {
//           const repData = await getAuthorisedRepresentativeByResidentId(residentId);
//           setAuthorisedRepresentative(repData.authorizedRepresentive || repData);
          
//           // Initialize form with representative data
//           if (repData.authorizedRepresentive || repData) {
//             console.log("Initializing representative form with data...");
//             representativeForm.updateFormData(repData.authorizedRepresentive || repData);
//           }
//         } catch (repError) {
//           console.log("No authorised representative found:", repError);
//           setAuthorisedRepresentative(null);
//         }

//         // Fetch clinical information
//         try {
//           const clinicalData = await getClinicalInfoByResidentId(residentId);
//           setClinicalInfo(clinicalData.clinicalInfo || clinicalData);
          
//           // Initialize form with clinical data
//           if (clinicalData.clinicalInfo || clinicalData) {
//             console.log("Initializing clinical form with data...");
//             clinicalForm.updateFormData(clinicalData.clinicalInfo || clinicalData);
//           }
//         } catch (clinicalError) {
//           console.log("No clinical information found:", clinicalError);
//           setClinicalInfo(null);
//         }

//         // Fetch lifestyle information
//         try {
//           const lifestyleData = await getLifestyleInfoByResidentId(residentId);
//           console.log("Lifestyle data fetched:", lifestyleData);
//           setLifestyleInfo(lifestyleData.lifestyleInfo || lifestyleData);
//           // Initialize form with fetched data
//           if (lifestyleData.lifestyleInfo || lifestyleData) {
//             lifestyleForm.updateFormData(lifestyleData.lifestyleInfo || lifestyleData);
//           }
//         } catch (error) {
//           console.error("Error fetching lifestyle information:", error);
//         }

//         // Fetch available hobbies
//         try {
//           const { getHobbies } = await import("@/services/lifestyleService");
//           const hobbiesData = await getHobbies();
//           setAvailableHobbies(hobbiesData.hobbys || []);
//         } catch (hobbiesError) {
//           console.log("Failed to fetch available hobbies:", hobbiesError);
//           setAvailableHobbies([]);
//         }

//         // Fetch resident's selected hobbies
//         try {
//           const { getResidentHobbies } = await import("@/services/lifestyleService");
//           const residentHobbiesData = await getResidentHobbies(residentId);
//           console.log("Resident hobbies fetched:", residentHobbiesData);
          
//           // Update lifestyle info with resident hobbies
//           if (residentHobbiesData && residentHobbiesData.hobbys) {
//             setLifestyleInfo(prev => ({
//               ...prev,
//               residentHobbys: residentHobbiesData.hobbys
//             }));
//           }
//         } catch (residentHobbiesError) {
//           console.log("No resident hobbies found:", residentHobbiesError);
//         }

//         // Fetch resident's important dates
//         try {
//           const { getResidentImportantDates } = await import("@/services/lifestyleService");
//           const importantDatesData = await getResidentImportantDates(residentId);
//           console.log("Resident important dates fetched:", importantDatesData);
          
//           // Update lifestyle info with important dates
//           if (importantDatesData && importantDatesData.importantDates) {
//             setLifestyleInfo(prev => ({
//               ...prev,
//               importantDates: importantDatesData.importantDates
//             }));
//           }
//         } catch (importantDatesError) {
//           console.log("No resident important dates found:", importantDatesError);
//         }

//         // Fetch rooms
//         try {
//           const roomsResponse = await axios.get("/api/rooms");
//           console.log("Rooms API response:", roomsResponse.data);
//           setRooms(roomsResponse.data.rooms || []);
//         } catch (roomsError) {
//           console.log("Error fetching rooms:", roomsError);
//           setRooms([]);
//         }

//         // Fetch groups
//         try {
//           const groupsResponse = await axios.get(OTHERS_API_ENDPOINTS.GROUPS);
//           console.log("Groups API response:", groupsResponse.data);
//           setGroups(groupsResponse.data.groups || []);
//         } catch (groupsError) {
//           console.log("Error fetching groups:", groupsError);
//           setGroups([]);
//         }

//         // Fetch indigenous status
//         try {
//           setLoadingIndigenousStatus(true);
//           const { getIndigenousStatus } = await import("@/services/configService");
//           const indigenousStatusData = await getIndigenousStatus();
//           console.log("Indigenous status API response:", indigenousStatusData);
          
//           // Handle the response structure - based on your API response, it's { inds: [...] }
//           setIndigenousStatus(indigenousStatusData.inds || []);
//         } catch (statusError) {
//           console.log("Error fetching indigenous status:", statusError);
//           setIndigenousStatus([]);
//         } finally {
//           setLoadingIndigenousStatus(false);
//         }
        
//       } catch (err) {
//         console.error("Error fetching resident data:", err);
//         setError("Failed to load resident details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (residentId) {
//       fetchResidentData();
//     }
//   }, [residentId]);

//   const handleSave = async () => {
//     try {
//       setSaving(true);
      
//       // Update resident personal information using hook
//       if (resident) {
//         await residentForm.submitResidentData();
//       }
      
//       // Update authorised representative
//       if (authorisedRepresentative) {
//         const repPayload = {
//           residentId: residentId,
//           representiveFullName: authorisedRepresentative.fullName,
//           representivePhone: authorisedRepresentative.phone,
//           representiveEmail: authorisedRepresentative.email,
//           relationshipToResident: authorisedRepresentative.relationship,
//           legalAuthorityStatus: authorisedRepresentative.legalAuthorityStatus
//         };
//         await updateAuthorisedRepresentative(repPayload);
//       }
      
//       // Update clinical information
//       if (clinicalInfo) {
//         const clinicalPayload = {
//           residentId: residentId,
//           mobilityStatus: clinicalInfo.mobilityStatus,
//           cognitiveStatus: clinicalInfo.cognitiveStatus,
//           dietaryRequirements: clinicalInfo.dietaryRequirement,
//           assignedStaffId: clinicalInfo.assignedStuffId,
//           criticalAllergies: clinicalInfo.criticalAllergies,
//           notes: clinicalInfo.notes,
//           primaryPhysicianName: clinicalInfo.primaryPhysicianName,
//           primaryPhysicianPhone: clinicalInfo.primaryPhysicianPhone,
//           primaryPhysicianAddress: clinicalInfo.primaryPhysicianAddress,
//           primaryPhysicianEmail: clinicalInfo.primaryPhysicianEmail
//         };
//         await updateClinicalInfo(clinicalPayload);
//       }
      
//       // Update lifestyle information
//       if (lifestyleInfo) {
//         const lifestylePayload = {
//           residentId: residentId,
//           placeOfBirth: lifestyleInfo.placeOfBirth,
//           childhoodInfo: lifestyleInfo.childhoodInfo,
//           educaitonInfo: lifestyleInfo.educationInfo,
//           careerInfo: lifestyleInfo.careerInfo,
//           achivements: lifestyleInfo.achivements,
//           religiousView: lifestyleInfo.religiousView,
//           typicalWakeupTime: lifestyleInfo.typicalWakeUpTime,
//           sleepHabbit: lifestyleInfo.sleepHabbit,
//           extraNotes: lifestyleInfo.extraNotes
//         };
//         await updateLifestyleInfo(lifestylePayload);
//       }
      
//       // Navigate back to details page
//       router.push(`/residents/basic-info?id=${residentId}`);
      
//     } catch (err) {
//       console.error("Error saving resident data:", err);
//       setError("Failed to save resident information");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push(`/residents/basic-info?id=${residentId}`);
//   };

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//   };

//   // Helper functions to get names by ID
//   const getRoomNameById = (roomId) => {
//     console.log("Getting room name for ID:", roomId);
//     console.log("Available rooms:", rooms);
//     const room = rooms.find(r => r.id === roomId);
//     const roomName = room ? room.name : roomId || "Not specified";
//     console.log("Room name result:", roomName);
//     return roomName;
//   };

//   const getGroupNameById = (groupId) => {
//     console.log("Getting group name for ID:", groupId);
//     console.log("Available groups:", groups);
//     const group = groups.find(g => g.id === groupId);
//     const groupName = group ? group.name : groupId || "Not specified";
//     console.log("Group name result:", groupName);
//     return groupName;
//   };

//   // Form handlers for EditResidentForm using hook
//   const formHandlers = {
//     formData: residentForm.formData,
//     errors: residentForm.errors,
//     handleChange: residentForm.handleChange,
//     handleSelectChange: residentForm.handleSelectChange,
//     submitResidentData: async () => {
//       const success = await residentForm.submitResidentData();
//       if (success) {
//         // Refresh resident data after successful update
//         try {
//           const residentData = await getResidentBasicInfo(residentId);
//           const residentInfo = residentData.resident || residentData;
//           setResident(residentInfo);
//           // Exit edit mode and show updated data
//           setIsEditingPersonal(false);
//         } catch (error) {
//           console.error("Error refreshing resident data:", error);
//         }
//       }
//       return success;
//     },
//     isLoading: residentForm.isLoading,
//     rooms: rooms,
//     groups: groups,
//     indigenousStatus: indigenousStatus,
//     loadingIndigenousStatus: loadingIndigenousStatus
//   };

//   // Form handlers for EditAuthorisedRepresentativeForm
//   const representativeFormHandlers = {
//     formData: representativeForm.formData,
//     errors: representativeForm.errors,
//     handleChange: representativeForm.handleChange,
//     handleSelectChange: representativeForm.handleSelectChange,
//     submitAuthorisedRepresentativeData: async () => {
//       const success = await representativeForm.handleSubmit();
//       if (success) {
//         // Refresh representative data after successful update
//         try {
//           const repData = await getAuthorisedRepresentativeByResidentId(residentId);
//           setAuthorisedRepresentative(repData.authorizedRepresentive || repData);
//           // Exit edit mode and show updated data
//           setIsEditingRepresentative(false);
//         } catch (error) {
//           console.error("Error refreshing representative data:", error);
//         }
//       }
//       return success;
//     },
//     isLoading: representativeForm.isLoading
//   };

//   // Form handlers for EditAdmissionNotesForm
//   const clinicalFormHandlers = {
//     formData: clinicalForm.formData,
//     errors: clinicalForm.errors,
//     handleChange: clinicalForm.handleChange,
//     handleSelectChange: clinicalForm.handleSelectChange,
//     submitClinicalInfo: async () => {
//       const success = await clinicalForm.handleSubmit();
//       if (success) {
//         // Refresh clinical data after successful update
//         try {
//           const clinicalData = await getClinicalInfoByResidentId(residentId);
//           setClinicalInfo(clinicalData.clinicalInfo || clinicalData);
//           // Exit edit mode and show updated data
//           setIsEditingClinical(false);
//         } catch (error) {
//           console.error("Error refreshing clinical data:", error);
//         }
//       }
//       return success;
//     },
//     isLoading: clinicalForm.isLoading
//   };

//   // Form handlers for Lifestyle
//   const lifestyleFormHandlers = {
//     formData: lifestyleForm.formData,
//     errors: lifestyleForm.errors,
//     handleChange: lifestyleForm.handleChange,
//     handleSelectChange: lifestyleForm.handleSelectChange,
//     submitLifestyleInfo: async () => {
//       console.log('Basic-info submitLifestyleInfo called');
//       const success = await lifestyleForm.handleSubmit();
//       console.log('Basic-info lifestyleForm.handleSubmit result:', success);
      
//       if (success) {
//         // Refresh lifestyle data after successful update
//         try {
//           console.log('Refreshing lifestyle data...');
          
//           // Fetch all data in parallel using the correct service functions
//           const [lifestyleData, hobbiesData, datesData] = await Promise.all([
//             getLifestyleInfoByResidentId(residentId),
//             getResidentHobbies(residentId).catch(err => {
//               console.log('No hobbies found:', err);
//               return { hobbys: [] };
//             }),
//             getImportantDatesByResidentId(residentId).catch(err => {
//               console.log('No important dates found:', err);
//               return { importantDates: [] };
//             })
//           ]);
          
//           console.log('Refreshed lifestyle data:', lifestyleData);
          
//           // Combine all the data
//           const updatedLifestyleInfo = {
//             ...(lifestyleData.lifestyleInfo || lifestyleData),
//             residentHobbys: hobbiesData.hobbys || [],
//             importantDates: datesData.importantDates || []
//           };
          
//           console.log('Final updated lifestyle data with hobbies and dates:', updatedLifestyleInfo);
//           setLifestyleInfo(updatedLifestyleInfo);
          
//           // Exit edit mode
//           setIsEditingLifestyle(false);
//           console.log('Edit mode exited, data refreshed');
          
//         } catch (error) {
//           console.error('Error refreshing lifestyle data:', error);
//           // Still exit edit mode even if refresh fails
//           setIsEditingLifestyle(false);
          
//           // Try to at least get the basic lifestyle info
//           try {
//             const basicLifestyle = await getLifestyleInfoByResidentId(residentId);
//             setLifestyleInfo(basicLifestyle.lifestyleInfo || basicLifestyle);
//           } catch (fallbackError) {
//             console.error('Could not refresh any data:', fallbackError);
//           }
//         }
//       }
//       return success;
//     },
//     isLoading: lifestyleForm.isLoading
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading resident data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !resident) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600">{error || "Resident not found"}</p>
//           <button
//             onClick={() => router.back()}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//   { id: "personal", label: "Resident Intake", icon: Users },
//   { id: "representative", label: "Authorised Representative", icon: UserCheck },
//   { id: "clinical", label: "Clinical Info", icon: HeartPulse },
//   { id: "lifestyle", label: "Lifestyle", icon: Heart }
// ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Resident: {resident.firstName} {resident.surname}
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   Reference: {resident.refNo}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-700 mb-6">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   flex items-center gap-2 px-4 py-2 text-sm font-medium
//                   rounded-t-md transition cursor-pointer
//                   ${
//                     isActive
//                       ? "bg-blue-900 text-white dark:bg-yellow-500 dark:text-gray-900"
//                       : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
//                   }
//                 `}
//               >
//                 <Icon size={16} />
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 min-h-[320px]">
//           {activeTab === "personal" && (
//             <div className="space-y-6">
//               {!isEditingPersonal ? (
//                 <>
//                   <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6">
//                       <h1 className="text-2xl font-bold text-[#004a99]">Resident Information</h1>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Resident Basic Information
//                       </p>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Section 1: Personal Identity */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             1. Personal Identity
//                           </h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">First Name</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.firstName || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Surname</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.surname || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Date of Birth</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.dob ? new Date(resident.dob).toLocaleDateString() : "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Gender</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.gender || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Identity</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.identity || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Language</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.language || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Room</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {getRoomNameById(resident?.roomId)}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Group</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {getGroupNameById(resident?.groupId)}
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 2: Government & Healthcare Identifiers */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             2. Government & Healthcare Identifiers
//                           </h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Medicare Number</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.medicareNumber || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Centrelink CRN</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.centrelinkCRN || "Not specified"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingPersonal(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <EditResidentForm 
//                   {...formHandlers}
//                   onCancel={() => setIsEditingPersonal(false)}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "representative" && (
//             <div className="space-y-6">
//               {!isEditingRepresentative ? (
//                 <>
//                   <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6">
//                       <h1 className="text-2xl font-bold text-[#004a99]">Authorised Representative Information</h1>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Person Responsible for Resident/Guest
//                       </p>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Authorised Representative Section */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             Authorised Representative Details
//                           </h2>
//                         </div>
                        
//                         {authorisedRepresentative ? (
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Full Name</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {authorisedRepresentative.fullName || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Relationship</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {authorisedRepresentative.relationship || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Phone</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {authorisedRepresentative.phone || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Email</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {authorisedRepresentative.email || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Legal Authority Status</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {authorisedRepresentative.legalAuthorityStatus || "Not specified"}
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="text-center py-8">
//                             <p className="text-gray-500">No authorised representative information found</p>
//                           </div>
//                         )}
//                       </section>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingRepresentative(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <EditAuthorisedRepresentativeForm 
//                   {...representativeFormHandlers}
//                   onNext={() => handleTabChange("notes")}
//                   onCancel={() => setIsEditingRepresentative(false)}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "clinical" && (
//             <div className="space-y-6">
//               {!isEditingClinical ? (
//                 <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6 border-b border-gray-200 pb-4">
//                       <h1 className="text-2xl font-bold text-[#004a99]">Resident Admission & Clinical Intake</h1>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Required for Care Planning
//                       </p>
//                     </div>

//                     <form className="space-y-8">
//                       {/* Section 1: Clinical Assessment & Admission Notes */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             1. Clinical Assessment & Admission Notes
//                           </h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Mobility Status</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.mobilityStatus || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Cognitive Status (Dementia/Confusion)</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.cognitiveStatus || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Dietary Requirements</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.dietaryRequirement || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Assigned Staff ID</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.assignedStaffId || "Not specified"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 2: Clinical Notes */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             2. Clinical Notes
//                           </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 gap-x-6 gap-y-4">
//                            <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Critical Allergies</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[60px] resize-none">
//                               {clinicalInfo?.criticalAllergies || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Initial Clinical Observations & Admission Notes
// </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[60px] resize-none">
//                               {clinicalInfo?.notes || "No notes available"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 3: Primary Physician Information */}
//                       <section>
//                         <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             3. Primary Physician Information
//                           </h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Physician Name</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.primaryPhysicianName || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Physician Phone</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.primaryPhysicianPhone || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Physician Address</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.primaryPhysicianAddress || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Physician Email</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.primaryPhysicianEmail || "Not specified"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </form>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingClinical(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <EditClinicalInfoForm 
//                     {...clinicalFormHandlers}
//                     onCancel={() => setIsEditingClinical(false)}
//                   />
//                 )}
//             </div>
//           )}

//           {activeTab === "lifestyle" && (
//             <div className="space-y-6">
//               {!isEditingLifestyle ? (
//                 <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                   {/* Header */}
//                   <div className="mb-6 border-b border-gray-200 pb-4">
//                     <h1 className="text-2xl font-bold text-[#004a99]">Lifestyle Information</h1>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Personal Preferences & Activities
//                     </p>
//                   </div>

//                   <form className="space-y-8">
//                     {/* Section 1: Personal History & Background */}
//                     <section>
//                       <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                         <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                           1. Personal History & Background
//                         </h2>
//                         <button
//                           onClick={() => setIsEditingLifestyle('personal')}
//                           className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Place of Birth</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.placeOfBirth || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Childhood Information</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.childhoodInfo || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Education Information</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.educationInfo || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Career Information</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.careerInfo || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Achievements</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.achivements || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Religious Views</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.religiousView || "Not specified"}
//                           </div>
//                         </div>
//                       </div>
//                     </section>

//                     {/* Section 2: Daily Routine & Preferences */}
//                     <section>
//                       <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                         <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                           2. Daily Routine & Preferences
//                         </h2>
//                         {/* <button
//                           onClick={() => setIsEditingLifestyle('personal')}
//                           className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                         >
//                           Edit
//                         </button> */}
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Typical Wake-up Time</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.typicalWakeUpTime || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Sleep Habits</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.sleepHabbit || "Not specified"}
//                           </div>
//                         </div>
//                         <div className="flex flex-col">
//                           <label className="text-xs font-semibold mb-1">Additional Notes</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             {lifestyleInfo.extraNotes || "Not specified"}
//                           </div>
//                         </div>
//                       </div>
//                     </section>

//                     {/* Section 3: Important Dates */}
//                     <section>
//                       <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                         <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                           3. Important Dates & Reason
//                         </h2>
//                         <button
//                           onClick={() => setIsEditingLifestyle('dates')}
//                           className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                       <div className="grid grid-cols-1 gap-x-6 gap-y-4">
//                         <div className="flex flex-col">
//                           <h3 className="text-xs font-semibold text-gray-700 mb-4">Important Dates & Reason</h3>
                          
//                           {lifestyleInfo.importantDates && lifestyleInfo.importantDates.length > 0 ? (
//                             <div className="space-y-3">
//                               {lifestyleInfo.importantDates.map((date, index) => (
//                                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
//                                   <div className="flex items-center gap-3">
//                                     <input 
//                                       type="date"
//                                       value={date.date || ''}
//                                       readOnly
//                                       className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300"
//                                     />
//                                     <input 
//                                       type="text"
//                                       value={date.reason || ''}
//                                       readOnly
//                                       placeholder="Reason for this date (e.g., Birthday, Anniversary)"
//                                       className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400"
//                                     />
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="text-center py-8">
//                               <p className="text-gray-500">No important dates recorded</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </section>

//                     {/* Section 4: Hobbies & Interests */}
//                     <section>
//                       <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                         <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                           4. Hobbies & Interests
//                         </h2>
//                         <button
//                           onClick={() => setIsEditingLifestyle('hobbies')}
//                           className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                       <div className="space-y-4 mb-4">
//                         <h3 className="text-xs font-medium text-gray-800 mb-4">
//                           Select hobbies resident enjoys:
//                         </h3>
                        
//                         {lifestyleInfo.residentHobbys && lifestyleInfo.residentHobbys.length > 0 ? (
//                           <div className="flex flex-wrap gap-3 pl-0">
//                             {availableHobbies.map((hobby) => {
//                               const isSelected = lifestyleInfo.residentHobbys?.includes(hobby.id);
                              
//                               return (
//                                 <button
//                                   key={hobby.id}
//                                   type="button"
//                                   className={`px-6 py-2 rounded-full border transition-all duration-200 text-sm font-semibold ${
//                                     isSelected 
//                                       ? 'bg-[#004a99] border-[#004a99] text-white' 
//                                       : 'bg-white dark:bg-gray-700 border-[#004a99] text-[#004a99] dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
//                                   }`}
//                                 >
//                                   {hobby.name}
//                                 </button>
//                               );
//                             })}
//                           </div>
//                         ) : (
//                           <p className="text-sm text-gray-500 italic">No hobbies recorded</p>
//                         )}
//                       </div>
//                     </section>
//                   </form>
//                 </div>
//               ) : (
//                 <EditLifestyleForm 
//                   {...lifestyleFormHandlers}
//                   onCancel={() => setIsEditingLifestyle(false)}
//                   residentId={residentId}
//                   editSection={isEditingLifestyle}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Users, UserCheck, HeartPulse, Heart } from "lucide-react";
import { getAuthorisedRepresentativeByResidentId } from "@/services/authorisedRepresentative";
import { getClinicalInfoByResidentId, updateClinicalInfo } from "@/services/clinicalInfo";
import { getLifestyleInfoByResidentId, updateLifestyleInfo, getImportantDatesByResidentId, getResidentHobbies } from "@/services/lifestyleService";
import { useEditResidentsForm } from "@/hooks/residents/useEditResidentsForm";
import { useEditAuthorisedRepresentiveForm } from "@/hooks/authorisedRepresentive/useEditAuthorisedRepresentiveForm";
import { useEditClinicalInfoForm } from "@/hooks/clinicalInfo/useEditClinicalInfoForm";
import { useEditLifestyleForm } from "@/hooks/lifestyle/useEditLifestyleForm";
import EditResidentForm from '@/app/(app)/residents/tab-content/EditResidentForm';
import EditAuthorisedRepresentativeForm from '@/app/(app)/residents/tab-content/EditAuthorisedRepresentativeForm';
import EditClinicalInfoForm from '@/app/(app)/residents/tab-content/EditClinicalInfoForm';
import EditLifestyleForm from '@/app/(app)/residents/tab-content/EditLifestyleForm';

export default function BasicInfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const residentId = searchParams.get('id');
  
  const [authorisedRepresentative, setAuthorisedRepresentative] = useState(null);
  const [clinicalInfo, setClinicalInfo] = useState(null);
  const [lifestyleInfo, setLifestyleInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingRepresentative, setIsEditingRepresentative] = useState(false);
  const [isEditingClinical, setIsEditingClinical] = useState(false);
  const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);
  const [availableHobbies, setAvailableHobbies] = useState([]);
  const [saving, setSaving] = useState(false);

  // Initialize resident form hook - now contains ALL resident-related code
  const residentForm = useEditResidentsForm(residentId, {
    id: residentId,
    ref_no: "",
    medicare_number: "",
    centrelink_crn: "",
    first_name: "",
    surname: "",
    date_of_birth: "",
    gender: "",
    identity: "",
    language: "",
    roomId: "",
    groupId: 0
  });

  // Initialize authorised representative form hook
  const representativeForm = useEditAuthorisedRepresentiveForm(residentId, authorisedRepresentative?.id);

  // Initialize clinical info form hook
  const clinicalForm = useEditClinicalInfoForm(residentId, clinicalInfo?.id);

  // Initialize lifestyle form hook
  const lifestyleForm = useEditLifestyleForm(residentId, lifestyleInfo?.id);

  // Fetch non-resident data
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (!residentId) return;
      
      // Fetch authorised representative
      try {
        const repData = await getAuthorisedRepresentativeByResidentId(residentId);
        setAuthorisedRepresentative(repData.authorizedRepresentive || repData);
        
        if (repData.authorizedRepresentive || repData) {
          console.log("Initializing representative form with data...");
          representativeForm.updateFormData(repData.authorizedRepresentive || repData);
        }
      } catch (repError) {
        console.log("No authorised representative found:", repError);
        setAuthorisedRepresentative(null);
      }

      // Fetch clinical information
      try {
        const clinicalData = await getClinicalInfoByResidentId(residentId);
        setClinicalInfo(clinicalData.clinicalInfo || clinicalData);
        
        if (clinicalData.clinicalInfo || clinicalData) {
          console.log("Initializing clinical form with data...");
          clinicalForm.updateFormData(clinicalData.clinicalInfo || clinicalData);
        }
      } catch (clinicalError) {
        console.log("No clinical information found:", clinicalError);
        setClinicalInfo(null);
      }

      // Fetch lifestyle information
      try {
        const lifestyleData = await getLifestyleInfoByResidentId(residentId);
        console.log("Lifestyle data fetched:", lifestyleData);
        setLifestyleInfo(lifestyleData.lifestyleInfo || lifestyleData);
        if (lifestyleData.lifestyleInfo || lifestyleData) {
          lifestyleForm.updateFormData(lifestyleData.lifestyleInfo || lifestyleData);
        }
      } catch (error) {
        console.error("Error fetching lifestyle information:", error);
      }

      // Fetch available hobbies
      try {
        const { getHobbies } = await import("@/services/lifestyleService");
        const hobbiesData = await getHobbies();
        setAvailableHobbies(hobbiesData.hobbys || []);
      } catch (hobbiesError) {
        console.log("Failed to fetch available hobbies:", hobbiesError);
        setAvailableHobbies([]);
      }

      // Fetch resident's selected hobbies
      try {
        const { getResidentHobbies } = await import("@/services/lifestyleService");
        const residentHobbiesData = await getResidentHobbies(residentId);
        console.log("Resident hobbies fetched:", residentHobbiesData);
        
        if (residentHobbiesData && residentHobbiesData.hobbys) {
          setLifestyleInfo(prev => ({
            ...prev,
            residentHobbys: residentHobbiesData.hobbys
          }));
        }
      } catch (residentHobbiesError) {
        console.log("No resident hobbies found:", residentHobbiesError);
      }

      // Fetch resident's important dates
      try {
        const { getResidentImportantDates } = await import("@/services/lifestyleService");
        const importantDatesData = await getResidentImportantDates(residentId);
        console.log("Resident important dates fetched:", importantDatesData);
        
        if (importantDatesData && importantDatesData.importantDates) {
          setLifestyleInfo(prev => ({
            ...prev,
            importantDates: importantDatesData.importantDates
          }));
        }
      } catch (importantDatesError) {
        console.log("No resident important dates found:", importantDatesError);
      }
    };

    if (residentId) {
      fetchAdditionalData();
    }
  }, [residentId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Update resident personal information using hook
      if (residentForm.resident) {
        await residentForm.submitResidentData();
      }
      
      // Update authorised representative
      if (authorisedRepresentative) {
        const repPayload = {
          residentId: residentId,
          representiveFullName: authorisedRepresentative.fullName,
          representivePhone: authorisedRepresentative.phone,
          representiveEmail: authorisedRepresentative.email,
          relationshipToResident: authorisedRepresentative.relationship,
          legalAuthorityStatus: authorisedRepresentative.legalAuthorityStatus
        };
        await updateAuthorisedRepresentative(repPayload);
      }
      
      // Update clinical information
      if (clinicalInfo) {
        const clinicalPayload = {
          residentId: residentId,
          mobilityStatus: clinicalInfo.mobilityStatus,
          cognitiveStatus: clinicalInfo.cognitiveStatus,
          dietaryRequirements: clinicalInfo.dietaryRequirement,
          assignedStaffId: clinicalInfo.assignedStuffId,
          criticalAllergies: clinicalInfo.criticalAllergies,
          notes: clinicalInfo.notes,
          primaryPhysicianName: clinicalInfo.primaryPhysicianName,
          primaryPhysicianPhone: clinicalInfo.primaryPhysicianPhone,
          primaryPhysicianAddress: clinicalInfo.primaryPhysicianAddress,
          primaryPhysicianEmail: clinicalInfo.primaryPhysicianEmail
        };
        await updateClinicalInfo(clinicalPayload);
      }
      
      // Update lifestyle information
      if (lifestyleInfo) {
        const lifestylePayload = {
          residentId: residentId,
          placeOfBirth: lifestyleInfo.placeOfBirth,
          childhoodInfo: lifestyleInfo.childhoodInfo,
          educaitonInfo: lifestyleInfo.educationInfo,
          careerInfo: lifestyleInfo.careerInfo,
          achivements: lifestyleInfo.achivements,
          religiousView: lifestyleInfo.religiousView,
          typicalWakeupTime: lifestyleInfo.typicalWakeUpTime,
          sleepHabbit: lifestyleInfo.sleepHabbit,
          extraNotes: lifestyleInfo.extraNotes
        };
        await updateLifestyleInfo(lifestylePayload);
      }
      
      // Navigate back to details page
      router.push(`/residents/basic-info?id=${residentId}`);
      
    } catch (err) {
      console.error("Error saving resident data:", err);
      setError("Failed to save resident information");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/residents/basic-info?id=${residentId}`);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Form handlers for EditResidentForm using hook
  const formHandlers = {
    formData: residentForm.formData,
    errors: residentForm.errors,
    handleChange: residentForm.handleChange,
    handleSelectChange: residentForm.handleSelectChange,
    submitResidentData: async () => {
      const success = await residentForm.submitResidentData();
      if (success) {
        setIsEditingPersonal(false);
      }
      return success;
    },
    isLoading: residentForm.isLoading,
    rooms: residentForm.rooms,
    groups: residentForm.groups,
    indigenousStatus: residentForm.indigenousStatus,
    loadingIndigenousStatus: residentForm.loadingIndigenousStatus
  };

  // Form handlers for EditAuthorisedRepresentativeForm
  const representativeFormHandlers = {
    formData: representativeForm.formData,
    errors: representativeForm.errors,
    handleChange: representativeForm.handleChange,
    handleSelectChange: representativeForm.handleSelectChange,
    submitAuthorisedRepresentativeData: async () => {
      const success = await representativeForm.handleSubmit();
      if (success) {
        try {
          const repData = await getAuthorisedRepresentativeByResidentId(residentId);
          setAuthorisedRepresentative(repData.authorizedRepresentive || repData);
          setIsEditingRepresentative(false);
        } catch (error) {
          console.error("Error refreshing representative data:", error);
        }
      }
      return success;
    },
    isLoading: representativeForm.isLoading
  };

  // Form handlers for EditAdmissionNotesForm
  const clinicalFormHandlers = {
    formData: clinicalForm.formData,
    errors: clinicalForm.errors,
    handleChange: clinicalForm.handleChange,
    handleSelectChange: clinicalForm.handleSelectChange,
    submitClinicalInfo: async () => {
      const success = await clinicalForm.handleSubmit();
      if (success) {
        try {
          const clinicalData = await getClinicalInfoByResidentId(residentId);
          setClinicalInfo(clinicalData.clinicalInfo || clinicalData);
          setIsEditingClinical(false);
        } catch (error) {
          console.error("Error refreshing clinical data:", error);
        }
      }
      return success;
    },
    isLoading: clinicalForm.isLoading
  };

  // Form handlers for Lifestyle
  const lifestyleFormHandlers = {
    formData: lifestyleForm.formData,
    errors: lifestyleForm.errors,
    handleChange: lifestyleForm.handleChange,
    handleSelectChange: lifestyleForm.handleSelectChange,
    submitLifestyleInfo: async () => {
      console.log('Basic-info submitLifestyleInfo called');
      const success = await lifestyleForm.handleSubmit();
      console.log('Basic-info lifestyleForm.handleSubmit result:', success);
      
      if (success) {
        try {
          console.log('Refreshing lifestyle data...');
          
          const [lifestyleData, hobbiesData, datesData] = await Promise.all([
            getLifestyleInfoByResidentId(residentId),
            getResidentHobbies(residentId).catch(err => {
              console.log('No hobbies found:', err);
              return { hobbys: [] };
            }),
            getImportantDatesByResidentId(residentId).catch(err => {
              console.log('No important dates found:', err);
              return { importantDates: [] };
            })
          ]);
          
          console.log('Refreshed lifestyle data:', lifestyleData);
          
          const updatedLifestyleInfo = {
            ...(lifestyleData.lifestyleInfo || lifestyleData),
            residentHobbys: hobbiesData.hobbys || [],
            importantDates: datesData.importantDates || []
          };
          
          console.log('Final updated lifestyle data with hobbies and dates:', updatedLifestyleInfo);
          setLifestyleInfo(updatedLifestyleInfo);
          setIsEditingLifestyle(false);
          console.log('Edit mode exited, data refreshed');
          
        } catch (error) {
          console.error('Error refreshing lifestyle data:', error);
          setIsEditingLifestyle(false);
          
          try {
            const basicLifestyle = await getLifestyleInfoByResidentId(residentId);
            setLifestyleInfo(basicLifestyle.lifestyleInfo || basicLifestyle);
          } catch (fallbackError) {
            console.error('Could not refresh any data:', fallbackError);
          }
        }
      }
      return success;
    },
    isLoading: lifestyleForm.isLoading
  };

  if (residentForm.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resident data...</p>
        </div>
      </div>
    );
  }

  if (residentForm.error || !residentForm.resident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{residentForm.error || "Resident not found"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Resident Intake", icon: Users },
    { id: "representative", label: "Authorised Representative", icon: UserCheck },
    { id: "clinical", label: "Clinical Info", icon: HeartPulse },
    { id: "lifestyle", label: "Lifestyle", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Resident: {residentForm.resident.firstName} {residentForm.resident.surname}
                </h1>
                <p className="text-gray-600 mt-1">
                  Reference: {residentForm.resident.refNo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-700 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 text-sm font-medium
                  rounded-t-md transition cursor-pointer
                  ${
                    isActive
                      ? "bg-blue-900 text-white dark:bg-yellow-500 dark:text-gray-900"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 min-h-[320px]">
          {activeTab === "personal" && (
            <div className="space-y-6">
              {!isEditingPersonal ? (
                <>
                  <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold text-[#004a99]">Resident Information</h1>
                      <p className="text-xs text-gray-500 mt-1">
                        Resident Basic Information
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Section 1: Personal Identity */}
                      <section>
                        <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                          <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                            1. Personal Identity
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">First Name</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.firstName || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Surname</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.surname || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Date of Birth</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.dob ? new Date(residentForm.resident.dob).toLocaleDateString() : "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Gender</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.gender || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Identity</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.identity || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Language</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.language || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Room</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.getRoomNameById(residentForm.resident?.roomId)}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Group</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.getGroupNameById(residentForm.resident?.groupId)}
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Section 2: Government & Healthcare Identifiers */}
                      <section>
                        <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                          <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                            2. Government & Healthcare Identifiers
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Medicare Number</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.medicareNumber || "Not specified"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-xs font-semibold mb-1">Centrelink CRN</label>
                            <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {residentForm.resident?.centrelinkCRN || "Not specified"}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setIsEditingPersonal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <EditResidentForm 
                  {...formHandlers}
                  onCancel={() => setIsEditingPersonal(false)}
                />
              )}
            </div>
          )}

          {activeTab === "representative" && (
            <div className="space-y-6">
              {!isEditingRepresentative ? (
                <>
                  <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold text-[#004a99]">Authorised Representative Information</h1>
                      <p className="text-xs text-gray-500 mt-1">
                        Person Responsible for Resident/Guest
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Authorised Representative Section */}
                      <section>
                        <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                          <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                            Authorised Representative Details
                          </h2>
                        </div>
                        
                        {authorisedRepresentative ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="flex flex-col">
                              <label className="text-xs font-semibold mb-1">Full Name</label>
                              <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {authorisedRepresentative.fullName || "Not specified"}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="text-xs font-semibold mb-1">Relationship</label>
                              <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {authorisedRepresentative.relationship || "Not specified"}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="text-xs font-semibold mb-1">Phone</label>
                              <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {authorisedRepresentative.phone || "Not specified"}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="text-xs font-semibold mb-1">Email</label>
                              <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {authorisedRepresentative.email || "Not specified"}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="text-xs font-semibold mb-1">Legal Authority Status</label>
                              <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {authorisedRepresentative.legalAuthorityStatus || "Not specified"}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No authorised representative information found</p>
                          </div>
                        )}
                      </section>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setIsEditingRepresentative(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <EditAuthorisedRepresentativeForm 
                  {...representativeFormHandlers}
                  onNext={() => handleTabChange("notes")}
                  onCancel={() => setIsEditingRepresentative(false)}
                />
              )}
            </div>
          )}

          {activeTab === "clinical" && (
            <div className="space-y-6">
              {!isEditingClinical ? (
                <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
                  {/* Header */}
                  <div className="mb-6 border-b border-gray-200 pb-4">
                    <h1 className="text-2xl font-bold text-[#004a99]">Resident Admission & Clinical Intake</h1>
                    <p className="text-xs text-gray-500 mt-1">
                      Required for Care Planning
                    </p>
                  </div>

                  <form className="space-y-8">
                    {/* Section 1: Clinical Assessment & Admission Notes */}
                    <section>
                      <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          1. Clinical Assessment & Admission Notes
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Mobility Status</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.mobilityStatus || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Cognitive Status (Dementia/Confusion)</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.cognitiveStatus || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Dietary Requirements</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.dietaryRequirement || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Assigned Staff ID</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.assignedStaffId || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 2: Clinical Notes */}
                    <section>
                      <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          2. Clinical Notes
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Critical Allergies</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[60px] resize-none">
                            {clinicalInfo?.criticalAllergies || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Initial Clinical Observations & Admission Notes</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[60px] resize-none">
                            {clinicalInfo?.notes || "No notes available"}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 3: Primary Physician Information */}
                    <section>
                      <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          3. Primary Physician Information
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Physician Name</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.primaryPhysicianName || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Physician Phone</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.primaryPhysicianPhone || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Physician Address</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.primaryPhysicianAddress || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Physician Email</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {clinicalInfo?.primaryPhysicianEmail || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </section>
                  </form>
                  
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setIsEditingClinical(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <EditClinicalInfoForm 
                  {...clinicalFormHandlers}
                  onCancel={() => setIsEditingClinical(false)}
                />
              )}
            </div>
          )}

          {activeTab === "lifestyle" && (
            <div className="space-y-6">
              {!isEditingLifestyle ? (
                <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
                  {/* Header */}
                  <div className="mb-6 border-b border-gray-200 pb-4">
                    <h1 className="text-2xl font-bold text-[#004a99]">Lifestyle Information</h1>
                    <p className="text-xs text-gray-500 mt-1">
                      Personal Preferences & Activities
                    </p>
                  </div>

                  <form className="space-y-8">
                    {/* Section 1: Personal History & Background */}
                    <section>
                      <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          1. Personal History & Background
                        </h2>
                        <button
                          onClick={() => setIsEditingLifestyle('personal')}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Place of Birth</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.placeOfBirth || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Childhood Information</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.childhoodInfo || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Education Information</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.educationInfo || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Career Information</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.careerInfo || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Achievements</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.achivements || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Religious Views</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.religiousView || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 2: Daily Routine & Preferences */}
                    <section>
                      <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          2. Daily Routine & Preferences
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Typical Wake-up Time</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.typicalWakeUpTime || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Sleep Habits</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.sleepHabbit || "Not specified"}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold mb-1">Additional Notes</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {lifestyleInfo.extraNotes || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 3: Important Dates */}
                    <section>
                      <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          3. Important Dates & Reason
                        </h2>
                        <button
                          onClick={() => setIsEditingLifestyle('dates')}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                        <div className="flex flex-col">
                          <h3 className="text-xs font-semibold text-gray-700 mb-4">Important Dates & Reason</h3>
                          
                          {lifestyleInfo.importantDates && lifestyleInfo.importantDates.length > 0 ? (
                            <div className="space-y-3">
                              {lifestyleInfo.importantDates.map((date, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="date"
                                      value={date.date || ''}
                                      readOnly
                                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300"
                                    />
                                    <input 
                                      type="text"
                                      value={date.reason || ''}
                                      readOnly
                                      placeholder="Reason for this date (e.g., Birthday, Anniversary)"
                                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-300 placeholder-gray-400"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500">No important dates recorded</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Section 4: Hobbies & Interests */}
                    <section>
                      <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
                        <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
                          4. Hobbies & Interests
                        </h2>
                        <button
                          onClick={() => setIsEditingLifestyle('hobbies')}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="space-y-4 mb-4">
                        <h3 className="text-xs font-medium text-gray-800 mb-4">
                          Select hobbies resident enjoys:
                        </h3>
                        
                        {lifestyleInfo.residentHobbys && lifestyleInfo.residentHobbys.length > 0 ? (
                          <div className="flex flex-wrap gap-3 pl-0">
                            {availableHobbies.map((hobby) => {
                              const isSelected = lifestyleInfo.residentHobbys?.includes(hobby.id);
                              
                              return (
                                <button
                                  key={hobby.id}
                                  type="button"
                                  className={`px-6 py-2 rounded-full border transition-all duration-200 text-sm font-semibold ${
                                    isSelected 
                                      ? 'bg-[#004a99] border-[#004a99] text-white' 
                                      : 'bg-white dark:bg-gray-700 border-[#004a99] text-[#004a99] dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  {hobby.name}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No hobbies recorded</p>
                        )}
                      </div>
                    </section>
                  </form>
                </div>
              ) : (
                <EditLifestyleForm 
                  {...lifestyleFormHandlers}
                  onCancel={() => setIsEditingLifestyle(false)}
                  residentId={residentId}
                  editSection={isEditingLifestyle}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}