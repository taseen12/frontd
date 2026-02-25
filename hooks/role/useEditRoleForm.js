"use client";

import { useState, useEffect } from "react";
import { editRole } from "@/services/roleService";
import { toast } from "react-toastify";

export function useEditRoleForm(editingRole, onUpdated, onCancelEdit) {
  const [formData, setFormData] = useState({
    name: editingRole?.name || "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingRole) {
      setFormData({ name: editingRole.name });
    }
    setErrors({});
    setSuccess(false);
  }, [editingRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsLoading(true);

    try {
      await editRole({ id: editingRole.id, name: formData.name.trim() });
      setSuccess(true);
      toast.success("Role updated successfully!");
      if (onUpdated) onUpdated();
      return true;
    } catch (error) {
      console.error("Error updating Role:", error);
      setErrors({ submit: "Failed to update form. Please try again." });
      toast.error("Failed to update Role");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "" });
    setErrors({});
    setSuccess(false);
    if (onCancelEdit) onCancelEdit();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Role name is required";
    return newErrors;
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}




