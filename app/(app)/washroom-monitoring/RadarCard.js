import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { CONNECTION } from "@/config/api";

export default function RadarCard({ sensorId }) {
  const status = "OCCUPIED";
  const movement = "";
  const alert = "";
  const vacant = "";
  const emergency = "";
  
  const [washroomSocket, setWashroomSocket] = useState([]);
  const [duration, setDuration] = useState("00:00:00");
  const [startTime, setStartTime] = useState(null);
    
  
  useEffect(() => {
  if (!washroomSocket) return;

    // Reset timer when new SignalR data arrives
    setStartTime(Date.now());
  }, [washroomSocket]);
  
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);

      setDuration(
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

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
        connection.on(`ReceiveWashRmActivity_${sensorId}`, (msg) => {
          console.log('Received message washroom', msg)
          setWashroomSocket(msg);
        });

      })
      .catch(err => console.error("❌ Connection failed:", err));

    connection.onclose(error => {
      console.warn("⚠️ Connection closed:", error);
    });

    return () => {
      connection.stop();
    };
  }, [sensorId]);
  
  return (
    <div
      className={`relative rounded-2xl p-5 shadow-md overflow-hidden
      bg-white dark:bg-slate-900
      ${alert
        ? "border-2 border-red-500 dark:border-red-600 dark:bg-red-950/40"
        : "border border-slate-200 dark:border-slate-700"}`}
    >
      {/* Radar Pulse */}
      {!vacant && (
        <div
          className={`absolute -top-5 -right-5 w-24 h-24 rounded-full
          ${alert
            ? "bg-red-400/20 dark:bg-red-500/30"
            : "bg-teal-500/10 dark:bg-teal-400/20"}
          animate-pulse-radar`}
        />
      )}

      {/* Title */}
      <div
        className={`font-bold
        ${alert
          ? "text-red-700 dark:text-red-400"
          : "text-slate-500 dark:text-slate-300"}`}
      >
        BATHROOM - {washroomSocket.roomName}
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 mt-4">
        <div
          className={`w-3 h-3 rounded-full
          ${status === "OCCUPIED" &&
            "bg-amber-500 shadow-[0_0_10px_#f59e0b] dark:shadow-[0_0_10px_#fbbf24]"}
          ${status === "VACANT" && "bg-emerald-500"}
          ${alert && "bg-red-500 animate-blink"}`}
        />

        <span
          className={`font-bold
          ${status === "OCCUPIED" &&
            "text-amber-700 dark:text-amber-400"}
          ${status === "VACANT" &&
            "text-emerald-600 dark:text-emerald-400"}
          ${alert && "text-red-500 dark:text-red-400"}`}
        >
          {alert ? "IMPACT DETECTED" : status}
        </span>
      </div>

      {/* Body */}
      <div className="mt-5">
        {!vacant && !alert && (
          <>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Current Duration:
            </p>
            <div className="font-mono text-2xl font-bold text-slate-700 dark:text-slate-100">
              {duration}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {movement}
            </p>
          </>
        )}

        {alert && (
          <div className="text-red-600 dark:text-red-400 font-extrabold text-lg mt-4">
            ⚠ FALL ON FLOOR
          </div>
        )}

        {vacant && (
          <>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Last Used:
            </p>
            <div className="text-lg font-bold text-slate-400 dark:text-slate-300">
              {duration}
            </div>
          </>
        )}
      </div>

      {/* Emergency Button */}
      {emergency && (
        <button
          className="w-full mt-4 py-3 rounded-lg
          bg-red-500 hover:bg-red-600
          dark:bg-red-600 dark:hover:bg-red-700
          text-white font-bold"
        >
          EMERGENCY RESPONSE
        </button>
      )}
    </div>
  );
}
