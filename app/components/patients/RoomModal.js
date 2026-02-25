'use client'

import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import Hls from "hls.js";
import { X } from "lucide-react";
import { CONNECTION } from "../../../config/api";

export default function RoomModal({ open, onClose, roomName }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open || !videoRef.current) return;

    const streamUrl = CONNECTION.CAMERA;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({ lowLatencyMode: true });
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
    } else if (
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = streamUrl;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <Rnd
        default={{
          x: 150,
          y: 100,
          width: 700,
          height: 450,
        }}
        minWidth={400}
        minHeight={300}
        bounds="window"
        className="bg-black rounded-xl shadow-2xl border border-emerald-400"
      >
        {/* Header (Drag handle) */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 cursor-move rounded-t-xl">
          <h3 className="text-sm font-semibold text-white">
            🎥 Room: {roomName}
          </h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X size={18} />
          </button>
        </div>

        {/* Video Body */}
        <div className="w-full h-[calc(100%-40px)] bg-black p-2">
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            className="w-full h-full object-contain rounded-lg border border-emerald-400"
          />
        </div>
      </Rnd>
    </div>
  );
}
