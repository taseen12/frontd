import { useEffect, useRef, useState } from 'react';
import { Card } from './card'; // shadcn
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function AlertCard({ isAlert, children }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (isAlert) {
      audioRef.current?.play().catch(() => { });
    } else {
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isAlert]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (muted) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }

    setMuted(!muted);
  };


  return (
    <>
      <audio ref={audioRef} src="/sounds/alarm-999.wav" preload="auto" loop />

      <Card
        className={clsx(
          'max-w-md mx-auto transition-all duration-300',
          isAlert
            ? 'border-2 border-red-500 animate-pulse shadow-lg shadow-red-500/40'
            : 'border border-gray-200'
        )}
      >
        {isAlert && (
          <div className="flex items-center justify-between px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-t-md">
            {/* Left: Alert info */}
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>ALERT DETECTED</span>
            </div>

            {/* Right: Mute button */}
            <button
              onClick={toggleMute}
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium
             text-red-600 border border-red-300 rounded-md
             hover:bg-red-100 active:scale-95 transition"
            >
              {muted ? "🔊 Unmute" : "🔇 Mute"}
            </button>

          </div>
        )}

        <div>{children}</div>
      </Card>
    </>
  );
}
