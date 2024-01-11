import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { useRedis } from "./use-redis";

const getFetcher = (url: string) => axios.get(url).then((res) => res.data);

const postFetcher = ([url, data]: any) =>
  axios.post(url, { ...data }).then((res) => res.data);

export const useApi = () => {
  let { data } = useSWR("http://localhost:3000/1", getFetcher);
  const { setRedisData } = useRedis();
  useEffect(() => {
    if (data) {
      setRedisData(data.slice(0, 9));
      console.log(data.slice(0, 9));
    }
  }, [data, setRedisData]);
};

export const useCreateBWYInstanceApi = (d: any) => {
  const { data } = useSWR(
    ["http://106.55.79.139:60001/createBWYInstance", d],
    postFetcher
  );
  return Promise.resolve(data);
};

export const useCreateUEInstanceApi = (d: any) => {
  const { data } = useSWR(
    ["http://localhost:60000/createUEInstance", d],
    postFetcher
  );
  return Promise.resolve(data);
};
