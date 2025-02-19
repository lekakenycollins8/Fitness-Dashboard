import type React from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Layout component that provides the basic structure for the application.
 * Includes a sidebar, navbar, and main content area.
 * 
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered within the layout
 * @returns {JSX.Element} A structured page layout with sidebar, navbar and main content
 *
 * @example
 * ```tsx
 * <Layout>
 *   <YourContent />
 * </Layout>
 * ```
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}