import { create } from 'zustand'

interface SidebarStore {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: window.innerWidth >= 768, // Default open on larger screens
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}))