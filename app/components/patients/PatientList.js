"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getPatients, deletePatient } from "@/services/patientService";
import {
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  Users,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteConfirmation from "../delete/DeleteConfirmation";
import Link from "next/link";

export default function PatientListPage({ refreshTrigger }) {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);

    try {
      const patientData = await getPatients();
      setPatients(patientData.patients || []);
      setFilteredPatients(patientData.patients || []);
      setTotalPatients(patientData.patients?.length || 0);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setError("Failed to load patients. Please try again later.");
      setPatients([]);
      setTotalPatients(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  // Filter patients when searchTerm changes
  useEffect(() => {
    const filtered = patients.filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.ref.toLowerCase().includes(term) ||
        p.roomName.toLowerCase().includes(term)
      );
    });
    setFilteredPatients(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, patients]);

  const totalPages = Math.ceil(totalPatients / pageSize);
  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const editPatient = (patientId) => {
    router.push(`/patients/${patientId}`);
  };

  const refreshPatients = () => {
    setCurrentPage(1);
    fetchPatients();
  };

  if (loading && patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-primaryColor animate-spin mb-4" />
        <p className="text-gray-600">Loading patients...</p>
      </div>
    );
  }

  if (error && patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Failed to Load patients
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-md bg-white dark:bg-gray-800 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold mb-4">Patients List</h2>
        {/* ✅ Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, ID or Room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Card className="border border-gray-200 rounded-md bg-white dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Room No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {patient.roomName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <Link
                          href={`/patients/details/${patient.id}`}
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {patient.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {patient.ref}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`text-sm font-medium text-gray-900 dark:text-gray-300 ${patient.groupName === 'Group A' ? 'text-cyan-600' : ''}`}>
                          {patient.groupName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {patient.genderName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primaryColor hover:text-green-800"
                          onClick={() => editPatient(patient.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedPatient(patient);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
          {showDeleteModal && selectedPatient && (
            <DeleteConfirmation
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              id={selectedPatient.id}
              title={"Patient"}
              refresh={refreshPatients}
              onDelete={deletePatient}
            />
          )}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Patient{" "}
                <span className="font-medium">
                  {patients.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalPatients)}
                </span>{" "}
                of <span className="font-medium">{totalPatients}</span> results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          {loading && patients.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 text-primaryColor animate-spin" />
            </div>
          )}
        </Card>
      </div>
    </Card>
  );
}
