"use client";

export default function EditDocumentsForm({ 
  documents, 
  errors, 
  handleDocumentChange, 
  handleFileUpload, 
  onNext, 
  onPrevious,
  onCancel,
  submitDocuments,
  isLoading
}) {
  const handleNext = async () => {
    const success = await submitDocuments();
    if (success) {
      onNext();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const documentRows = [
    { type: "Medicare Card", icon: "📋", text: "Click to upload Document" },
    { type: "Power of Attorney", icon: "⚖️", text: "Click to upload Document" },
    { type: "ID Document", icon: "🆔", text: "Click to upload Document" },
    { type: "Insurance Card", icon: "💳", text: "Click to upload Document" },
    { type: "Medical Records", icon: "🏥", text: "Click to upload Document" },
    { type: "Other", icon: "📄", text: "Click to upload Document" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#004a99]">Edit Resident Documents</h1>
        <p className="text-xs text-gray-500 mt-1">
          Update and Manage Resident Documentation
        </p>
      </div>

      <form className="space-y-8">
        {/* Documents Upload Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              1. Document Upload & Management
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentRows.map((doc, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3">{doc.icon}</div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {doc.type}
                  </h3>
                  
                  {/* File Upload Area */}
                  <div className="w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(index, e.target.files[0])}
                      />
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, JPG, PNG</p>
                      </div>
                    </label>
                  </div>

                  {/* Confidential Checkbox */}
                  <div className="mt-3 w-full">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="is_confidential"
                        checked={documents[index]?.is_confidential || false}
                        onChange={(e) => handleDocumentChange(index, 'is_confidential', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">Mark as confidential</span>
                    </label>
                  </div>

                  {/* Display uploaded file */}
                  {documents[index]?.file && (
                    <div className="mt-3 w-full">
                      <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                        <span className="text-xs text-green-800 dark:text-green-200 truncate">
                          {documents[index].file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDocumentChange(index, 'file', null)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {errors[index] && (
                    <div className="mt-2">
                      <p className="text-red-500 text-xs">{errors[index]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Summary Section */}
        <section>
          <div className="flex items-center bg-blue-50 dark:bg-gray-800 border-l-4 border-[#004a99] p-2 mb-4">
            <h2 className="text-[#004a99] font-bold text-sm uppercase tracking-wide">
              2. Document Summary
            </h2>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {documents.filter(doc => doc.file).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Documents Uploaded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {documents.filter(doc => doc.is_confidential).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Confidential Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {documents.filter(doc => doc.file && !doc.is_confidential).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Public Files</div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            disabled={isLoading}
          >
            Previous
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save & Complete'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
