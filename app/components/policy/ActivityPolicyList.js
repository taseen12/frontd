"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getActivityPolicies, deleteActivityPolicy } from "@/services/activityPolicyService";
import { Edit, Trash2, ChevronLeft, ChevronRight, Loader, AlertCircle, Activity, Search } from "lucide-react";
import DeleteConfirmation from "../delete/DeleteConfirmation";

export default function ActivityPolicyList({ refreshTrigger, onEdit }) {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const fetchPolicies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getActivityPolicies({ page: currentPage, pageSize, search: searchTerm || undefined });
      const list = data.items || data.activityPolicies || data.data || [];
      const total = data.total || data.totalCount || data.count || list.length;
      setPolicies(list);
      setFilteredPolicies(list);
      setTotalPolicies(total);
      setTotalPages(Math.max(1, Math.ceil(total / pageSize)));
    } catch (err) {
      console.error("Failed to fetch activity policies:", err);
      setError("Failed to load policies. Please try again later.");
      setPolicies([]);
      setTotalPages(1);
      setTotalPolicies(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [currentPage, refreshTrigger]);

  // Filter policies by patient name or ID when searchTerm changes
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredPolicies(policies);
      return;
    }
    const filtered = policies.filter((p) => {
      const name = (p.patientName || "").toString().toLowerCase();
      // const pid = (p.patientID || p.patientId || "").toString().toLowerCase();
      return name.includes(term);
    });
    setFilteredPolicies(filtered);
    setCurrentPage(1);
  }, [searchTerm, policies]);

  // Update totals when filtered list changes
  useEffect(() => {
    const count = filteredPolicies.length;
    setTotalPolicies(count);
    setTotalPages(Math.max(1, Math.ceil(count / pageSize)));
  }, [filteredPolicies]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleEdit = (policy) => {
    if (onEdit) onEdit(policy);
  };

  const refreshList = () => {
    setCurrentPage(1);
    fetchPolicies();
  };

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filteredPolicies.length <= pageSize ? filteredPolicies : filteredPolicies.slice(start, end);

  if (loading && policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-primaryColor animate-spin mb-4" />
        <p className="text-gray-600">Loading policies...</p>
      </div>
    );
  }

  if (error && policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400 mb-2">Failed to Load policies</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-md bg-white dark:bg-gray-800 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Activity Policy List</h2>
        <div className="relative w-64 md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Patient Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Card className="border border-gray-200 rounded-md bg-white dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Max Allowed Duration (Seconds)</th>
                <th className="px-10 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {pageItems.length > 0 ? (
                pageItems.map((p) => (
                  <tr key={p.id || `${p.patientID}-${p.activityTypeID}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-gray-400" />
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{p.patientName || p.patientID}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{p.activityTypeName || p.activityTypeID}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{p.activityLevelName || p.levelID}</td>
                    <td className="pr-16 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-center">{p.maxAllowed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="text-primaryColor hover:text-green-800" onClick={() => handleEdit(p)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => { setShowDeleteModal(true); setSelectedPolicy(p); }}>
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
          {showDeleteModal && selectedPolicy && (
            <DeleteConfirmation
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              id={selectedPolicy.id ?? selectedPolicy.ID}
              title={"Activity Policy"}
              refresh={refreshList}
              onDelete={deleteActivityPolicy}
            />
          )}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Show policies <span className="font-medium">{pageItems.length > 0 ? (start + 1) : 0}</span> to <span className="font-medium">{Math.min(end, totalPolicies)}</span> of <span className="font-medium">{totalPolicies}</span> results
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          {loading && policies.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 text-primaryColor animate-spin" />
            </div>
          )}
        </Card>
      </div>
    </Card>
  );
}


