import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { useRedis } from "./use-redis";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useApi = () => {
	const { data } = useSWR("http://localhost:3000/1", fetcher);
	console.log("fetch", data);

	const { setRedisData } = useRedis();
	useEffect(() => {
		setRedisData(data);
	}, [data, setRedisData]);
};
