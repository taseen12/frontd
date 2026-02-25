"use client";

import { useState, useEffect } from "react";
import { editRoom } from "@/services/roomService";
import { toast } from "react-toastify";

export function useEditRoomForm(editingRoom, onUpdated, onCancelEdit) {
  const [formData, setFormData] = useState({
    name: editingRoom?.name || "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingRoom) {
      setFormData({ name: editingRoom.name });
    }
    setErrors({});
    setSuccess(false);
  }, [editingRoom]);

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
      await editRoom({ id: editingRoom.id, name: formData.name.trim() });
      setSuccess(true);
      toast.success("Room updated successfully!");
      if (onUpdated) onUpdated();
      return true;
    } catch (error) {
      console.error("Error updating room:", error);
      setErrors({ submit: "Failed to update form. Please try again." });
      toast.error("Failed to update Room");
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
    if (!formData.name.trim()) newErrors.name = "Room name is required";
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




