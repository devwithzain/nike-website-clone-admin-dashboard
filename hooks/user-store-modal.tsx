import { create } from "zustand";
import { TuseStoreModallProps } from "@/types";

export const useStoreModal = create<TuseStoreModallProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
