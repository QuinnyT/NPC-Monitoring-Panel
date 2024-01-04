import { create } from "zustand";

interface useRedisStore {
	data: any;
	setData: (data: any) => void;
}

export const useRedis = create<useRedisStore>((set) => ({
	data: [],
	setData: (data) => set(() => ({ data })),
}));
