'use client';

import { useEffect, useState } from 'react';
import { getPatientById } from '@/services/patientService';
import { useEditPatientForm } from '@/hooks/patient/useEditPatientForm';
import {
  Card,
  CardContent,
} from '@/app/components/ui/card';
import {
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { Input } from '@/app/components/ui/input';
import { Select } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';

export default function EditPatientPage({ params }) {
  const { patientId } = params;
  const [saveSuccess, setSaveSuccess] = useState(false);


  const {
    formData,
    setFormData,
    rooms,
    groups,
    errors,
    setErrors,
    genders,
    loading,
    setLoading,
    loadingRooms,
    loadingGroups,
    loadingGenders,
    handleSubmit: hookHandleSubmit,
    handleChange,
    handleSelectChange,
  } = useEditPatientForm();

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setErrors(null);

      try {
        const data = await getPatientById(patientId);

        if (!data || !data.patients) {
          setErrors('Patient not found.');
          return;
        }

        const patientData = {
          ...data.patients,
          id: patientId,
        };

        const formDataToSet = {
          ...patientData,
          id: patientId,
        };

        setFormData(formDataToSet);
      } catch (err) {
        console.error('Error in fetchPatientData:', err);
        setErrors(err.message || 'Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaveSuccess(false);
      setErrors(null);

      // Use the hook's handleSubmit function
      await hookHandleSubmit(e);

      // Handle success
      setSaveSuccess(true);
      router.push("/patients");
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to save patient data:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-8 w-8 text-primaryColor animate-spin mb-4" />
            <p className="text-gray-600">Loading Patient information...</p>
          </div>
        ) : errors ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400 mb-2">
                Failed to Load patient
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{JSON.stringify(errors)}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
          <Card>
            <CardContent className="p-6">
              {saveSuccess && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-primaryColor rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      Patient information updated successfully!
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">
                  Patient Information
                </h2>
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
                      disabled={loading}
                    />
                    {/* {errors.name && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {errors.name}
                      </p>
                    )} */}
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
                      disabled={loading}
                    />
                    {/* {errors.ref && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {errors.ref}
                      </p>
                    )} */}
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
                      options={rooms?.map((room) => ({
                        value: room.id,
                        label: room.name,
                      }))}
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
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin h-3 w-3 mr-1" />
                        Submitting...
                      </>
                    ) : (
                      'Update Patient'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
