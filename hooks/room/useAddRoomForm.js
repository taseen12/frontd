"use client";

import { useState } from "react";
import { addRoom } from "@/services/roomService";
import { toast } from "react-toastify";

export function useAddRoomForm() {
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
      await addRoom({ name: formData.name.trim() });
      setSuccess(true);
      toast.success("Room added successfully");
      setFormData({ name: "" });
      return true;
    } catch {
      setErrors({ submit: "Failed to submit form. Please try again." });
      toast.error("Failed to add Room");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Room name is required";
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




