"use client";

import { useState } from "react";
import { addRole } from "@/services/roleService";
import { toast } from "react-toastify";

export function useAddRoleForm() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      await addRole({ name: formData.name.trim() });
      setSuccess(true);
      toast.success("Role added successfully");
      setFormData({ name: "" });
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add Role");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Role name is required";
    }
    return newErrors;
  };

  return {
    formData,
    errors,
    success,
    isLoading,
    handleChange,
    handleSubmit,
  };
}




