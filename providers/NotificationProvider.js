"use client"; 

import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CONNECTION } from "../config/api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${CONNECTION.SOCKET}`,{ withCredentials: false  })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR Hub");
        connection.on("receiveactivity_3b243cbb-c828-4ada-aa8e-b0348307ea6c", (msg) => {
          console.log('connection--',msg)
          setNotifications((prev) => [...prev, { message: msg }]);
        });
      })
      
      .catch((err) => console.error("❌ SignalR connection failed:", err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
