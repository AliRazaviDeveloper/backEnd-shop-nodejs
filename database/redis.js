const redisDB = require("redis");
const redisClient = redisDB.createClient();

redisClient.connect();

redisClient.on("error", (err) => {
  if (err) throw err;
});

redisClient.on("connect", () => {
  console.log("redis connected");
});
redisClient.on("ready", () => {
  console.log("redis ready");
});

module.exports = redisClient;
