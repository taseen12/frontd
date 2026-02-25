"use client";

import ConfigurationsLayout from "../../components/configurations/ConfigurationLayout";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function ConfigurationsPage() {
  return (
    <ProtectedRoute>
      <ConfigurationsLayout />
    </ProtectedRoute>
  );
}
