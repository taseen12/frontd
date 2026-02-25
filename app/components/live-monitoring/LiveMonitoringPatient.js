import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CardContent } from "../ui/card";
import {
  HeartPulse,
  Thermometer,
  Battery,
  Droplets,
  Clock,
  PhoneCall,
  Bath,
} from "lucide-react";
import Link from "next/link";
import RoomModal from './../patients/RoomModal';
import AlertCard from './../ui/AlertCard';
import { CONNECTION } from "@/config/api";


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

const getCallColor = (call) => {
  switch (call) {
    case "Active":
      return "bg-green-300 text-black dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getWashroomStatusColor = (washroom) => {
  switch (washroom) {
    case "Fall Detected":
      return "text-red-600 font-semibold"
    case "Occupied":
      return "text-primaryColor font-semibold"
    case "Not Occupied":
      return "text-yellow-600 font-semibold"
    default:
      return "text-gray-600 font-semibold"
  }
};


export default function LiveMonitoringPatient({ patientId }) {
  const [activitySocket, setActivitySocket] = useState([]);
  const [healthSocket, setHealthSocket] = useState([]);
  const [washroomSocket, setWashroomSocket] = useState([]);

  const [open, setOpen] = useState(false);
  const [alert] = useState(false);

  // const [isActivityAlive, setIsActivityAlive] = useState(true);
  // const [isHealthAlive, setIsHealthAlive] = useState(true);
  // const [isWashroomAlive, setIsWashroomAlive] = useState(true);
  const isActivityAlive = true;
  const isHealthAlive = true;
  const isWashroomAlive = true;

  // let activityTimer = useRef(null);
  // let healthTimer = useRef(null);
  // let washroomTimer = useRef(null);

  // const ACTIVITY__TIMEOUT_MS = 120000;
  // const HELTH_TIMEOUT_MS = 90000;
  // const WS_TIMEOUT_MS = 90000;

  // const resetTimer = (timerRef, setAliveFn) => {
  //   clearTimeout(timerRef.current);
  //   setAliveFn(true);

  //   timerRef.current = setTimeout(() => {
  //     setAliveFn(false);
  //   }, TIMEOUT_MS);
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

        // Subscribe after connection starts
        connection.on(`receiveactivity_${patientId}`, (msg) => {
          // console.log('Received message activity', msg)
          setActivitySocket(msg);
          // resetTimer(activityTimer, setIsActivityAlive);
        });

        connection.on(`receivehealth_${patientId}`, (msg) => {
          // console.log('Received message health', msg)
          setHealthSocket(msg);
          // resetTimer(healthTimer, setIsHealthAlive);
        });

        connection.on(`ReceiveWashRmActivity_${patientId}`, (msg) => {
          console.log('Received message washroom', msg)
          setWashroomSocket(msg);
          // resetTimer(washroomTimer, setIsWashroomAlive);
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

  let allDisconnected = !isActivityAlive && !isHealthAlive && !isWashroomAlive;


  return (
    <div className="p-1">
      <AlertCard isAlert={alert}>
        {allDisconnected ? (
          <div className="p-2 bg-red-100 text-red-600 text-sm font-semibold text-center rounded-md">
            🔴 All Signals Disconnected
          </div>
        )
          :
          <CardContent>
            {/* Activity Data Section */}
            {isActivityAlive ?
              <>
                {/* Top Section: Patient + Room */}
                <div className="flex gap items-center justify-between gap-2 mb-2">
                  <div className="flex-1 text-gray-700 text-sm font-bold py-1.5 rounded-lg">
                    <Link
                      // href={`/patients/details/${patientId}`}
                      href="#"
                      className="flex-1 text-lg font-bold truncate py-1 rounded-lg text-primaryColor transition-all cursor-pointer">
                      {activitySocket.residentName}
                    </Link>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className="w-12 h-12 bg-gray-600 text-white text-sm font-semibold flex items-center justify-center rounded-full">
                    {activitySocket.roomName}
                  </div>
                </div>

                {/* <div className="flex items-center gap-2 justify-center"><Camera className="w-3.5 h-3.5 text-gray-500" />{activitySocket.cameraName}</div> */}


                {/* Activity Status */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`${getStatusColor(
                      activitySocket.activityTypeName
                    )} font-semibold text-xs px-3 py-1 rounded-full shadow-sm text-center flex items-center justify-center gap-1`}
                  >
                    {/* <Activity className="w-4 h-4" /> */}
                    {activitySocket.activityTypeName}
                  </div>
                  <span
                    className={`${getCallColor(
                      ""
                    )} font-semibold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {/* Call Inactive */}
                    {activitySocket.cameraName}
                  </span>

                </div>
              </>
              : <div className="p-2 bg-red-100 text-red-600 text-sm font-semibold text-center rounded-md">
                Activity Not Connected!
              </div>}



            {/* Health Data Section */}
            {isHealthAlive ?
              <div className="grid grid-cols-4 gap-1.5 text-xs bg-gray-50 dark:bg-gray-800 p-1.5 rounded-md mb-1.5">
                {/* Heart Rate */}
                <div className="flex flex-col items-center gap-0.5">
                  <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                  <span className="font-semibold text-red-600 dark:text-red-400">{healthSocket.heartRate ?? "—"}bpm</span>
                </div>

                {/* SpO₂ */}
                <div className="flex flex-col items-center gap-0.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{healthSocket.spo2 ?? "—"}%</span>
                </div>

                {/* Temperature */}
                <div className="flex flex-col items-center gap-0.5">
                  <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-semibold text-orange-600 dark:text-orange-400">{healthSocket.skinTemp ?? "—"}°F</span>
                </div>

                {/* Battery */}
                <div className="flex flex-col items-center gap-0.5">
                  <Battery className="w-3.5 h-3.5 text-green-500" />
                  <span className="font-semibold text-primaryColor dark:text-green-400">{healthSocket.batteryLevel ?? "—"}%</span>
                </div>
              </div>
              : <div className="p-2 bg-red-100 text-red-600 text-sm font-semibold text-center rounded-md">
                Health Not Connected!
              </div>}



            {/* Washroom Data Section */}
            {isWashroomAlive ?
              <div className="flex items-center justify-between text-xs opacity-70 border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-gray-500" />
                  <span className={getWashroomStatusColor(washroomSocket.washroomFallStatus)}>
                    {washroomSocket.humanPresence
                      ? washroomSocket.washroomFallStatus
                        ? "Fall Detected"
                        : "Occupied"
                      : "Not Occupied"}
                  </span>
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
              : <div className="p-2 bg-red-100 text-red-600 text-sm font-semibold text-center rounded-md">
                Rudder Not Connected!
              </div>}
          </CardContent>
        }

        <RoomModal
          open={open}
          onClose={() => setOpen(false)}
          roomName={activitySocket.roomName}
        />
      </AlertCard>




      {/* {error && <p className="text-red-500">Error: {error}</p>} */}
      {/* {notifications.length === 0 ? (
        <p className="text-gray-500">No activity yet...</p>
      ) : ( */}
    </div>
  );
}