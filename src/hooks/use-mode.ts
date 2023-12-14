import { create } from "zustand";

interface useModeStore {
	mode: "" | "SMOOTH" | "UV";
	setMode: (mode: "" | "SMOOTH" | "UV") => void;
}

export const useMode = create<useModeStore>((set) => ({
	mode: "",
	setMode: (mode) => set(() => ({ mode })),
}));
