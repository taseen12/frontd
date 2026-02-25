"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getResidents, deleteResident } from "@/services/residentService";
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
import { Card } from './../../components/ui/card';
import { Button } from "../../components/ui/button";
import DeleteConfirmation from './../../components/delete/DeleteConfirmation';

export default function ResidentsTable({ refreshTrigger }) {
  const router = useRouter();
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResidents, setTotalResidents] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const fetchResidents = async () => {
    setLoading(true);
    setError(null);

    try {
      const residentData = await getResidents();
      setResidents(residentData.residents || []);
      setFilteredResidents(residentData.residents || []);
      setTotalResidents(residentData.residents?.length || 0);
    } catch (err) {
      console.error("Failed to fetch residents:", err);
      setError("Failed to load residents. Please try again later.");
      setResidents([]);
      setTotalResidents(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  // Filter residents when searchTerm changes
  useEffect(() => {
    const filtered = residents.filter((r) => {
      const term = searchTerm.toLowerCase();
      return (
        `${r.firstName} ${r.surname}`.toLowerCase().includes(term) ||
        r.refNo.toLowerCase().includes(term) ||
        r.roomName.toLowerCase().includes(term)
      );
    });
    setFilteredResidents(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, residents]);

  const totalPages = Math.ceil(totalResidents / pageSize);
  const currentResidents = filteredResidents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const editResident = (residentId) => {
    router.push(`/residents/basic-info?id=${residentId}`);
  };

  const refreshResidents = () => {
    setCurrentPage(1);
    fetchResidents();
  };

  if (loading && residents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-primaryColor animate-spin mb-4" />
        <p className="text-gray-600">Loading residents...</p>
      </div>
    );
  }

  if (error && residents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Failed to Load residents
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        {/* ✅ Search bar */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, ID or Room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Card className="border border-gray-200 rounded-md bg-white dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-900 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Resident Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Ref No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Room No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentResidents.length > 0 ? (
                currentResidents.map((resident) => (
                  <tr
                    key={resident.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <Link
                          href={`/residents/basic-info?id=${resident.id}`}
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {`${resident.firstName} ${resident.surname}`}
                        </Link>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {resident.refNo}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {resident.roomName}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`text-sm font-medium text-gray-900 dark:text-gray-300 ${resident.groupName === 'Regular' ? 'text-cyan-600' : ''}`}>
                          {resident.groupName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {resident.gender}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primaryColor hover:text-green-800"
                          onClick={() => editResident(resident.id)}
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
                            setSelectedResident(resident);
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
          {showDeleteModal && selectedResident && (
            <DeleteConfirmation
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              id={selectedResident.id}
              title={"Resident"}
              refresh={refreshResidents}
              onDelete={deleteResident}
            />
          )}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Resident{" "}
                <span className="font-medium">
                  {residents.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalResidents)}
                </span>{" "}
                of <span className="font-medium">{totalResidents}</span> results
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
          {loading && residents.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 text-primaryColor animate-spin" />
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
