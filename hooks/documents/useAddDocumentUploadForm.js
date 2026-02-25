"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { uploadDocuments } from "@/services/documentService";

export function useAddDocumentUploadForm(residentId) {
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const documentTypes = [
    "Medicare Card",
    "Power of Attorney", 
    "Guardianship Paperwork",
    "Insurance Details",
    "Other"
  ];

  const handleDocumentChange = (index, field, value) => {
    const updatedDocuments = [...documents];
    
    // Ensure the document array has enough items
    while (updatedDocuments.length <= index) {
      updatedDocuments.push({
        document_type: "",
        file: null,
        is_confidential: false
      });
    }
    
    // Update the specific field
    if (field === 'document_type') {
      updatedDocuments[index].document_type = value;
    } else if (field === 'file') {
      updatedDocuments[index].file = value;
      // Auto-set document type if not already set and this is from the predefined list
      if (!updatedDocuments[index].document_type && index < documentTypes.length) {
        updatedDocuments[index].document_type = documentTypes[index];
      }
    } else if (field === 'is_confidential') {
      updatedDocuments[index].is_confidential = value;
    }
    
    setDocuments(updatedDocuments);

    // Clear error for this field if it exists
    if (errors[`documents_${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`documents_${index}_${field}`];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (index, file) => {
    if (file) {
      handleDocumentChange(index, 'file', file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validation is now handled in submitDocuments function
    // This function can be used for additional client-side validation if needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitDocuments = async () => {
    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);

    try {
      // Create FormData for multipart/form-data upload
      const formData = new FormData();
      
      // Add resident ID
      formData.append('ResidentId', residentId || "bc06b473-2b3f-4844-96d7-3803becac880");
      
      // Collect files and their metadata
      const filesToUpload = documents.filter(doc => doc.file);
      
      if (filesToUpload.length === 0) {
        setErrors({ submit: "At least one document must be uploaded" });
        return false;
      }
      
      // Append files directly (not as array indices)
      filesToUpload.forEach((doc, index) => {
        formData.append('Files', doc.file);
        formData.append('DocumentTypes', doc.document_type);
        formData.append('IsConfidentials', doc.is_confidential);
      });
      
      await uploadDocuments(formData);
      setSuccess(true);
      toast.success("Documents uploaded successfully");
      return true;
    } catch (error) {
      console.error("Error uploading documents:", error);
      setErrors({ submit: "Failed to upload documents. Please try again." });
      toast.error("Failed to upload documents");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDocuments([]);
    setErrors({});
    setSuccess(false);
  };

  const removeDocument = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  return {
    documents,
    errors,
    success,
    isLoading,
    handleDocumentChange,
    handleFileUpload,
    submitDocuments,
    resetForm,
    removeDocument,
    validateForm,
  };
}
