"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";
import { Loader, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { changedPassword } from "../../../services/memberService";

export default function ChangedPassword({ isOpen, onClose, memberId }) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setIsLoading(true);

    try {
      // Call the API to update the password
      await changedPassword(
        memberId,
        passwordForm.newPassword,
        passwordForm.currentPassword
      );

      // Show success message
      setIsSuccess(true);

      // Close modal after a delay
      setTimeout(() => {
        onClose();
        // Reset form and success state after closing
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to reset password:", err);
      setErrors({
        submit: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Password Reset Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              Your password has been updated.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              Please set a new password for your account.
            </p>

            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{errors.submit}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    error={errors.currentPassword}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    tabIndex="-1"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    error={errors.newPassword}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex="-1"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Skip for Now
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Setting Password...
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
