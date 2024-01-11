import express from "express";
import redis from "redis";
import cors from "cors";

const app = express();
const router = express.Router();

const redisClient = redis.createClient({
  url: "redis://:123456@192.168.16.74:6379",
});

redisClient.on("error", function (error) {
  console.error(error);
});

await redisClient.connect();

app.use(cors());
app.use("/", router);

app.get("/:key", async (req, res) => {
  const key = req.params.key;
  const data = await redisClient.LRANGE(key, 0, -1);
  console.log(data.map((v) => JSON.parse(v)));
  res.json(data.map((v) => JSON.parse(v)));
});

app.listen(3000, async () => {
  console.log("Server is up on port 3000");
});
