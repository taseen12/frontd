import axios from "../lib/axios";

const DOCUMENT_ENDPOINTS = {
  UPLOAD_DOCUMENTS: "/api/Residents/DocumentUpload",
};

// Upload Documents
export const uploadDocuments = async (formData) => {
  try {
    const response = await axios.post(DOCUMENT_ENDPOINTS.UPLOAD_DOCUMENTS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading documents:", error);
    throw error;
  }
};

// Get Documents by Resident ID
export const getDocumentsByResidentId = async (residentId) => {
  try {
    const response = await axios.get(`${DOCUMENT_ENDPOINTS.UPLOAD_DOCUMENTS}/${residentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Delete Document
export const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${DOCUMENT_ENDPOINTS.UPLOAD_DOCUMENTS}/${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
