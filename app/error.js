"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from './components/ui/button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 mx-auto w-64 h-64">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle cx="100" cy="100" r="80" fill="#fff0f0" />

            {/* Warning icon */}
            <path d="M100,40 L160,160 H40 Z" fill="#f42a41" />
            <text
              x="100"
              y="120"
              fontFamily="Arial, sans-serif"
              fontSize="50"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              !
            </text>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We are sorry, but we encountered an error while processing your
          request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
