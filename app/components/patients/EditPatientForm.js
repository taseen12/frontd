"use client";

import {
  Card,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Loader,
} from "lucide-react";
import { Select } from "@/app/components/ui/select";
import { useEditPatientForm } from '@/hooks/patient/useEditPatientForm';

export default function EditPatientForm() {

    const {
    formData,    
    rooms,
    groups,
    genders,
    errors,
    isLoading,
    loadingRooms,
    loadingGroups,
    loadingGenders,
        
    handleChange,
    handleSelectChange,
    } = useEditPatientForm()

    
    return (
        <form >
            <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.name}
                    </p>
                )}
                </div>
                <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Patient ID <span className="text-red-500">*</span>
                </label>
                <Input
                    id="ref"
                    name="ref"
                    value={formData.ref}
                    onChange={handleChange}
                    placeholder="Enter patient id"
                    className="w-full h-9 mt-1"
                    disabled={isLoading}
                />
                {errors.ref && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.ref}
                    </p>
                )}
                </div>
                <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Gender <span className="text-red-500">*</span>
                </label>
                <Select
                    id="genderID"
                    name="genderID"
                    placeholder="Select Group"
                    value={formData.genderID}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
                    onChange={handleSelectChange}
                    options={
                    genders?.map((gender) => ({
                        value: gender.id,
                        label: gender.name,
                    })) || []
                    }
                    disabled={loadingGenders}
                />
                {loadingGenders && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Loader className="h-4 w-4 animate-spin text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                </div>
                <div className="relative">
                <label
                    htmlFor="groupID"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Group
                </label>
                <Select
                    id="groupID"
                    name="groupID"
                    placeholder="Select Group"
                    value={formData.groupID}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
                    onChange={handleSelectChange}
                    options={
                    groups?.map((group) => ({
                        value: group.id,
                        label: group.name,
                    })) || []
                    }
                    disabled={loadingGroups}
                />
                {loadingGroups && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Loader className="h-4 w-4 animate-spin text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                </div>
                <div className="relative">
                <label
                    htmlFor="roomID"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Room
                </label>
                <Select
                    id="roomID"
                    name="roomID"
                    placeholder="Select Room"
                    value={formData.roomID}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-gray-200"
                    onChange={handleSelectChange}
                    options={
                    rooms?.map((room) => ({
                        value: room.id,
                        label: room.name,
                    }))
                    }
                    disabled={loadingRooms}
                />
                {loadingRooms && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Loader className="h-4 w-4 animate-spin text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                </div>
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
                    'Update Patient'
                )}
                </Button>
            </div>
            </Card>
      </form>
    )

}