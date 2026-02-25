"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ACTIVITY_API_ENDPOINTS } from "@/config/api";
import LiveMonitoringWashroom from './../../components/live-monitoring/LiveMonitoringWashroom';

export default function WashroomMonitoringPage() {
  const searchParams = useSearchParams();
  const [sensorId, setSensorId] = useState([]);
  
    const currentPage = Number(searchParams.get("page")) || 1;
  
    const itemsPerPage = 18;
    const totalPages = Math.ceil(sensorId.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWashrooms = sensorId.slice(startIndex, endIndex);
    
    const openPageInNewTab = (page) => {
      const url = `/live-monitoring-module/washroom?page=${page}`;
      window.open(url, "_blank");  // 🔥 opens new tab
    };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(ACTIVITY_API_ENDPOINTS.SENSOR_ID);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        setSensorId(data.sensonIds || []);
        console.log("Updated washroom:", sensorId);

      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchActivities();
  }, []);

  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 py-8">
        {/* Module Grid */}
        <div className="mb-2 flex justify-between">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Washroom Status Overview</h2>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => openPageInNewTab(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
          >
            ◀ Prev
          </button>

          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => openPageInNewTab(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
          >
            Next ▶
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {currentWashrooms.slice(0, 18).map((sensor) => (
            <LiveMonitoringWashroom key={sensor.id} sensorId={sensor} />
          ))}
        </div>
      </div>
    </main>
  )
}
