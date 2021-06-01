const crypto = require("crypto");

const calculate = async () => {
  const hash = crypto.createHash("sha256");
  for (let i = 0; i < 10e6; i++) {
    hash.update(crypto.randomBytes(100).toString("hex"));
  }
  return hash.digest("hex") + "\n";
};

process.on("message", async (msg) => {
  let data = await calculate();
  process.send(data);
});
process.on("error", (error) => {
  console.log(error);
  process.exit(1);
});
