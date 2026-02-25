"use client";

import { useState, useEffect } from "react";
import { editGroup } from "@/services/groupService";
import { toast } from "react-toastify";

export function useEditGroupForm(editingGroup, onUpdated, onCancelEdit) {
  const [formData, setFormData] = useState({
    name: editingGroup?.name || "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingGroup) {
      setFormData({ name: editingGroup.name });
    }
    setErrors({});
    setSuccess(false);
  }, [editingGroup]);

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
      await editGroup({ id: editingGroup.id, name: formData.name.trim() });
      setSuccess(true);
      toast.success("Group updated successfully!");
      if (onUpdated) onUpdated();
      return true;
    } catch (error) {
      console.error("Error updating group:", error);
      setErrors({ submit: "Failed to update form. Please try again." });
      toast.error("Failed to update Group");
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
    if (!formData.name.trim()) newErrors.name = "Group name is required";
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




