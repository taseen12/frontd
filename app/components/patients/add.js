"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useAddPatientForm } from "@/hooks/patient/useAddPatientForm";
import { Select } from './../ui/select';
import { useEffect, useState } from "react";

export default function AddPatientForm() {
  const isEditMode = !!editingPatient;
  
  const [rooms, setRooms] = useState([])

  // Call both hooks unconditionally
  const addForm = useAddPatientForm();

  // Use the appropriate form based on mode
  const {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
  } = isEditMode ? editForm : addForm;

   useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await fetchRooms();
        const rooms = roomsData.rooms;
        setRooms(prev => ({
          ...prev,
          rooms: rooms.map((c) => ({ id: c.id, name: c.name }))
        }))
      } catch (error) {
        console.error("Failed to fetch rooms:", error)
      }
    }
    fetchRooms()
  }, [])
  console.log(rooms)

  const onSubmit = async (e) => {
    await handleSubmit(e);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-300 space-y-3">
      {/* Success message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-primaryColor rounded-md text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>{isEditMode ? "Patient updated successfully!" : "Patient added successfully!"}</span>
          </div>
        </div>
      )}

      {/* Form error */}
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{errors.submit}</span>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Patient Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full h-9 mt-1"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Patient ID <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full h-9 mt-1"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Room NO <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full h-9 mt-1"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Group <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full h-9 mt-1"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="relative">
          <Select
            id="roomID"
            name="roomID"
            placeholder="Select Room"
            value={formData.roomID}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
            // onChange={handleSelectChange}
            options={
              rooms?.map((room) => ({
                value: room.id,
                label: room.name,
              })) || []
            }
          />
        </div>
        <div className="flex justify-start gap-2">
            <Button
              type="submit"
              className="bg-primaryColor hover:bg-primaryColor text-white h-8 px-3 text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-3 w-3 mr-1" />
                  Submitting...
                </>
              ) : (
                "Add Patient"
              )}
            </Button>
        </div>
      </form>
    </div>
  );
}