const express = require("express");
var path = require("path");
const app = express();
const { fork } = require("child_process");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/instructions.html"));
});

app.get("/health", (req, res) => {
  res.send("good");
});

app.get("/test", async (req, res) => {
  const calculate = fork(path.join(__dirname + "/calculate.js"));
  calculate.send("start");
  calculate.on("message", (hash) => {
    res.send(hash);
  });
});

app.listen(8080);
