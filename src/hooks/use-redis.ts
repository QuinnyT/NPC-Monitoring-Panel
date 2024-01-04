import { useEffect } from "react";
import redis from "redis";
import { create } from "zustand";

export const useRedisClient = () => {
	const { setData } = useRedis();

	useEffect(() => {
		const redisClient = redis.createClient({
			url: "redis://:123456@192.168.16.86:40009",
		});
		redisClient.connect();

		redisClient.on("connect", async () => {
			const res = await redisClient.LRANGE("1", 0, -1);
			setData(res);
			redisClient.quit(); // Close the Redis connection
		});
	});
};

interface useRedisStore {
	data: any;
	setData: (data: any) => void;
}

export const useRedis = create<useRedisStore>((set) => ({
	data: [],
	setData: (data) => set(() => ({ data })),
}));
