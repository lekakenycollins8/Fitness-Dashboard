import { Typography, Switch } from "@mui/material"
import { useThemeStore } from "../store/useThemeStore"

export default function Settings() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <div className="space-y-8">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Settings
      </Typography>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark theme</p>
              </div>
              <Switch checked={isDarkMode} onChange={toggleTheme} className="ml-4" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}