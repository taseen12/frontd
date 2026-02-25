"use client"

import { useState } from "react"
import { Button } from "./button"

export function Form({
  onSubmit,
  children,
  submitText = "Submit",
  submitVariant = "primary",
  submitFullWidth = true,
  submitRenderer,
  disabled = false,
  className = "",
  ...props
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (disabled || isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())

    try {
      await onSubmit(formValues, formData)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} {...props}>
      {children}

      {/* 🔥 Custom submit button support */}
      {submitRenderer ? (
        submitRenderer({ isSubmitting, submitText })
      ) : (
        submitText && (
          <Button
            type="submit"
            variant={submitVariant}
            disabled={disabled || isSubmitting}
            className={submitFullWidth ? "w-full" : ""}
          >
            {isSubmitting ? "Submitting..." : submitText}
          </Button>
        )
      )}
    </form>
  )
}

export function FormField({ children, className = "", ...props }) {
  return (
    <div className={`space-y-1 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function FormLabel({ children, htmlFor, required = false, className = "", ...props }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

export function FormError({ error, className = "", ...props }) {
  if (!error) return null

  return (
    <p className={`text-xs text-red-500 mt-1 ${className}`} {...props}>
      {error}
    </p>
  )
}

export function FormDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-xs text-gray-500 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function FormActions({ children, className = "", ...props }) {
  return (
    <div className={`flex items-center justify-end space-x-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

