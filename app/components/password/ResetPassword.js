"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CardHeader, CardTitle } from "../ui/card";
import { resetPassword } from "@/services/memberService";
import { Loader, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Modal } from "../ui/modal";

export default function PasswordReset({ userId, isOpen, onClose }) {
  const [passwordForm, setPasswordForm] = useState({
    id: userId,
    password: "",
    confirmPassword: "",
    passwordRequired: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
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
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};

    if (!passwordForm.password) {
      newErrors.password = "New password is required";
    } else if (passwordForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.password !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(passwordForm);

      // Show success message
      setIsSuccess(true);

      // Close modal after a delay
      setTimeout(() => {
        onClose();
        // Reset form fields
        setPasswordForm({
          password: "",
          confirmPassword: "",
          passwordRequired: false,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Password Reset Successfully!
              </h3>
              <p className="text-gray-600 mb-4">
                Password has been reset.
                {/* Your password has been reset. You will be redirected to the home
                page shortly. */}
              </p>
            </div>
          ) : (
            <>
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{errors.submit}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showpassword ? "text" : "password"}
                      value={passwordForm.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      error={errors.password}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setShowpassword(!showpassword)}
                      tabIndex="-1"
                    >
                      {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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

                <div className="flex items-center">
                  <input
                    id="passwordRequired"
                    type="checkbox"
                    checked={passwordForm.passwordRequired}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        passwordRequired: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="passwordRequired"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Password change required on next login
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Setting Password...
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
