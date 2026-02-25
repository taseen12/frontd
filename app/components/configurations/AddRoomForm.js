"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useAddRoomForm } from "@/hooks/room/useAddRoomForm";
import { useEditRoomForm } from "@/hooks/room/useEditRoomForm";

export default function AddRoomForm({ onRoomAdded, editingRoom, onCancelEdit, onUpdated }) {
  const isEditMode = !!editingRoom;

  const addFormState = useAddRoomForm();
  const editFormState = useEditRoomForm(editingRoom, onUpdated, onCancelEdit);

  const {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit: handleAddSubmit,
  } = addFormState;

  const {
    formData: editFormData,
    errors: editErrors,
    success: editSuccess,
    isLoading: editIsLoading,
    handleChange: handleEditChange,
    handleSubmit: handleEditSubmit,
    handleCancel,
  } = editFormState;

  const current = isEditMode
    ? { formData: editFormData, errors: editErrors, success: editSuccess, isLoading: editIsLoading, handleChange: handleEditChange }
    : { formData, errors, success, isLoading, handleChange };

  const onSubmit = async (e) => {
    const ok = isEditMode ? await handleEditSubmit(e) : await handleAddSubmit(e);
    if (ok) {
      if (isEditMode) {
        if (onUpdated) onUpdated();
      } else {
        if (onRoomAdded) onRoomAdded();
      }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-300 space-y-3">
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-primaryColor rounded-md text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>{isEditMode ? "Room updated successfully!" : "Room added successfully!"}</span>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{errors.submit}</span>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
          {isEditMode ? "Edit Room" : "Add Room"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {isEditMode ? "Update the room name" : "Add a new room to your organization"}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Room Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={current.formData.name}
            onChange={current.handleChange}
            placeholder="Enter room name"
            className="w-full h-9 mt-1"
            disabled={current.isLoading}
          />
          {current.errors.name && (
            <p className="text-xs text-red-600 mt-1">{current.errors.name}</p>
          )}
        </div>
        <div className="flex justify-start gap-2">
          {isEditMode ? (
            <>
              <Button
                type="submit"
                className="bg-primaryColor hover:bg-primaryColor text-white h-8 px-3 text-sm"
                disabled={current.isLoading}
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
                onClick={handleCancel}
                disabled={current.isLoading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              className="bg-primaryColor hover:bg-primaryColor text-white h-8 px-3 text-sm"
              disabled={current.isLoading}
            >
              {current.isLoading ? (
                <>
                  <Loader className="animate-spin h-3 w-3 mr-1" />
                  Submitting...
                </>
              ) : (
                "Add Room"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}