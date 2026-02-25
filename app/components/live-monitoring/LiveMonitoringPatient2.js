import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Card, CardContent } from "./ui/card";
import {
  HeartPulse,
  Thermometer,
  Battery,
  Droplets,
  Camera,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { CONNECTION } from "../../../config/api";


const getStatusColor = (status) => {
  switch (status) {
    case "SIT":
      return "bg-blue-300 text-black dark:bg-blue-900 dark:text-blue-300"
    case "STAND":
      return "bg-green-300 text-black dark:bg-green-900 dark:text-green-300"
    case "LIE":
      return "bg-amber-300 text-black dark:bg-amber-900 dark:text-amber-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function LiveMonitoringPatient2({ patientId }) {
  const [activitySocket, setActivitySocket] = useState([]);
  const [healthSocket, setHealthSocket] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${CONNECTION.SOCKET}`, { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    console.log("🟡 Connecting to SignalR…");

    connection.start()
      .then(() => {
        console.log("✅ Connected to SignalR Hub");

        // Subscribe after connection starts
        connection.on(`receiveactivity_${patientId}`, (msg) => {
          console.log('Received message activity', msg)
          // setSocket(prev => [...prev, { message: msg }]);
          setActivitySocket(msg);
        });

        connection.on(`receivehealth_${patientId}`, (msg) => {
          console.log('Received message health', msg)
          // setSocket(prev => [...prev, { message: msg }]);
          setHealthSocket(msg);
        });

      })
      .catch(err => console.error("❌ Connection failed:", err));

    connection.onclose(error => {
      console.warn("⚠️ Connection closed:", error);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="p-1">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="space-y-3 p-3">
          {/* Top Section: Patient + Room */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-gray-700 text-sm font-bold py-1.5 px-2 rounded-lg">
              <Link
                href={`/patients/details/${patientId}`}
                className="text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer hover:underline"
              >
              {activitySocket.patientName}
              </Link>
            </div>
            <div className="w-12 h-12 bg-gray-600 text-white text-sm font-semibold flex items-center justify-center rounded-full">
              {activitySocket.roomName}
            </div>
          </div>

          {/* Activity Status */}
          <div className="flex flex-col items-center justify-center py-1">
            <div
              className={`${getStatusColor(
                activitySocket.activityTypeName
              )} font-semibold text-base px-6 py-2 rounded-full shadow-md w-32 text-center flex items-center justify-center gap-1`}
            >
              {/* <Activity className="w-4 h-4" /> */}
              {activitySocket.activityTypeName}
            </div>
          </div>

          {/* Health Data Section */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 border-t border-gray-200 dark:border-gray-700 pt-3">
            {/* Heart Rate */}
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <div className="flex items-center gap-1 font-semibold">
                <HeartPulse className="w-4 h-4" /> <span className="text-red-500">{healthSocket.heartRate ?? "—"} bpm</span>
              </div>
            </div>

            {/* SpO₂ */}
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <div className="flex items-center gap-1 font-semibold">
                <Droplets className="w-4 h-4" /> <span className="text-blue-500">{healthSocket.spo2 ?? "—"}%</span>
              </div>
              {/* <span className="text-lg font-bold text-blue-500">
                
              </span> */}
            </div>

            {/* Skin Temperature */}
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <div className="flex items-center gap-1 font-semibold">
                <Thermometer className="w-4 h-4" /> <span className="text-orange-500">{healthSocket.skinTemp ?? "—"}°F</span>
              </div>
              {/* <span className="text-lg font-bold text-orange-500">
                
              </span> */}
            </div>

            {/* Battery */}
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <div className="flex items-center gap-1 font-semibold">
                <Battery className="w-4 h-4" /> <span span className="text-green-500">{healthSocket.batteryLevel ?? "—"}%</span>
              </div>
              {/* <span className="text-lg font-bold text-green-500">
                {healthSocket.batteryLevel ?? "—"}%
              </span> */}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs opacity-70 border-t border-gray-200 dark:border-gray-700 pt-2">
            <div className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-gray-700">{activitySocket.cameraName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-gray-700">
                {new Date(activitySocket.activityStart).toLocaleTimeString("en-GB", {
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>




      {/* {error && <p className="text-red-500">Error: {error}</p>} */}
      {/* {notifications.length === 0 ? (
        <p className="text-gray-500">No activity yet...</p>
      ) : ( */}
    </div>
  );
}