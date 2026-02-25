"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusCircle, List } from "lucide-react";
import ModuleLayout from "../ModuleLayout";
import PatientList from "./PatientList"
import AddPatientForm from "./AddPatientForm"

export default function PatientLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeView, setActiveView] = useState(
    searchParams.get("view") || "list"
  );

  useEffect(() => {
    const view = searchParams.get("view");
    if (view) {
      setActiveView(view);
    }
  }, [searchParams]);

  const eventMenuItems = [
    {
      id: "list",
      name: "Patient List",
      icon: <List size={18} />,
      active: activeView === "list",
    },
    {
      id: "add",
      name: "Add Patient",
      icon: <PlusCircle size={18} />,
      active: activeView === "add",
    },
  ];

  const handleMenuClick = (itemId) => {
    setActiveView(itemId);
    router.push(`/patients?view=${itemId}`, { shallow: true });
  };

  const menuItemsWithHandlers = eventMenuItems.map((item) => ({
    ...item,
    path: `/patients?view=${item.id}`,
    onClick: () => handleMenuClick(item.id),
  }));

  const getTitle = () => {
    switch (activeView) {
      case "add":
        return "Add New Patient";
      case "list":
      default:
        return "Patient List";
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "add":
        return <AddPatientForm />;
      case "list":
      default:
        return <PatientList />;
    }
  };

  return (
    <ModuleLayout title={getTitle()} menuItems={menuItemsWithHandlers}>
      <div className="max-w-full">
        {renderContent()}
      </div>
    </ModuleLayout>
  );
}