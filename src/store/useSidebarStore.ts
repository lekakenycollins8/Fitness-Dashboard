import { create } from 'zustand'

// Interface defining the structure and actions available in the sidebar store
interface SidebarStore {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: window.innerWidth >= 768, // Default open on larger screens (768px breakpoint)
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}))