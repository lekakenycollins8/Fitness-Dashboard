import { IconButton } from "@mui/material"
import { Menu } from "lucide-react"
import { useSidebarStore } from "../store/useSidebarStore"

/**
 * Navigation bar component for the Fitness Dashboard.
 * 
 * This component renders a responsive navigation bar that includes:
 * - A mobile-only menu toggle button that controls the sidebar visibility
 * - The application title "Fitness Dashboard"
 * 
 * The navigation bar is styled with:
 * - White background
 * - Soft shadow
 * - Responsive padding
 * - 16 units (4rem) height
 * 
 * @returns A navigation bar component with toggle functionality
 * 
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export default function Navbar() {
  const { toggle } = useSidebarStore()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* IconButton for toggling sidebar, visible only on mobile */}
            <IconButton
              onClick={toggle}
              className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
            >
              <Menu size={20} className="h-5 w-5" />
            </IconButton>
            <h1 className="text-xl font-semibold text-gray-800">Fitness Dashboard</h1>
          </div>
        </div>
      </div>
    </nav>
  )
}