import request from "./request";

const { MODE } = import.meta.env;

export const api = () => {
  // 模拟请求，后续直接修改导出的函数名字即可
  return Promise.resolve({
    name: "user",
    game_info: [
      { day: 1, time: "0", frame: 1, uv: 64 },
      { day: 2, time: "0", frame: 2, uv: 22 },
      { day: 3, time: "0", frame: 3, uv: 35 },
      { day: 4, time: "0", frame: 4, uv: 19 },
      { day: 5, time: "0", frame: 5, uv: 40 },
      { day: 6, time: "0", frame: 6, uv: 67 },
      { day: 7, time: "0", frame: 7, uv: 77 },
      { day: 8, time: "0", frame: 8, uv: 79 },
      { day: 9, time: "0", frame: 9, uv: 64 },
      { day: 10, time: "0", frame: 10, uv: 88 },
    ],
    attr_value: {
      Survival: 30,
      Belonging: 30,
      Social: 10,
      Intimacy: 40,
      Honor: 50,
    },
    uv: 380,
  });
};

export const createBWYInstanceApi = (data: any) => {
  return request({
    baseURL: "",
    url: `http://${MODE === "development" ? 'localhost:5173' : "106.55.79.139:60001"}/createBWYInstance`,
    method: "POST",
    data,
  });
};
console.log(MODE);

export const createUEInstanceApi = (data: any) => {
  return request({
    baseURL: "",
    url: `http://${MODE === "development" ? 'localhost:5173' : "localhost:60000"}/createUEInstance`,
    method: "POST",
    data,
  });
};
