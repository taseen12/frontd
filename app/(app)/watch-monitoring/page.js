'use client'

import { useEffect, useState } from "react";
import {  HeartPulse } from "lucide-react";
import VitalRow from "./VitalRow";
import { RESIDENT_ENDPOINTS } from "@/config/api";

export default function WatchMonitoringPage() {
  const [patientId, setPatientId] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(RESIDENT_ENDPOINTS.RESIDENT_ID);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPatientId(data.residentIds || []);

      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchActivities();
  }, []);

  
  return (
    <div className="animate-fade-in p-12 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900 dark:text-sky-300">
          <HeartPulse className="w-auto" /> VitalWatch Pro: Live Telemetry
        </h2>
      </div>
      {patientId.map((patient) => (
        <VitalRow key={patient.id} patientId={patient} />
      ))}
      {/* Grid */}
      {/* <div className="grid gap-4">
        <VitalRow
          name="Margaret Jones"
          room="101"
          watchId="VW-882"
          heartRate={72}
          spo2={98}
          temp={36.6}
        />

        <VitalRow
          name="Arthur Miller"
          room="102"
          watchId="VW-901"
          heartRate={88}
          spo2={96}
          temp={38.1}
          status="warning"
          actionLabel="Review Note"
        />

        <VitalRow
          name="Sarah Smith"
          room="103"
          watchId="VW-774"
          heartRate={110}
          spo2={91}
          temp={36.8}
          status="critical"
          actionLabel="EMERGENCY ALERT"
        />
      </div> */}
    </div>
  );
}
