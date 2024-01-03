import redis from "redis";

const redisClient = redis.createClient({
	// url: "redis://:123456@192.168.16.86:40009",
	host: "192.168.16.86",
	port: 40009,
	password: "123456",
});
redisClient.connect();

redisClient.on("err", (err) => {
	console.log("redis err:", err);
});

redisClient.on("connect", () => {
	console.log("fuck you");
});

redisClient.set("framework", function (err, reply) {
	console.log(reply); // OK
});
