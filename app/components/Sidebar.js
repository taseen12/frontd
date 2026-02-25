"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { sidebarMenu } from './../constants/sidebarMenu';
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { isLoggedIn } = useAuth();
  const [openMenu, setOpenMenu] = useState("ai");

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <aside className="w-[280px] min-h-screen bg-primaryColor dark:bg-gray-800 border-r border-gray-500 text-white flex flex-col">
      
      {/* Header */}
      <Link
        href={isLoggedIn ? "/home" : "/"}
        className="px-6 py-5 bg-black/20 border-b border-white/5"
      >
        <h2 className="text-xl font-bold">AusAge 360</h2>
        <span className="text-sm text-white/70">
          Smart Care Ecosystem
        </span>
      </Link>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {sidebarMenu.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleMenu(section.id)}
              className="flex w-full items-center justify-between px-3 py-2 rounded-md font-semibold hover:bg-white/10"
            >
              <span>{section.title}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openMenu === section.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === section.id && (
              <div className="ml-3 mt-2 space-y-1">
                {section.children.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function MenuItem({ item, level = 0 }) {
  const Icon = item.icon;
  const router = usePathname();
  return (
    <div className={`ml-${level * 3}`}>
      <Link
        href={item.path || "#"}
        className={"flex items-center gap-3 px-3 py-2 text-sm rounded-md text-white/90 hover:bg-white/10 transition" + (router === item.path ? " bg-white/10 font-semibold" : "")} 
      >
        {Icon && <Icon className="h-4 w-4 text-white/80" />}
        <span>{item.title}</span>
      </Link>

      {item.children && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((child, i) => (
            <MenuItem key={i} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

