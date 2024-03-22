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
	u: number;
	v: number;
	uv_rose: number;
	action: string;
};

interface useRedisStore {
	redisData: RedisData[];
	setRedisData: (data: RedisData[]) => void;
	targetId: number;
	setTargetId: (data: number) => void;
}

export const useRedis = create<useRedisStore>((set) => ({
	redisData: [],
	setRedisData: (redisData) => set(() => ({ redisData })),
	targetId: 10002,
	setTargetId: (targetId) => set(() => ({ targetId }))
}));
