"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormField,
  FormLabel,
  FormError,
  FormDescription,
} from "@/app/components/ui/form";

export default function Register() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values) => {
    // Reset errors and success
    setErrors({});
    setSuccess(false);

    // Simple validation
    const newErrors = {};
    if (!values.name) {
      newErrors.name = "Name is required";
    }

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically make an API call to register the user
    console.log("Registration form submitted:", values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    setSuccess(true);
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-primaryColor rounded-md text-sm">
                Registration successful! You can now{" "}
                <Link href="/login" className="underline">
                  login
                </Link>
                .
              </div>
            )}

            <Form onSubmit={handleSubmit} submitText="Create Account">
              <FormField>
                <FormLabel htmlFor="name" required>
                  Name
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  error={errors.name}
                />
                <FormError error={errors.name} />
              </FormField>

              <FormField>
                <FormLabel htmlFor="email" required>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email}
                />
                <FormError error={errors.email} />
                <FormDescription>
                  We will never share your email with anyone else.
                </FormDescription>
              </FormField>

              <FormField>
                <FormLabel htmlFor="password" required>
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password}
                />
                <FormError error={errors.password} />
              </FormField>

              <FormField>
                <FormLabel htmlFor="confirmPassword" required>
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                />
                <FormError error={errors.confirmPassword} />
              </FormField>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primaryColor hover:text-green-800 underline"
              >
                Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
