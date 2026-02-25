import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Card } from "../ui/card";
import { Activity, AlertTriangle, Clock, Radio } from "lucide-react"
import { CONNECTION } from "../../../config/api";

export default function LiveMonitoringWashroom({ sensorId }) {
  const [activitySocket, setActivitySocket] = useState([]);

  //   const getPresenceStatus = () => {
  //   if (activitySocket.serviceMode)
  //     return { label: "Service Mode", color: "bg-yellow-500", textColor: "text-yellow-700 dark:text-yellow-300" }
  //   if (!activitySocket.humanPresence) return { label: "Empty", color: "bg-gray-500", textColor: "text-gray-700 dark:text-gray-300" }
  //   if (activitySocket.fallStatus) return { label: "Fall Alert", color: "bg-red-500", textColor: "text-red-700 dark:text-red-300" }
  //   if (activitySocket.movementStatus === 1)
  //     return { label: "Movement", color: "bg-green-500", textColor: "text-primaryColor dark:text-green-300" }
  //   return { label: "Occupied", color: "bg-blue-500", textColor: "text-blue-700 dark:text-blue-300" }
  // }

  // const status = getPresenceStatus()
  const recordTime = new Date(activitySocket.recordedAt).toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${CONNECTION.SOCKET}`, { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    console.log("🟡 Connecting to SignalR…");

    connection.start()
      .then(() => {
        console.log("✅ Connected to SignalR Hub");

        connection.on(`ReceiveWashRmActivity_${sensorId}`, (msg) => {
          console.log('Received message activity', msg)
          setActivitySocket(msg);
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
    <Card className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
      {/* Header: Room Number & Status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 shadow-lg border-2 border-black-500 text-black-500 text-xs font-bold flex items-center justify-center rounded-lg bg-white">
            {activitySocket.roomName}
          </div>


          {/* <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Washroom</span> */}
        </div>
        {activitySocket.serviceMode && (
          <div className="bg-green-500 text-white dark:text-green-100 font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
            Service Mode
          </div>

        )}

      </div>

      {/* Sensor Status Grid */}
      <div className="grid grid-cols-2 gap-2 mb-2">

        {/* Presence */}
        <div
          className={`flex items-center gap-2 p-2 rounded-lg border transition-all
      ${activitySocket.humanPresence
              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-primaryColor"
              : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            }`}
        >
          <Activity
            className={`w-4 h-4 
        ${activitySocket.humanPresence ? "text-primaryColor" : "text-gray-500"}
      `}
          />
          <span
            className={`text-xs font-bold 
        ${activitySocket.humanPresence ? "text-primaryColor dark:text-green-300" : "text-gray-500"}
      `}
          >
            {activitySocket.humanPresence ? "Occupied" : "Not Occupied"}
          </span>
        </div>

        {/* Movement — only show when > 0 */}
        {activitySocket.movementStatus !== 0 && (
          <div
            className={`flex items-center gap-2 p-2 rounded-lg border transition-all 
        ${activitySocket.movementStatus === 1
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
                : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              }`}
          >
            <Radio
              className={`w-4 h-4 
          ${activitySocket.movementStatus === 1 ? "text-blue-600" : "text-gray-500"}
        `}
            />
            <span
              className={`text-xs font-bold 
          ${activitySocket.movementStatus === 1 ? "text-blue-700 dark:text-blue-300" : "text-gray-500"}
        `}
            >
              {activitySocket.movementStatus === 1 ? "Moderate" : "Less Movement"}
            </span>
          </div>
        )}

      </div>

      {/* Fall Detection */}
      <div
        className={`flex items-center justify-center gap-2 p-2 rounded-lg border transition-all 
    ${activitySocket.fallStatus
            ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
            : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          }`}
      >
        <AlertTriangle
          className={`w-4 h-4 
      ${activitySocket.fallStatus ? "text-red-600" : "text-gray-500"}
    `}
        />
        <span
          className={`text-xs font-bold 
      ${activitySocket.fallStatus ? "text-red-700 dark:text-red-300" : "text-gray-500"}
    `}
        >
          {activitySocket.fallStatus ? "Fall Detected" : "(No) Fall Detected"}
        </span>
      </div>


      {/* Footer: Timestamp */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-1.5">
        <div className="flex items-center gap-1">
          <Radio className="w-2.5 h-2.5" />
          <span>{activitySocket.serviceMode ? "Service Mode" : "Active"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          <span>{recordTime}</span>
        </div>
      </div>
    </Card>
  );
}