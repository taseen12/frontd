"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Footer from './Footer';

export default function ModuleLayout({ menuItems, children }) {
  const router = useRouter();

  const handleMenuItemClick = (item) => {
    if (item.onClick) {
      // If the item has an onClick handler, use it
      item.onClick();
    } else if (item.path) {
      // Otherwise navigate to the path
      router.push(item.path);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">{title}</h1> */}

        {menuItems && menuItems.length > 0 ? (
          <div className="flex flex-col md:flex-row mt-3 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-gray-700 dark:text-gray-200 hover:text-primaryColor dark:hover:text-darkTextColor hover:bg-green-50 dark:hover:bg-green-900/20 ${item.active ? "bg-green-50 dark:bg-green-900/20 text-darkTextColor" : ""
                      }`}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 dark:text-gray-200">{children}</div>
        </div>
        ) : <>{children}</>}

      <Footer />
    </main>
  );
}
