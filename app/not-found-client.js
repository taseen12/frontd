"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

export default function NotFoundClient() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Countdown effect
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/home");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated SVG */}
        <div className="mb-8 mx-auto w-64 h-64 relative">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle with pulse animation */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="#f0f0f0"
              className="animate-pulse"
            />

            {/* 404 text */}
            <text
              x="100"
              y="90"
              fontFamily="Arial, sans-serif"
              fontSize="36"
              fontWeight="bold"
              fill="#006a4e"
              textAnchor="middle"
            >
              404
            </text>

            {/* Sad face */}
            <circle cx="100" cy="130" r="30" fill="#f42a41" />
            <circle cx="85" cy="120" r="5" fill="white" />
            <circle cx="115" cy="120" r="5" fill="white" />
            <path
              d="M80,140 Q100,125 120,140"
              stroke="white"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <Button variant="primary" className="w-full sm:w-auto">
              Go to Home
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.back()}
          >
            Previous Page
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Redirecting to main page in{" "}
          <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
}
