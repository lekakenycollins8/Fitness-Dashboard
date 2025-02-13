import type React from "react"
import { ThemeProvider, createTheme } from "@mui/material"
import { useThemeStore } from "../store/useThemeStore"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isDarkMode } = useThemeStore()
  
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}