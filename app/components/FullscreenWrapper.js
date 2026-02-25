import { useState } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenWrapper({ children }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleFullscreen}
                className="fixed flex gap-2 top-20 right-5 z-50 bg-slate-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow hover:bg-slate-700"
            >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                <span className="uppercase">Full Screen</span>
            </button>

            {children}
        </div>
    );
}
