import Redis from "ioredis";

const eventClient = new Redis({
    host: "192.168.16.74",
    port: 6379,
    password: "123456",
    db: 1
  });

// const pushEvent = async function (name: any) {
//   const result = await eventClient.rpush("1", name)
//   console.log('result:',result);
//   return result
// }

export { eventClient }