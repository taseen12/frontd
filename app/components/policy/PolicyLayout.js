"use client"

import { useEffect, useState } from "react"
import { Activity, HeartPulse } from "lucide-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter, useSearchParams } from "next/navigation"
import ModuleLayout from "../ModuleLayout"
import AddActivityPolicyForm from "./AddActivityPolicyForm"
import ActivityPolicyList from "./ActivityPolicyList"
import AddHealthPolicyForm from "./AddHealthPolicyForm"
import HealthPolicyList from "./HealthPolicyList"

export default function PolicyLayout() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeView, setActiveView] = useState(
    searchParams.get("view") || "activity"
  )
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [editingPolicy, setEditingPolicy] = useState(null)
  const [formKey, setFormKey] = useState(Date.now())

  useEffect(() => {
    const view = searchParams.get("view")
    if (view) {
      setActiveView(view)
    }
  }, [searchParams])

  const handlePolicyAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy)
    setFormKey(Date.now())
  }

  const handleCancelEditPolicy = () => {
    setEditingPolicy(null)
    setFormKey(Date.now())
  }

  const handleUpdatedPolicy = () => {
    setEditingPolicy(null)
    setFormKey(Date.now())
    setRefreshTrigger((prev) => prev + 1)
  }

  const menuItems = [
    {
      id: "activity",
      name: "Activity Policy",
      icon: <Activity size={18} />,
      active: activeView === "activity",
    },
    {
      id: "health",
      name: "Health Policy",
      icon: <HeartPulse size={18} />,
      active: activeView === "health",
    },
  ]

  const handleMenuClick = (itemId) => {
    setActiveView(itemId)
    router.push(`/policy?view=${itemId}`, { shallow: true })
  }

  const menuItemsWithHandlers = menuItems.map((item) => ({
    ...item,
    path: `/policy?view=${item.id}`,
    onClick: () => handleMenuClick(item.id),
  }))

  const getTitle = () => {
    switch (activeView) {
      case "activity":
        return "Activity Policy"
      case "health":
        return "Health Policy"
      default:
        return "Policy"
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case "activity":
        return (
          <div className="space-y-4">
            <AddActivityPolicyForm
              key={formKey}
              editingPolicy={editingPolicy}
              onCancelEdit={handleCancelEditPolicy}
              onUpdated={handleUpdatedPolicy}
              onPolicyAdded={handlePolicyAdded}
            />
            <ActivityPolicyList
              key={`activity-${refreshTrigger}`}
              onEdit={handleEditPolicy}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )
      case "health":
        return (
          <div className="space-y-4">
            <AddHealthPolicyForm
              key={formKey}
              editingPolicy={editingPolicy}
              onCancelEdit={handleCancelEditPolicy}
              onUpdated={handleUpdatedPolicy}
              onPolicyAdded={handlePolicyAdded}
            />
            <HealthPolicyList
              key={`health-${refreshTrigger}`}
              onEdit={handleEditPolicy}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <ModuleLayout title={getTitle()} menuItems={menuItemsWithHandlers}>
        <div className="max-w-full">
          {renderContent()}
        </div>
      </ModuleLayout>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}