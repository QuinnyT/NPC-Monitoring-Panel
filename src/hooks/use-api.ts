import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { useRedis } from "./use-redis";

const getFetcher = (url: string) => axios.get(url).then((res) => res.data);

const postFetcher = ([url, data]: any) =>
  axios.post(url, { ...data }).then((res) => res.data);

export const useApi = () => {
  const { setRedisData, targetId } = useRedis();
  let { data } = useSWR(
    `http://localhost:3000/${targetId - 10001}`,
    getFetcher
  );
  useEffect(() => {
    if (data) {
      // setRedisData(data.slice(data.length - 10));
      // console.log(data.slice(data.length - 10));
      setRedisData(data);
      console.log(data);
    }
  }, [data, setRedisData]);
};
