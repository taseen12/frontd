"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  UserPlus,
  FileUp,
  UserCog,
  Heart,
  UserCheck
} from "lucide-react";
import { useState, createContext, useContext } from "react";
import { useAddResidentsForm } from "@/hooks/residents/useAddResidentsForm";
import ResidentIntake from './tab-content/ResidentIntake';
import AuthorisedRepresentative from './tab-content/AuthorisedRepresentative';
import Documents from './tab-content/Documents';
import ClinicalInfo from './tab-content/ClinicalInfo';
import Lifestyle from './tab-content/Lifestyle';

// Create context for sharing form data across tabs
const ResidentFormContext = createContext();

export const useResidentForm = () => {
  const context = useContext(ResidentFormContext);
  if (!context) {
    throw new Error('useResidentForm must be used within ResidentFormProvider');
  }
  return context;
};

const tabs = [
  { id: "intake", label: "Resident Intake", icon: UserPlus },
  { id: "representative", label: "Authorised Representative", icon: UserCheck },
  { id: "notes", label: "Clinical Info", icon: UserCog },
  { id: "lifestyle", label: "Lifestyle", icon: Heart },
  { id: "documents", label: "Documents", icon: FileUp }
  
];

// ResidentFormProvider component
function ResidentFormProvider({ children }) {
  const residentForm = useAddResidentsForm();
  
  return (
    <ResidentFormContext.Provider value={residentForm}>
      {children}
    </ResidentFormContext.Provider>
  );
}

export default function MainHub() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "intake";

  const changeTab = (tabId) => {
    router.push(`/residents?view=add&tab=${tabId}`);
  };

  const handleFinalSubmit = async () => {
    const success = await residentForm.handleSubmit(new Event('submit'));
    if (success) {
      router.push('/residents');
    }
  };

  return (
    <ResidentFormProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
        <div className="max-w-8xl mx-auto">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-700 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
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

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 min-h-[320px]">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </ResidentFormProvider>
  );
}

// Separate component to use the context
function TabContent({ activeTab }) {
  const { 
    formData, 
    errors, 
    isLoading, 
    rooms,
    groups,
    indigenousStatus,
    loadingIndigenousStatus,
    handleChange, 
    handleSelectChange,
    handleDocumentsChange,
    handleImportantDatesChange,
    handleHobbiesChange,
    handleSubmit,
    submitResidentData
  } = useResidentForm();

  const router = useRouter();

  const handleTabNavigation = (nextTab) => {
    router.push(`/residents?view=add&tab=${nextTab}`);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(e);
    if (success) {
      router.push('/residents');
    }
  };

  const handleCancel = () => {
    router.push('/residents');
  };

  // Pass form handlers to child components
  const formHandlers = {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    handleDocumentsChange,
    handleImportantDatesChange,
    handleHobbiesChange,
    submitResidentData,
    isLoading,
    rooms,
    groups,
    indigenousStatus,
    loadingIndigenousStatus
  };

  return (
    <div>
      {activeTab === "intake" && (
        <ResidentIntake 
          {...formHandlers}
          onNext={() => handleTabNavigation('representative')}
          onCancel={handleCancel}
        />
      )}
      {activeTab === "representative" && (
        <AuthorisedRepresentative 
          onNext={() => handleTabNavigation('notes')}
          onPrevious={() => handleTabNavigation('intake')}
          onCancel={handleCancel}
          residentId={formData.residentId}
        />
      )}
      {activeTab === "notes" && (
        <ClinicalInfo 
          onNext={() => handleTabNavigation('lifestyle')}
          onPrevious={() => handleTabNavigation('representative')}
          onCancel={handleCancel}
          residentId={formData.residentId}
        />
      )}
      {activeTab === "lifestyle" && (
        <Lifestyle 
          {...formHandlers}
          onNext={() => handleTabNavigation('documents')}
          onPrevious={() => handleTabNavigation('notes')}
          onCancel={handleCancel}
          residentId={formData.residentId}
        />
      )}
          {activeTab === "documents" && (
        <Documents 
          {...formHandlers}
          onPrevious={() => handleTabNavigation('lifestyle')}
          onCancel={handleCancel}
          onSubmit={handleFinalSubmit}
          isLoading={isLoading}
          residentId={formData.residentId}
        />
      )}
    </div>
  );
}
