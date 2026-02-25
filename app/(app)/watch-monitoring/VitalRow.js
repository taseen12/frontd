
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CONNECTION } from "@/config/api";
import { Heart, User } from "lucide-react";



export default function VitalRow({ patientId }) {
  const room = "RM-101";
  const watchId = "Watch-001";
  const status = "normal"; // normal | warning | critical

  const [healthSocket, setHealthSocket] = useState({});

  const statusStyles = {
    normal: "border-emerald-500 bg-white dark:bg-slate-900",
    warning:
      "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    critical:
      "border-red-500 bg-red-50 dark:bg-red-950/30",
  };

  const textAlert =
    status === "critical"
      ? "text-red-500"
      : status === "warning"
        ? "text-amber-600 dark:text-amber-400"
        : "text-slate-700 dark:text-slate-200";

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${CONNECTION.SOCKET}`, { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    console.log("🟡 Connecting to SignalR…");

    connection.start()
      .then(() => {
        console.log("✅ Connected to SignalR Hub");
        // setAlert(true)

        connection.on(`receivehealth_${patientId}`, (msg) => {
          console.log('Received message health', msg)
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
  }, [patientId]);


  return (
    <div
      className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr] items-center gap-4
      p-5 rounded-xl shadow-sm border-l-4 mb-4
      ${statusStyles[status]}`}
    >
      {/* Profile */}
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center
          bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200
          font-semibold text-sm"
        >
          <User size={22} />
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-100">
            {healthSocket.residentName}
          </div>
          <div className="text-xs text-slate-400">
            Room {room} | Watch ID: {watchId}
          </div>
        </div>
      </div>

      {/* Heart Rate */}
      <div className="text-center">
        <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-1">
          Heart Rate
        </div>
        <div className={`text-lg font-bold ${textAlert} flex justify-center items-center`}>
          <Heart size={20} fill="red"
            stroke="red" className="w-auto inline mr-2 animate-blink text-red-500" />
          {healthSocket.heartRate} <span className="text-xs">bpm</span>
        </div>
      </div>

      {/* SpO2 */}
      <div className="text-center">
        <div className="text-[10px] uppercase font-extrabold text-slate-400">
          Oxygen
        </div>
        <div className={`text-lg font-bold ${textAlert}`}>
          {healthSocket.spo2}%
        </div>
  </div>

      {/* Temperature */}
      <div className="text-center">
        <div className="text-[10px] uppercase font-extrabold text-slate-400">
          Temp
        </div>
        <div className={`text-lg font-bold ${textAlert}`}>
          {healthSocket.skinTemp}°C
        </div>
      </div>

      {/* Action */}
      <div className="text-right">
        <div className="flex items-center gap-3">
          {/* History */}
          <button
            className="px-4 py-2 rounded-md text-xs font-bold border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            History
          </button>

          {/* Review Note */}
          <button
            className="px-4 py-2 rounded-md text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition" >
            Review Note
          </button>

          {/* Emergency Alert */}
          <button className="px-4 py-2 rounded-md text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition animate-pulse" >
            EMERGENCY ALERT
          </button>
        </div>
      </div>
    </div>
  );
}
