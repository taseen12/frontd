import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { CONNECTION } from "@/config/api";
import {
  // CheckCircle,
  AlertTriangle,
  ShieldCheck,
  UserX,
  // Bell,
  // Crosshair,
} from "lucide-react";

// const iconMap = {
//   chair: Chair,
//   walking: Walking,
//   "user-slash": UserX
// };


export default function RoomCard({ patientId }) {
  const [activitySocket, setActivitySocket] = useState([]);
  // const {
  //   roomId,
  //   patientName,
  //   status,
  //   activitySocket.activityTypeName,
  //   aiConfidence,
  //   posture,
  //   alert,
  //   icon,
  //   actions = []
  // } = room;

  // const Icon = iconMap[icon] || Chair;

  // const statusStyles = {
  //   normal: "border-green-500 text-green-500",
  //   warning: "border-yellow-500 text-yellow-500",
  //   danger: "border-red-500 text-red-500"
  // };

  // const buttonStyles = {
  //   normal: "bg-green-600 hover:bg-green-700",
  //   warning: "bg-yellow-600 hover:bg-yellow-700",
  //   danger: "bg-red-600 hover:bg-red-700"
  // };

  
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
        connection.on(`receiveactivity_${patientId}`, (msg) => {
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
  }, [patientId]);

  const {
    roomName,
    residentName,
    activityLevelName: statusLevel,
    aiConfidence,
    activityTypeName:posture,
    alert
  } = activitySocket;

  const isCritical = statusLevel === "Critical";
  const isWarning = statusLevel === "Warning";

  return (
    <div
      className={`
        rounded-xl overflow-hidden border-2 transition
        bg-white dark:bg-slate-900
        ${isCritical ? "border-red-600 animate-pulse" : ""}
        ${isWarning ? "border-amber-500" : "border-transparent"}
      `}
    >
      {/* AI Wireframe View */}
      <div
        className={`
          h-52 flex items-center justify-center relative
          bg-slate-900
          ${isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-emerald-400"}
        `}
      >
        {posture === "SIT" && <UserX size={80} />}
        {posture === "STAND" && <UserX size={80} />}
        {posture === "WALKING" && <UserX size={80} />}
        {posture === "HELP" && <UserX size={80} />}
        {posture === "LIE(BED)" && <UserX size={80} />}
        {posture === "LIE(FLOOR)" && <UserX size={80} />}
        {posture === "WASHROOM(IN)" && <UserX size={80} />}
        {posture === "WASHROOM(OUT)" && <UserX size={80} />}
        {posture === "FALL" && (
          <UserX size={80} className="rotate-90" />
        )}

        <div className="absolute bottom-2 left-2 text-xs text-emerald-400">
          AI CONFIDENCE: {aiConfidence}%
        </div>

        {alert && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
            {alert.type.replace("_", " ")}
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-slate-800 dark:text-slate-100">
            {roomName}: {residentName}
          </div>

          <div
            className={`
              text-xs font-bold flex items-center gap-1
              ${isCritical ? "text-red-600" : isWarning ? "text-amber-500" : "text-emerald-600"}
            `}
          >
            {isCritical && <AlertTriangle size={14} />}
            {!isCritical && <ShieldCheck size={14} />}
            {statusLevel}
          </div>
        </div>

        {/* Posture Status */}
        <div className="flex justify-between mt-4">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">
              Current Posture
            </div>
            <div
              className={`font-bold ${
                isCritical ? "text-red-600" : "text-slate-800 dark:text-slate-100"
              }`}
            >
              {posture}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">
              {posture?.alertTime ? "Alert Time" : "Time in State"}
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-100">
              {posture?.alertTime || posture?.timeInState}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`
            w-full mt-4 py-2 rounded-md text-xs font-bold text-white
            ${isCritical
              ? "bg-red-600 hover:bg-red-700"
              : isWarning
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-slate-800 hover:bg-slate-900"}
          `}
        >
          {isCritical
            ? "RESPOND NOW"
            : isWarning
            ? "ACKNOWLEDGE"
            : "LOG INTERACTION"}
        </button>
      </div>
    </div>
  );
}
