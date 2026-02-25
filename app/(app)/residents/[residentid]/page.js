// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft, Save, Users, FileText, UserCheck, Calendar, Phone, Mail, MapPin, Heart, Brain, Utensils, BookOpen, Music, Star, HeartPulse, Clock, Moon, Church, Trophy, Briefcase, Shield, Upload } from "lucide-react";
// import { getResidentById, getResidentBasicInfo } from "@/services/residentService";
// import { getAuthorisedRepresentativeByResidentId } from "@/services/authorisedRepresentative";
// import { getClinicalInfoByResidentId } from "@/services/clinicalInfo";
// import { getLifestyleInfoByResidentId } from "@/services/lifestyleService";
// import { getDocumentsByResidentId } from "@/services/documentService";
// import { updateResident } from "@/services/residentService";
// import { updateAuthorisedRepresentative } from "@/services/authorisedRepresentative";
// import { updateClinicalInfo } from "@/services/clinicalInfo";
// import { updateLifestyleInfo } from "@/services/lifestyleService";
// import ResidentIntake from '@/app/(app)/residents/tab-content/ResidentIntake';
// import AuthorisedRepresentative from '@/app/(app)/residents/tab-content/AuthorisedRepresentative';
// import AdmissionNotes from '@/app/(app)/residents/tab-content/AdmissionNotes';
// import Lifestyle from '@/app/(app)/residents/tab-content/Lifestyle';
// import Documents from '@/app/(app)/residents/tab-content/Documents';

// export default function EditResident() {
//   const params = useParams();
//   const router = useRouter();
//   const residentId = params.id;
  
//   const [resident, setResident] = useState(null);
//   const [authorisedRepresentative, setAuthorisedRepresentative] = useState(null);
//   const [clinicalInfo, setClinicalInfo] = useState(null);
//   const [lifestyleInfo, setLifestyleInfo] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("personal");
//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [isEditingRepresentative, setIsEditingRepresentative] = useState(false);
//   const [isEditingNotes, setIsEditingNotes] = useState(false);
//   const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);
//   const [isEditingDocuments, setIsEditingDocuments] = useState(false);

//   useEffect(() => {
//     const fetchResidentData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch resident details using basic info API
//         const residentData = await getResidentBasicInfo(residentId);
//         setResident(residentData.resident || residentData);
        
//         // Fetch authorised representative
//         try {
//           const repData = await getAuthorisedRepresentativeByResidentId(residentId);
//           setAuthorisedRepresentative(repData);
//         } catch (repError) {
//           console.log("No authorised representative found:", repError);
//           setAuthorisedRepresentative(null);
//         }

//         // Fetch clinical information
//         try {
//           const clinicalData = await getClinicalInfoByResidentId(residentId);
//           setClinicalInfo(clinicalData);
//         } catch (clinicalError) {
//           console.log("No clinical information found:", clinicalError);
//           setClinicalInfo(null);
//         }

//         // Fetch lifestyle information
//         try {
//           const lifestyleData = await getLifestyleInfoByResidentId(residentId);
//           setLifestyleInfo(lifestyleData);
//         } catch (lifestyleError) {
//           console.log("No lifestyle information found:", lifestyleError);
//           setLifestyleInfo(null);
//         }

//         // Fetch documents
//         try {
//           const documentsData = await getDocumentsByResidentId(residentId);
//           setDocuments(documentsData || []);
//         } catch (documentsError) {
//           console.log("No documents found:", documentsError);
//           setDocuments([]);
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
      
//       // Update resident personal information
//       if (resident) {
//         await updateResident(residentId, resident);
//       }
      
//       // Update authorised representative
//       if (authorisedRepresentative) {
//         await updateAuthorisedRepresentative(authorisedRepresentative.id, authorisedRepresentative);
//       }
      
//       // Update clinical information
//       if (clinicalInfo) {
//         await updateClinicalInfo(clinicalInfo.id, clinicalInfo);
//       }
      
//       // Update lifestyle information
//       if (lifestyleInfo) {
//         await updateLifestyleInfo(lifestyleInfo.id, lifestyleInfo);
//       }
      
//       // Navigate back to details page
//       router.push(`/residents/details/${residentId}`);
      
//     } catch (err) {
//       console.error("Error saving resident data:", err);
//       setError("Failed to save resident information");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push(`/residents/edit/${residentId}`);
//   };

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//   };

//   // Form handlers for ResidentIntake
//   const formHandlers = {
//     formData: resident ? {
//       first_name: resident.firstName,
//       surname: resident.surname,
//       date_of_birth: resident.dob,
//       gender: resident.gender,
//       identity: resident.identity,
//       language: resident.language,
//       medicare_number: resident.medicoreNumber,
//       centrelink_crn: resident.centrelinkCRN,
//       room_id: resident.roomId,
//       group_id: resident.groupId
//     } : {},
//     handleChange: (e) => {
//       const { name, value } = e.target;
//       setResident(prev => ({
//         ...prev,
//         [name === 'first_name' ? 'firstName' : 
//          name === 'surname' ? 'surname' :
//          name === 'date_of_birth' ? 'dob' :
//          name === 'medicare_number' ? 'medicoreNumber' :
//          name === 'centrelink_crn' ? 'centrelinkCrn' :
//          name === 'room_id' ? 'roomId' :
//          name === 'group_id' ? 'groupId' : name]: value
//       }));
//     },
//     handleSelectChange: (name, value) => {
//       setResident(prev => ({
//         ...prev,
//         [name === 'gender' ? 'gender' :
//          name === 'identity' ? 'identity' :
//          name === 'language' ? 'language' : name]: value
//       }));
//     },
//     errors: {},
//     submitResidentData: handleSave,
//     isLoading: saving
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
//   { id: "notes", label: "Admission Notes", icon: HeartPulse },
//   { id: "lifestyle", label: "Lifestyle", icon: Heart },
//   { id: "documents", label: "Documents", icon: FileText }
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
//                             <label className="text-xs font-semibold mb-1">Room Name</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.roomName || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Group Name</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.groupName || "Not specified"}
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
//                             <label className="text-xs font-semibold mb-1">Medicare Number (10 digits)</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {resident?.medicoreNumber || "Not specified"}
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
//                 <ResidentIntake 
//                   {...formHandlers}
//                   onNext={() => handleTabChange("representative")}
//                   onPrevious={() => setIsEditingPersonal(false)}
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
//                             1. Authorised Representative (Person Responsible)
//                           </h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Representative Full Name</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {authorisedRepresentative?.representiveFullName || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Relationship to Guest</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {authorisedRepresentative?.relationshipToResident || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Phone</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {authorisedRepresentative?.representivePhone || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Email</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {authorisedRepresentative?.representiveEmail || "Not specified"}
//                             </div>
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Legal Authority Status</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {authorisedRepresentative?.legalAuthorityStatus || "Emergency Contact Only"}
//                             </div>
//                           </div>
//                         </div>
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
//                 <AuthorisedRepresentative
//                   formData={authorisedRepresentative}
//                   onNext={() => {
//                     setIsEditingRepresentative(false);
//                     handleTabChange("notes");
//                   }}
//                   onPrevious={() => {
//                     setIsEditingRepresentative(false);
//                     handleTabChange("personal");
//                   }}
//                   onCancel={() => setIsEditingRepresentative(false)}
//                   residentId={residentId}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "notes" && (
//             <div className="space-y-6">
//               {!isEditingNotes ? (
//                 <>
//                   <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6 border-b border-gray-200 pb-4">
//                       <h1 className="text-2xl font-bold text-[#004a99]">Resident Admission & Clinical Intake</h1>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Required for Care Planning
//                       </p>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Section 1: Clinical Assessment & Admission Notes */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             1. Clinical Assessment & Admission Notes
//                           </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
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
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Dietary Requirements / IDDSI Level</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {clinicalInfo?.dietaryRequirements || "Regular / Normal"}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col mb-4">
//                           <label className="text-xs font-semibold mb-1">Critical Allergies</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[80px]">
//                             {clinicalInfo?.criticalAllergies || "Not specified"}
//                           </div>
//                         </div>

//                         <div className="flex flex-col mb-4">
//                           <label className="text-xs font-semibold mb-1">Initial Clinical Observations & Admission Notes</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[80px]">
//                             {clinicalInfo?.notes || "Not specified"}
//                           </div>
//                         </div>

//                         {/* Second section: Physician Information */}
//                         <div className="border-t border-gray-200 pt-6 mt-8">
//                           <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                             <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                               2. Physician Contact Information
//                             </h2>
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Primary Physician Name</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {clinicalInfo?.primaryPhysicianName || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Primary Physician Phone</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {clinicalInfo?.primaryPhysicianPhone || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Primary Physician Email</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {clinicalInfo?.primaryPhysicianEmail || "Not specified"}
//                               </div>
//                             </div>
//                             <div className="flex flex-col">
//                               <label className="text-xs font-semibold mb-1">Assigned Staff</label>
//                               <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                                 {clinicalInfo?.assignedStaffId || "Not specified"}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingNotes(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <AdmissionNotes
//                   formData={clinicalInfo}
//                   onNext={() => {
//                     setIsEditingNotes(false);
//                     handleTabChange("lifestyle");
//                   }}
//                   onPrevious={() => {
//                     setIsEditingNotes(false);
//                     handleTabChange("representative");
//                   }}
//                   onCancel={() => setIsEditingNotes(false)}
//                   residentId={residentId}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "lifestyle" && (
//             <div className="space-y-6">
//               {!isEditingLifestyle ? (
//                 <>
//                   <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6 border-b border-gray-200 pb-4">
//                       <h1 className="text-2xl font-bold text-[#004a99]">Resident Lifestyle & Personal History</h1>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Understanding the resident's background for personalized care
//                       </p>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Section 1: Personal Background */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             1. My Life Story
//                           </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Place of Birth
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.placeOfBirth || "Not specified"}
//                             </div>
//                           </div>

//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Childhood Information
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.childhoodInfo || "Not specified"}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Education Information
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.educationInfo || "Not specified"}
//                             </div>
//                           </div>

//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Career Information
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.careerInfo || "Not specified"}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Achievements
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[80px]">
//                               {lifestyleInfo?.achievements || "Not specified"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 2: Daily Preferences */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             2. Daily Preferences
//                           </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1">Typical Wake-up Time</label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.typicalWakeupTime || "Not specified"}
//                             </div>
//                           </div>

//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Sleep Habits
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.sleepHabbit || "Not specified"}
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 3: SPIRITUAL & CULTURAL NEEDS */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             3. SPIRITUAL & CULTURAL NEEDS
//                           </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
//                           <div className="flex flex-col">
//                             <label className="text-xs font-semibold mb-1 flex items-center gap-2">
//                               Religious Views
//                             </label>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                               {lifestyleInfo?.religiousView || "Not specified"}
//                             </div>
//                           </div>

//                           <div className="flex flex-col">
//                             <h3 className="text-xs font-semibold text-gray-700 mb-1">Important Days</h3>
//                             <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[80px]">
//                               {lifestyleInfo?.residentImportantDates && lifestyleInfo.residentImportantDates.length > 0 
//                                 ? lifestyleInfo.residentImportantDates.map((date, index) => (
//                                     <div key={index} className="mb-2">
//                                       <span className="font-medium">{date.timestamp ? new Date(date.timestamp).toLocaleDateString() : 'No date'}</span>
//                                       {date.reason && <span className="ml-2">- {date.reason}</span>}
//                                     </div>
//                                   ))
//                                 : "Not specified"
//                               }
//                             </div>
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 4: INTERESTS & SOCIAL ENGAGEMENT */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
//                           <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
//                             4. INTERESTS & SOCIAL ENGAGEMENT
//                           </h2>
//                         </div>

//                         <div className="space-y-4 mb-4">
//                           <h3 className="text-xs font-medium text-gray-800 mb-4">
//                             Hobbies the resident enjoys:
//                           </h3>
                          
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[60px]">
//                             {lifestyleInfo?.residentHobbys && lifestyleInfo.residentHobbys.length > 0 
//                               ? lifestyleInfo.residentHobbys.map((hobby, index) => {
//                                   const hobbyName = hobby.split(':')[1] || hobby;
//                                   return (
//                                     <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
//                                       {hobbyName}
//                                     </span>
//                                   );
//                                 })
//                               : "Not specified"
//                             }
//                           </div>
//                         </div>
//                       </section>

//                       {/* Section 5: Additional Notes */}
//                       <section>
//                         <div className="flex flex-col mb-4">
//                           <label className="text-xs font-semibold mb-1">Additional Notes</label>
//                           <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 min-h-[80px]">
//                             {lifestyleInfo?.extraNotes || "Not specified"}
//                           </div>
//                         </div>
//                       </section>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingLifestyle(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <Lifestyle
//                   formData={lifestyleInfo}
//                   onNext={() => {
//                     setIsEditingLifestyle(false);
//                     handleTabChange("documents");
//                   }}
//                   onPrevious={() => {
//                     setIsEditingLifestyle(false);
//                     handleTabChange("notes");
//                   }}
//                   onCancel={() => setIsEditingLifestyle(false)}
//                   residentId={residentId}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "documents" && (
//             <div className="space-y-6">
//               {!isEditingDocuments ? (
//                 <>
//                   <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
//                     {/* Header */}
//                     <div className="mb-6 flex justify-between items-start">
//                       <div>
//                         <h1 className="text-2xl font-bold text-[#003b73]">Resident Documents</h1>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           Compliance Level: High (Aged Care Act 1997)
//                         </p>
//                       </div>
//                       <div className="border border-gray-200 px-4 py-2 text-gray-400 dark:text-gray-400 italic text-sm rounded">
//                         Logo
//                       </div>
//                     </div>

//                     <div className="space-y-8">
//                       {/* Section: Document List */}
//                       <section>
//                         <div className="flex items-center gap-2 bg-[#f0f7ff] border-l-[4px] border-[#003b73] dark:bg-gray-800 py-2 px-3 mb-6">
//                           <h2 className="text-[#003b73] font-bold text-[13px]">
//                             1. Uploaded Documents
//                           </h2>
//                         </div>
                        
//                         <div className="space-y-4 px-1">
//                           {documents && documents.length > 0 ? (
//                             documents.map((doc, index) => (
//                               <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-4 shadow-sm">
//                                 {/* Document Type (Left) */}
//                                 <div className="md:col-span-3 flex flex-col self-center">
//                                   <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold uppercase tracking-tight">Document Type</label>
//                                   <div className="border border-gray-300 dark:border-gray-600 rounded-sm px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
//                                     {doc.type || "Not specified"}
//                                   </div>
//                                 </div>

//                                 {/* File Name (Center) */}
//                                 <div className="md:col-span-7 flex flex-col">
//                                   <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold uppercase tracking-tight">File Name</label>
//                                   <div className="border border-gray-300 dark:border-gray-600 rounded-sm px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//                                     {doc.file_name || "Not specified"}
//                                   </div>
//                                 </div>

//                                 {/* Confidentiality Status (Right) */}
//                                 <div className="md:col-span-2 flex flex-col items-center justify-center self-center pt-1">
//                                   <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-semibold uppercase tracking-tight flex items-center gap-1">
//                                     <Shield size={10} /> Confidential
//                                   </label>
//                                   <div className="border border-gray-300 dark:border-gray-600 rounded-sm px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center">
//                                     {doc.is_confidential ? "Yes" : "No"}
//                                   </div>
//                                 </div>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="text-center py-8">
//                               <p className="text-gray-500 text-sm">No documents uploaded yet</p>
//                             </div>
//                           )}
//                         </div>
//                       </section>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setIsEditingDocuments(true)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <Documents
//                   documents={documents}
//                   onNext={() => {
//                     setIsEditingDocuments(false);
//                     handleSave();
//                   }}
//                   onPrevious={() => {
//                     setIsEditingDocuments(false);
//                     handleTabChange("lifestyle");
//                   }}
//                   onCancel={() => setIsEditingDocuments(false)}
//                   residentId={residentId}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }