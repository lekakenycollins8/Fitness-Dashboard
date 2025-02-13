import { useLocation, useNavigate } from "react-router-dom"
import { Home, Dumbbell, SearchIcon, Heart, SettingsIcon } from "lucide-react"

const menuItems = [
  { text: "Home", icon: Home, path: "/" },
  { text: "Categories", icon: Dumbbell, path: "/categories" },
  { text: "Search", icon: SearchIcon, path: "/search" },
  { text: "Favorites", icon: Heart, path: "/favorites" },
  { text: "Settings", icon: SettingsIcon, path: "/settings" },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-800 dark:text-white">Menu</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => (
            <li key={item.text}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-150 ease-in-out ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}