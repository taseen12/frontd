"use client";

import PatientLayout from "../../components/patients/PatientLayout";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function ConfigurationsPage() {
  return (
    <ProtectedRoute>
      <PatientLayout />
    </ProtectedRoute>
  );
}
