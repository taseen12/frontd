'use client'

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import RadarCard from "./RadarCard";
import { ACTIVITY_API_ENDPOINTS } from "@/config/api";

export default function WashroomMonitoringPage() {
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(ACTIVITY_API_ENDPOINTS.SENSOR_ID);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        setSensors(data.sensonIds || []);
        setIsLoading(false);
        console.log("Updated washroom sensor id--:", data.sensonIds);

      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchActivities();
  }, []);


  return (
    <div className="animate-fade-in p-12 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl flex items-center gap-2 text-blue-900 dark:text-sky-300">
          <Radio size={22} className="w-auto" /> mmWave Bathroom Radar
        </h2>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-6 text-center text-gray-500">
          Loading sensor data...
        </div>
      )}

      {/* No data state */}
      {!isLoading && sensors?.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          No sensor data available
        </div>
      )}

      {/* Data available */}
      {!isLoading && sensors?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {sensors.map((sensor) => (
            <RadarCard key={sensor.id} sensorId={sensor.id} />
          ))}
        </div>
      )}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <RadarCard
          room="RM 101"
          status="OCCUPIED"
          duration="00:14:22"
          movement="Movement: Micro-respiration detected."
        />

        <RadarCard
          room="RM 102"
          alert
          emergency
        />

        <RadarCard
          room="RM 103"
          status="VACANT"
          vacant
          duration="42 mins ago"
        />
      </div> */}
    </div>
  );
}
