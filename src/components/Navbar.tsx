import { IconButton } from "@mui/material"
import { Sun, Moon } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore"

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Fitness Dashboard</h1>
          </div>
          <div className="flex items-center">
            <IconButton
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isDarkMode ? <Sun size={20} className="h-5 w-5" /> : <Moon size={20} className="h-5 w-5" />}
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  )
}