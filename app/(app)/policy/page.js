import PolicyLayout from "../../components/policy/PolicyLayout";
import { ProtectedRoute } from "../../components/ProtectedRoute";


export default function PolicyPage() {
  return (
    <ProtectedRoute>
      <PolicyLayout />
    </ProtectedRoute>
  );
}
