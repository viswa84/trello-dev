import { create } from "zustand";

type CardModalStore = {
  id?: string;
  isopen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isopen: false,
  onOpen: (id: string) => set({ isopen: true, id }),
  onClose: () => set({ isopen: false, id: undefined }),
}));
