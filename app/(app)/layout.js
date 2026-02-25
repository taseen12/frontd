"use client";

import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from './../components/Navbar';
import { useFullscreen } from './../../providers/FullscreenProvider';


export default function AppLayout({ children }) {
  const { isFullscreen } = useFullscreen();

  return (
    <div className="flex min-h-screen">
      {!isFullscreen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!isFullscreen && <Navbar />}
          {children}
        <Footer />
      </div>
    </div>
  );
}
