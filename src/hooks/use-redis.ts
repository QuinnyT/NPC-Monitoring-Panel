import { create } from "zustand";

export type AttrValue = {
	Survival: number;
	Belonging: number;
	Social: number;
	Intimacy: number;
	Honor: number;
	[key: string]: number;
};

export type RedisData = {
	name: string;
	game_info: {
		day: number;
		time: string;
		frame: number;
	};
	attr_value: AttrValue;
	uv_bar: number;
	uv_rose: number;
};

interface useRedisStore {
	redisData: RedisData[];
	setRedisData: (data: RedisData[]) => void;
	targetId: string;
	setTargetId: (data: string) => void;
}

export const useRedis = create<useRedisStore>((set) => ({
	redisData: [],
	setRedisData: (redisData) => set(() => ({ redisData })),
	targetId: "",
	setTargetId: (targetId) => set(() => ({ targetId }))
}));
