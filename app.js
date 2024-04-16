import express from "express";
import redis from "redis";
import cors from "cors";

import Redis from 'ioredis'

const app = express();
const router = express.Router();
const sourceId = 10001;

// const redisClient = redis.createClient({
//   url: "redis://:123456@192.168.16.74:6379",
// });

// redisClient.on("error", function (error) {
//   console.error(error);
// });

// await redisClient.connect();

const redisClient = new Redis({
  host: "192.168.16.74",
  port: 6379,
  password: "123456",
  db: 0,
  keepAlive: 1000,
});

const insertEventClient = new Redis({
  host: "192.168.16.74",
  port: 6379,
  password: "123456",
  db: 1,
});

const newEventClient = new Redis({
  host: "192.168.16.74",
  port: 6379,
  password: "123456",
  db: 3
});


const attrClient = new Redis({
  host: "192.168.16.74",
  port: 6379,
  password: "123456",
  db: 2
});


app.use(express.json());
app.use(cors());
app.use("/", router);

app.get("/:key", async (req, res) => {
  const key = req.params.key;
  // const data = await redisClient.LRANGE(key, 0, -1);
  const data = await redisClient.lrange(key, 0, -1);
  res.json(data.map((v) => JSON.parse(v)));
});

app.post("/history_event", async (req, res) => {
  // console.log("req", req)
  const id = req.body.id;
  const event = req.body.event;
  await insertEventClient.rpush(id, event);
  const data = await insertEventClient.lrange(id, 0, -1);
  // console.log("history_event data", data)
  res.json(data);
});
app.get("/new_event/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id", id)
  const data = await newEventClient.get(id);
  // const data = [
  //   "now doing",
  //   "todo 1",
  //   "todo 2",
  //   "todo 3"
  // ]
  console.log("new_event", data)
  res.json(data);
});

app.post("/change_attr", async (req, res) => {
  const id = req.body.id;
  const attr = req.body.attr;
  const attrString = '[' + attr.toString() + ']'
  await attrClient.rpush(id, attrString);
  const data = await attrClient.lrange(id, 0, -1);
  res.json(data);
});

app.listen(3000, async () => {
  console.log("Server is up on port 3000");
});
