import { useLocation, useNavigate } from "react-router-dom"
import { Home, Dumbbell, SearchIcon, Heart, X } from "lucide-react"
import { useSidebarStore } from "../store/useSidebarStore"

// Define navigation menu items with their icons and paths
const menuItems = [
  { text: "Home", icon: Home, path: "/" },
  { text: "Categories", icon: Dumbbell, path: "/categories" },
  { text: "Search", icon: SearchIcon, path: "/search" },
  { text: "Favorites", icon: Heart, path: "/favorites" },
]

export default function Sidebar() {
  // Hooks for routing and sidebar state management
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, close } = useSidebarStore()

  return (
    <>
      {/* Semi-transparent overlay that appears behind the sidebar on mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={close}
        />
      )}

      {/* Main sidebar container with responsive behavior */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} // Controls sidebar visibility
        md:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
      `}>
        {/* Sidebar header with title and close button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">Menu</span>
          <button 
            onClick={close}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            {menuItems.map((item) => (
              <li key={item.text}>
                <button
                  onClick={() => {
                    navigate(item.path)
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 768) close()
                  }}
                  // Dynamic styling based on current route
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
    </>
  )
}