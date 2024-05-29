import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const port = 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
