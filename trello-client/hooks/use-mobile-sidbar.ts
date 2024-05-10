import { create } from "zustand";

type MobileSidebarStore = {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isopen: false,
  onClose: () => set({ isopen: false }),
  onOpen: () => set({ isopen: true }),
}));
