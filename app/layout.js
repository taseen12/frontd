import "./global.css";
import { AuthProvider } from "../providers/AuthProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullscreenProvider } from "@/providers/FullscreenProvider";

export const metadata = {
  title: "AI Care",
  description: "Hospital Monitoring System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <FullscreenProvider>
              {children}
            </FullscreenProvider>
          </ThemeProvider>
        </AuthProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
