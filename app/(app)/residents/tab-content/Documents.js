import React from 'react';
import { FileText, IdCard, Upload, Shield } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAddDocumentUploadForm } from "@/hooks/documents/useAddDocumentUploadForm";

export default function Documents({ 
  onNext, 
  onPrevious, 
  onCancel,
  residentId 
}) {
  const router = useRouter();
  
  const {
    documents,
    errors,
    isLoading,
    handleDocumentChange: handleDocumentChangeHook,
    handleFileUpload: handleFileUploadHook,
    submitDocuments
  } = useAddDocumentUploadForm(residentId);

  const handleNext = async () => {
    const success = await submitDocuments();
    if (success) {
      // Navigate to details page with the resident ID
      router.push(`/residents/${residentId}`);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDocumentChange = (index, field, value) => {
    // Set document type automatically when uploading
    if (field === 'is_confidential') {
      handleDocumentChangeHook(index, field, value);
    } else if (field === 'file') {
      handleFileUploadHook(index, value);
    }
  };

  const handleFileUpload = (index, file) => {
    handleFileUploadHook(index, file);
  };

  const documentRows = [
    { type: "Medicare Card", icon: <Upload className="text-[#003b73] mb-1" size={24} strokeWidth={1.5} />, text: "Click to upload Document" },
    { type: "Power of Attorney", icon: <Upload className="text-[#003b73] mb-1" size={24} strokeWidth={1.5} />, text: "Click to upload Document" },
    { type: "Guardianship Paperwork", icon: <Upload className="text-[#003b73] mb-1" size={24} strokeWidth={1.5} />, text: "Click to upload Document" },
    { type: "Insurance Details", icon: <Upload className="text-[#003b73] mb-1" size={24} strokeWidth={1.5} />, text: "Click to upload Document" },
    { type: "Other", icon: <Upload className="text-[#003b73] mb-1" size={24} strokeWidth={1.5} />, text: "Click to upload Document" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#003b73]">Resident Documents</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Compliance Level: High (Aged Care Act 1997)
          </p>
        </div>
        <div className="border border-gray-200 px-4 py-2 text-gray-400 dark:text-gray-400 italic text-sm rounded">
          Logo
        </div>
      </div>

      <form className="space-y-8">
        {/* Section 2: Mandatory Document Uploads */}
        <section>
          <div className="flex items-center gap-2 bg-[#f0f7ff] border-l-[4px] border-[#003b73] dark:bg-gray-800 py-2 px-3 mb-6">
            <h2 className="text-[#003b73] font-bold text-[13px]">
              1. Mandatory Document Uploads
            </h2>
          </div>
          
          <div className="space-y-4 px-1">
            {documentRows.map((doc, index) => (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-4 shadow-sm">
                
                {/* Document Type (Left) */}
                <div className="md:col-span-3 flex flex-col self-center">
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold uppercase tracking-tight">Document Type</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-sm px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                    {doc.type}
                  </div>
                </div>

                {/* File Path (Center - Uploader Design Matched to Image) */}
                <div className="md:col-span-7 flex flex-col">
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold uppercase tracking-tight">File Path</label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`file-upload-${index}`}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleFileUpload(index, file);
                        }
                      }}
                      className="hidden"
                    />
                    <div 
                      onClick={() => document.getElementById(`file-upload-${index}`).click()}
                      className="border border-dashed border-gray-300 dark:border-gray-600 rounded-sm h-16 flex flex-col items-center justify-center bg-[#f9fafb] dark:bg-gray-700 cursor-pointer hover:border-[#003b73] hover:bg-white dark:hover:bg-gray-600 transition-all group focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {doc.icon}
                      <span className="text-[10px] text-gray-400 dark:text-gray-300 font-medium">
                        {documents[index]?.file ? 
                          documents[index].file.name : 
                          doc.text
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confidentiality Check (Right) */}
                <div className="md:col-span-2 flex flex-col items-center justify-center self-center pt-1">
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-semibold uppercase tracking-tight flex items-center gap-1">
                    <Shield size={10} /> Confidential
                  </label>
                  <input 
                    type="checkbox" 
                    checked={documents[index]?.is_confidential || false}
                    onChange={(e) => handleDocumentChange(index, 'is_confidential', e.target.checked)}
                    className="w-5 h-5 accent-[#003b73] cursor-pointer rounded border-gray-300 transition-transform active:scale-90"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <p className="text-sm">{errors.submit}</p>
            </div>
          )}
        </section>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
          <button type="button" onClick={handleCancel} className="px-6 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 transition">
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleNext}
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-semibold rounded transition ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-[#008a4e] text-white rounded hover:bg-[#006f3e]'
            }`}
          >
            {isLoading ? 'Uploading...' : 'Save & View Report'}
          </button>
        </div>
      </form>
    </div>
  );
}