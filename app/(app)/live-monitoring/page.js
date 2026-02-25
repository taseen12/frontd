"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
import { RESIDENT_ENDPOINTS } from "@/config/api";
import { getLiveMonitoring } from '../../../services/liveMonitoringService';
import LiveMonitoringPatient from '../../components/live-monitoring/LiveMonitoringPatient';
import FullscreenWrapper from './../../components/FullscreenWrapper';

export default function PatientMonitoringPage() {
  const searchParams = useSearchParams();
  const [patientId, setPatientId] = useState([]);
  const [monitoring, setMonitoring] = useState([]);

  const currentPage = Number(searchParams.get("page")) || 1;

  const itemsPerPage = 18;
  const totalPages = Math.ceil(patientId.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = patientId.slice(startIndex, endIndex);


  const openPageInNewTab = (page) => {
    const url = `/live-monitoring?page=${page}`;
    window.open(url, "_blank");  // 🔥 opens new tab
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(RESIDENT_ENDPOINTS.RESIDENT_ID);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        setPatientId(data.residentIds || []);

        // Update existing patients with new IDs
        // setPatients(prev =>
        //   prev.map((p, index) => ({
        //     ...p,
        //     id: patientId?.[index] || p.id, // replace if available
        //   }))
        // );
        console.log("Updated patients:", patientId);

      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchActivities();
  }, []);

  const fetchMonitoring = async () => {

    try {
      const monitoring = await getLiveMonitoring();
      setMonitoring(monitoring || []);
    } catch (err) {
      console.error("Failed to fetch monitoring:", err);
    }
  };

  console.log("monitoring:", monitoring);

  useEffect(() => {
    fetchMonitoring();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FullscreenWrapper>
        <div className="mx-auto px-4 py-8">

          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Patient Status Overview
            </h2>
          </div>

          {/* Pagination */}
          <div className="flex item-center gap-4 mb-4">
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

          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {currentPatients.map((patient) => (
              <LiveMonitoringPatient key={patient.id} patientId={patient} />
            ))}
          </div>
        </div>
      </FullscreenWrapper>
    </main>
  )
}