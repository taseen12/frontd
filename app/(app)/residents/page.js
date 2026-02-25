"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ResidentsTable from "./ResidentsTable";
import Tabs from "./Tabs";

export default function ResidentPage() {
  const params = useSearchParams();
  const view = params.get("view");
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Residents
        </h1>

        {!view && (
          <button
            onClick={() =>
              router.push("/residents?view=add&tab=intake")
            }
            className="px-4 py-2 rounded-lg bg-blue-900 text-white dark:bg-yellow-500 dark:text-gray-900"
          >
            + Add Resident
          </button>
        )}
      </div>

      {!view && <ResidentsTable />}

      {view === "add" && <Tabs />}
    </div>
  );
}
