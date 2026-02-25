"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { getRoles, deleteRole } from "@/services/roleService";
import { Edit, Trash2, ChevronLeft, ChevronRight, Loader, AlertCircle, Users } from "lucide-react";
import DeleteConfirmation from "../delete/DeleteConfirmation";

export default function RoleList({ refreshTrigger, onEdit }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRoles, setTotalRoles] = useState(0);
  const pageSize = 10;

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);

    try {
      const rolesData = await getRoles({ page: currentPage, limit: pageSize });
      const list = rolesData.items || rolesData.roles || rolesData.data || [];
      const total = rolesData.total || rolesData.totalCount || rolesData.count || list.length;
      const totalPages = rolesData.totalPages || Math.max(1, Math.ceil(total / pageSize));
      setRoles(list);
      setTotalPages(totalPages);
      setTotalRoles(total);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      setError("Failed to load roles. Please try again later.");
      setRoles([]);
      setTotalPages(1);
      setTotalRoles(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [currentPage, refreshTrigger]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleEdit = (role) => {
    if (onEdit) {
      onEdit(role);
    }
  };

  const refreshRoles = () => {
    setCurrentPage(1);
    fetchRoles();
  };

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = roles.slice(start, end);

  if (loading && roles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-primaryColor animate-spin mb-4" />
        <p className="text-gray-600">Loading roles...</p>
      </div>
    );
  }

  if (error && roles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400 mb-2">Failed to Load roles</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
   <Card className="overflow-hidden border border-gray-200 rounded-md bg-white dark:bg-gray-800 p-4">
      <h2 className="text-xl font-semibold mb-4">Role List</h2>
      <div className="overflow-x-auto">
        <Card className="border border-gray-200 rounded-md bg-white dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role Name</th>
                <th className="px-10 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {pageItems.length > 0 ? (
                pageItems.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{role.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="text-primaryColor hover:text-green-800" onClick={() => handleEdit(role)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => { setShowDeleteModal(true); setSelectedRole(role); }}>
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
          {showDeleteModal && selectedRole && (
            <DeleteConfirmation isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} id={selectedRole.id} title={"Role"} refresh={refreshRoles} onDelete={deleteRole} />
          )}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Show roles <span className="font-medium">{roles.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalRoles)}</span> of <span className="font-medium">{totalRoles}</span> results
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
          {loading && roles.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 text-primaryColor animate-spin" />
            </div>
          )}
        </Card>
      </div>
    </Card>
  );
}





