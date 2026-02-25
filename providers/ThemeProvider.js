"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  // Ensure we only render the theme provider on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
