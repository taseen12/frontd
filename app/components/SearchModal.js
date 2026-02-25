"use client"

import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { X, Plus, Search, Trash2 } from "lucide-react"


export default function SearchModal({ isOpen, onClose, onSearch, currentFilters = {}, fieldOptions = {} }) {
  console.log(fieldOptions)
    const [searchFields, setSearchFields] = useState([])
    const [availableFields, setAvailableFields] = useState([])
    const [showFieldSelector, setShowFieldSelector] = useState(false)
  
  const getPredefinedFields = () => [
      { id: "fullName", label: "Full Name", type: "text", placeholder: "Enter full name..." },
      { id: "phone", label: "Mobile Number", type: "text", placeholder: "Enter mobile number..." },
      { id: "memberid", label: "Membership Number", type: "text", placeholder: "Enter membership number..." },
      { id: "wingId", label: "Wing", type: "text", type: "select", options: fieldOptions.wings || [] },
      { id: "constituencyId", label: "Constituency", type: "select", options: fieldOptions.constituencies || [], placeholder: "Select constituency...", },
    ]

    // Update available fields when fieldOptions change
  useEffect(() => {
    setAvailableFields(getPredefinedFields())
  }, [fieldOptions])

  // Initialize with current filters
  useEffect(() => {
    if (isOpen && Object.keys(currentFilters).length > 0) {
      const initialFields = Object.entries(currentFilters).map(([key, value]) => {
        // const fieldDef = PREDEFINED_FIELDS.find((f) => f.id === key) || {
        const fieldDef = getPredefinedFields().find((f) => f.id === key) || {
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: "text",
          placeholder: `Enter ${key}...`,
        }
        return {
          ...fieldDef,
          value: value,
          uniqueId: `${key}_${Date.now()}`,
        }
      })
      setSearchFields(initialFields)
    } else if (isOpen && searchFields.length === 0) {
      // Add default search field
       addSearchField(getPredefinedFields()[0])
    }
  }, [isOpen, currentFilters, fieldOptions])

  const addSearchField = (fieldDef) => {
    const newField = {
      ...fieldDef,
      value: "",
      uniqueId: `${fieldDef?.id}_${Date.now()}`,
    }
    setSearchFields((prev) => [...prev, newField])
    setShowFieldSelector(false)
  }

  const removeSearchField = (uniqueId) => {
    setSearchFields((prev) => prev.filter((field) => field.uniqueId !== uniqueId))
  }

  const updateFieldValue = (uniqueId, value) => {
    setSearchFields((prev) => prev.map((field) => (field.uniqueId === uniqueId ? { ...field, value } : field)))
  }

  const handleSearch = () => {
    const filters = {}
    searchFields.forEach((field) => {
      if (field.value && field.value.trim()) {
        filters[field.id] = field.value.trim()
      }
    })
    onSearch(filters)
    onClose()
  }

  const clearAllFields = () => {
    setSearchFields([])
    onSearch({})
  }

  const getAvailableFieldsForSelection = () => {
    const usedFieldIds = searchFields.map((f) => f.id)
    return availableFields.filter((field) => !usedFieldIds.includes(field.id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {searchFields.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No search fields added yet</p>
                <Button
                  onClick={() => addSearchField(availableFields[0])}
                  className="bg-primaryColor hover:bg-primaryColor text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Search Field
                </Button>
              </div>
            ) : (
                searchFields.map((field) => (
                <div
                  key={field.uniqueId}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={field.value}
                        onChange={(e) => updateFieldValue(field.uniqueId, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200"
                      >
                        <option value="">{field.placeholder || `Select ${field.label}`}</option>
                        {field.options && field.options.length > 0 ? (
                          field.options.map((option) => (
                            <option
                              key={typeof option === "object" ? option.id : option}
                              value={typeof option === "object" ? option.id : option}
                            >
                              {typeof option === "object" ? option.name : option}
                            </option>
                          ))
                        ) : (
                          <option disabled className="text-gray-400">
                            No options available
                          </option>
                        )}
                      </select>
                    ) : (
                      <Input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => updateFieldValue(field.uniqueId, e.target.value)}
                        placeholder={field.placeholder}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSearchField(field.uniqueId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}

            {/* Add Field Section */}
            {searchFields.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                {!showFieldSelector ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowFieldSelector(true)}
                    className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-primaryColor dark:hover:text-green-400"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Search Field
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Field to Add:</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFieldSelector(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {getAvailableFieldsForSelection().map((field) => (
                        <Button
                          key={field.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addSearchField(field)}
                          className="justify-start text-left hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500"
                        >
                          {field.label}
                          {field.type === "select" && field.options && field.options.length === 0 && (
                            <span className="ml-1 text-xs text-gray-400">(No options)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                    {getAvailableFieldsForSelection().length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                        All available fields have been added
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            {searchFields.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearAllFields}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Clear All
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSearch}
              disabled={searchFields.length === 0 || !searchFields.some((f) => f.value && f.value.trim())}
              className="bg-primaryColor hover:bg-primaryColor text-white disabled:opacity-50"
            >
              <Search className="h-4 w-4 mr-2" />
              Search ({searchFields.filter((f) => f.value && f.value.trim()).length})
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
