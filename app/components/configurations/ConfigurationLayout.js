"use client"

import { useState, useEffect } from "react"
import { Layers, UsersRound } from "lucide-react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from "next/navigation"
import ModuleLayout from "../ModuleLayout"
import RoomList from "./RoomList"
import AddRoomForm from "./AddRoomForm"
import GroupList from "./GroupList"
import AddGroupForm from "./AddGroupForm"
import RoleList from './RoleList';
import AddRoleForm from './AddRoleForm';

export default function ConfigurationsLayout() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeView, setActiveView] = useState(
    searchParams.get("view") || "rooms"  // Default to "rooms" view
  )
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [editingRoom, setEditingRoom] = useState(null)
  const [roomFormKey, setRoomFormKey] = useState(Date.now())
  const [editingGroup, setEditingGroup] = useState(null)
  const [editingRole, setEditingRole] = useState(null)
  const [groupFormKey, setGroupFormKey] = useState(Date.now())
  const [roleFormKey, setRoleFormKey] = useState(Date.now())

  useEffect(() => {
    const view = searchParams.get("view")
    if (view) {
      setActiveView(view)
    }
  }, [searchParams])

  const handleRoomAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }
  const handleGroupAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleEditRole = (room) => {
    setEditingRole(room)
    setRoleFormKey(Date.now())
  }
  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setRoomFormKey(Date.now())
  }
  const handleEditGroup = (group) => {
    setEditingGroup(group)
    setGroupFormKey(Date.now())
  }

  const handleCancelEditRole = () => {
    setEditingRole(null)
    setRoleFormKey(Date.now())
  }

  const handleCancelEditRoom = () => {
    setEditingRoom(null)
    setRoomFormKey(Date.now())
  }
  const handleCancelEditGroup = () => {
    setEditingGroup(null)
    setGroupFormKey(Date.now())
  }

  const handleUpdatedRole = () => {
    setEditingRole(null)
    setRoleFormKey(Date.now())
    setRefreshTrigger(prev => prev + 1)
  }

  const handleUpdatedRoom = () => {
    setEditingRoom(null)
    setRoomFormKey(Date.now())
    setRefreshTrigger(prev => prev + 1)
  }
  const handleUpdatedGroup = () => {
    setEditingGroup(null)
    setGroupFormKey(Date.now())
    setRefreshTrigger(prev => prev + 1)
  }

  const menuItems = [
    {
      id: "role",
      name: "Role",
      icon: <Layers size={18} />,
      active: activeView === "role",
    },
    {
      id: "rooms",
      name: "Rooms",
      icon: <Layers size={18} />,
      active: activeView === "rooms",
    },
    {
      id: "groups",
      name: "Groups",
      icon: <UsersRound size={18} />,
      active: activeView === "groups",
    },
  ]

  const handleMenuClick = (itemId) => {
    setActiveView(itemId)
    router.push(`/configurations?view=${itemId}`, { shallow: true })
  }

  const menuItemsWithHandlers = menuItems.map((item) => ({
    ...item,
    path: `/configurations?view=${item.id}`,
    onClick: () => handleMenuClick(item.id),
  }))

  const getTitle = () => {
    switch (activeView) {
      case "role":
        return "Role Configuration"
      case "rooms":
        return "Room Configuration"
      case "groups":
        return "Group Configuration"
      default:
        return "Configurations"
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case "role":
        return (
          <div className="space-y-4">
            <AddRoleForm
              key={roleFormKey}
              editingRoom={editingRole}
              onCancelEdit={handleCancelEditRole}
              onUpdated={handleUpdatedRole}
              onRoomAdded={handleRoomAdded}
            />
            <RoleList
              key={`role-${refreshTrigger}`}
              onEdit={handleEditRole}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )
      case "rooms":
        return (
          <div className="space-y-4">
            <AddRoomForm
              key={roomFormKey}
              editingRoom={editingRoom}
              onCancelEdit={handleCancelEditRoom}
              onUpdated={handleUpdatedRoom}
              onRoomAdded={handleRoomAdded}
            />
            <RoomList
              key={`rooms-${refreshTrigger}`}
              onEdit={handleEditRoom}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )
      case "groups":
        return (
          <div className="space-y-4">
            <AddGroupForm
              key={groupFormKey}
              editingGroup={editingGroup}
              onCancelEdit={handleCancelEditGroup}
              onUpdated={handleUpdatedGroup}
              onGroupAdded={handleGroupAdded}
            />
            <GroupList
              key={`groups-${refreshTrigger}`}
              onEdit={handleEditGroup}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )
      default:
        return <RoomList />
    }
  }

  return (
    <>
      <ModuleLayout title={getTitle()} menuItems={menuItemsWithHandlers}>
        <div className="max-w-full">
          {activeView === "addroom" && (
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add a new room to the organization. Fill out the form below with the room details.
            </p>
          )}
          {renderContent()}
        </div>
      </ModuleLayout>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}