"use client";

import { useEffect, useState } from "react";
import { Cpu, WifiOff  } from "lucide-react";
import { RESIDENT_ENDPOINTS } from "@/config/api";
import RoomCard from './RoomCard';

export default function PostureMonitoringPage() {
  const [patientIds, setPatientIds] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting"); 
  // connecting | connected | disconnected | error

  /* =========================
     FETCH PATIENT IDS
  ========================= */
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(RESIDENT_ENDPOINTS.RESIDENT_ID);
        if (!res.ok) throw new Error("Failed to fetch patient IDs");

        const data = await res.json();
        setPatientIds(data.residentIds || []);
      } catch (err) {
        console.error(err);
        setConnectionStatus("error");
      }
    };

    fetchActivities();
  }, []);

  /* =========================
     SIGNALR CONNECTION
  ========================= */
  // useEffect(() => {
  //   if (!patientIds.length) return; //  wait until patientIds ready

  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(CONNECTION.SOCKET, { withCredentials: false })
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnectionStatus("connecting");

  //   connection
  //     .start()
  //     .then(() => {
  //       console.log("✅ Connected to SignalR");
  //       setConnectionStatus("connected");

  //       patientIds.forEach((id) => {
  //         connection.on(`receiveactivity_${id}`, (msg) => {
  //           setRooms(msg);
  //         });
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("❌ SignalR failed:", err);
  //       setConnectionStatus("error");
  //     });

  //   connection.onreconnecting(() => {
  //     console.warn("🟡 Reconnecting...");
  //     setConnectionStatus("connecting");
  //   });

  //   connection.onclose(() => {
  //     console.warn("🔴 Connection closed");
  //     setConnectionStatus("disconnected");
  //   });

  //   return () => {
  //     connection.stop();
  //   };
  // }, [patientIds]);

  //   const roomdata = [
  //     {
  //         roomId: "RM-101",
  //         patientName: "Margaret Jones",
  //         status: "Stable",
  //         statusLevel: "normal",
  //         aiConfidence: 98,
  //         posture: {
  //           current: "SITTING",
  //           timeInState: "12 mins"
  //         },
  //         icon: "chair",
  //         alert: null,
  //         actions: [
  //         {
  //             label: "LOG INTERACTION",
  //             type: "log",
  //             priority: "normal"
  //         }
  //         ]
  //     },
  //     {
  //         roomId: "RM-102",
  //         patientName: "Arthur Miller",
  //         status: "CRITICAL",
  //         statusLevel: "danger",
  //         aiConfidence: 94,
  //         posture: {
  //           current: "LYING ON FLOOR",
  //           alertTime: "01:42 ago"
  //         },
  //         alert: {
  //         type: "FALL_ALERT",
  //         severity: "critical"
  //         },
  //         icon: "user-slash",
  //         actions: [
  //         {
  //           label: "RESPOND NW",
  //           type: "respond",
  //           priority: "danger"
  //         }
  //         ]
  //     },
  //     {
  //         roomId: "RM-103",
  //         patientName: "Sarah Smith",
  //         status: "Out of Bed",
  //         statusLevel: "warning",
  //         aiConfidence: 100,
  //         posture: {
  //         current: "WALKING",
  //         timeInState: "02 mins"
  //         },
  //           alert: {
  //           type: "OUT_OF_BED",
  //           severity: "warning"
  //         },
  //         icon: "walking",
  //         actions: [
  //         {
  //             label: "ACKNOWLEDGE",
  //             type: "acknowledge",
  //             priority: "warning"
  //         }
  //         ]
  //     }
  //   ]

  return (
    <div className="p-5 min-h-screen bg-slate-100">
      {/* HEADER */}
      <div className="bg-white rounded-xl p-5 shadow mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand flex items-center gap-2">
            <Cpu size={22} className="w-auto" /> Edge AI: Room Posture Feed
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Anonymized skeletal tracking for resident safety and privacy
          </p>
        </div>
      </div>

      {/* 🔴 CONNECTION STATUS MESSAGE */}
      {connectionStatus !== "connected" && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 flex items-center gap-2 text-sm font-semibold
            ${connectionStatus === "connecting" && "bg-yellow-100 text-yellow-800"}
            ${connectionStatus === "disconnected" && "bg-red-100 text-red-700"}
            ${connectionStatus === "error" && "bg-red-200 text-red-800"}
          `}
        >
          <WifiOff size={18} />
          {connectionStatus === "connecting" && "Connecting to live AI feed…"}
          {connectionStatus === "disconnected" && "Live feed disconnected. Retrying…"}
          {connectionStatus === "error" && "Unable to connect to live feed"}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
        {patientIds.length > 0 ? (
          // roomdata.map((room) => <RoomCard key={room.roomId} room={room} />)
        patientIds.map((patient) => <RoomCard key={patient.id} patientId={patient} />)
        ) : (
          connectionStatus === "connected" && (
            <p className="text-slate-500 text-sm">
              Waiting for posture data…
            </p>
          )
        )}
      </div>
    </div>
  );
}

