"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Select } from "../ui/select";
import { CheckCircle, AlertCircle, Loader, AlertTriangle } from "lucide-react";
import { useAddActivityPolicyForm } from "@/hooks/policy/useAddActivityPolicyForm";
import { useEditActivityPolicyForm } from "@/hooks/policy/useEditActivityPolicyForm";

export default function AddActivityPolicyForm({ onPolicyAdded, editingPolicy, onCancelEdit, onUpdated }) {
  const isEditMode = !!editingPolicy;

  const addFormState = useAddActivityPolicyForm();
  const editFormState = useEditActivityPolicyForm(editingPolicy, onUpdated, onCancelEdit);

  const current = isEditMode ? editFormState : addFormState;

  const onSubmit = async (e) => {
    const ok = isEditMode ? await current.handleSubmit(e) : await current.handleSubmit(e);
    if (ok) {
      if (isEditMode) {
        if (onUpdated) onUpdated();
      } else {
        if (onPolicyAdded) onPolicyAdded();
      }
    }
  };

  const isOptionsLoading = current.isLoadingOptions;

  return (
    <Card className="p-6">
      {current.success && (
        <div className="p-3 mb-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>{isEditMode ? "Activity policy updated successfully!" : "Activity policy added successfully!"}</span>
          </div>
        </div>
      )}

      {current.errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{current.errors.submit}</span>
          </div>
        </div>
      )}

      {current.fetchError && (
        <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>{current.fetchError}</span>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {isEditMode ? "Edit Activity Policy" : "Add Activity Policy"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          {isEditMode ? "Update activity policy" : "Create rules for activity policy"}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Patient Name<span className="text-red-500">*</span></label>
            <div className="relative patient-select-container">
              <Input
                type="text"
                placeholder="Search and Select Patient"
                value={current.patientSearchTerm}
                onChange={current.handleSearchChange}
                onFocus={current.handleSearchFocus}
                onBlur={current.handleSearchBlur}
                className="w-full h-9 mt-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-green-500"
                disabled={current.isLoading || current.isLoadingPatients}
              />
              {current.showPatientsDropdown && (
                <ul className="absolute z-50 w-full bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1 dark:bg-gray-800">
                  {current.isLoadingPatients ? (
                    <li className="px-3 py-2 text-gray-500 dark:text-gray-400 flex items-center">
                      <Loader className="animate-spin h-3 w-3 mr-2" />
                      Loading patients...
                    </li>
                  ) : current.patients.length > 0 ? (
                    current.patients.map(patient => (
                      <li
                        key={patient.id}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-700 hover:text-white dark:hover:bg-blue-300 dark:hover:text-white transition-colors duration-200"
                        onClick={() => current.handlePatientSelect(patient)}
                      >
                        {patient.name} ({patient.ref})
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500 dark:text-gray-400">No patients found</li>
                  )}
                </ul>
              )}
            </div>
            {current.errors.patientID && (
              <p className="text-xs text-red-600 mt-1">{current.errors.patientID}</p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Activity Type <span className="text-red-500">*</span></label>
            <Select
              id="activityTypeID"
              name="activityTypeID"
              value={current.formData.activityTypeID || ""}
              placeholder="Select Activity Type"
              options={current.activityTypes.map(a => ({ value: a.id, label: a.name }))}
              onChange={(name, value) => current.handleChange({ target: { name, value } })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
              required
              disabled={current.isLoading || isOptionsLoading}
            />
            {current.errors.activityTypeID && (
              <p className="text-xs text-red-600 mt-1">{current.errors.activityTypeID}</p>
            )}
            {isOptionsLoading && (
              <p className="text-xs text-gray-500 mt-1">Loading activity types...</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Max Allowed Duration (Seconds)<span className="text-red-500">*</span></label>
            <Input
              id="maxAllowed"
              name="maxAllowed"
              type="number"
              value={current.formData.maxAllowed}
              onChange={current.handleChange}
              placeholder="e.g., 10"
              className="w-full h-9 mt-1"
              disabled={current.isLoading}
            />
            {current.errors.maxAllowed && (
              <p className="text-xs text-red-600 mt-1">{current.errors.maxAllowed}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Level <span className="text-red-500">*</span></label>
            <Select
              id="levelID"
              name="levelID"
              value={current.formData.levelID || ""}
              placeholder="Select Level"
              options={current.levels.map(l => ({ value: l.id, label: l.name }))}
              onChange={(name, value) => current.handleChange({ target: { name, value } })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
              required
              disabled={current.isLoading || current.isLoadingOptions}
            />
            {current.errors.levelID && (
              <p className="text-xs text-red-600 mt-1">{current.errors.levelID}</p>
            )}
          </div>
        </div>

        <div className="flex justify-start gap-2 pt-2">
          {isEditMode ? (
            <>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-sm"
                disabled={current.isLoading || isOptionsLoading}
              >
                {current.isLoading ? (
                  <>
                    <Loader className="animate-spin h-3 w-3 mr-1" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-8 px-3 text-sm"
                onClick={current.handleCancel}
                disabled={current.isLoading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-sm"
              disabled={current.isLoading || current.isLoadingPatients || isOptionsLoading}
            >
              {current.isLoading ? (
                <>
                  <Loader className="animate-spin h-3 w-3 mr-1" />
                  Submitting...
                </>
              ) : (
                "Add Activity Policy"
              )}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}