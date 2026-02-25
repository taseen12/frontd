"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FullscreenContext = createContext();

export const useFullscreen = () => useContext(FullscreenContext);

export const FullscreenProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen();
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) enterFullscreen();
    else exitFullscreen();
  };

  // Handle ESC / browser exit
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () =>
      document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <FullscreenContext.Provider
      value={{ isFullscreen, toggleFullscreen }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
