// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import { generateUsername } from "unique-username-generator";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const port = 3000;
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const rooms = {};

// io.on("connection", (socket) => {
//   const username = generateUsername(); // Generate a unique username for the user
//   socket.username = username; // Assign the generated username to the socket

//   console.log(`User ${username} connected`);

//   socket.on("joinRoom", (room) => {
//     if (!rooms[room]) {
//       rooms[room] = [];
//     }
//     rooms[room].push(username);
//     socket.join(room);
//     io.to(room).emit("updateUsers", rooms[room]);
//   });

//   socket.on("leaveRoom", (room) => {
//     if (rooms[room]) {
//       rooms[room] = rooms[room].filter((name) => name !== username);
//       socket.leave(room);
//       io.to(room).emit("updateUsers", rooms[room]);
//     }
//   });

//   socket.on("chatMessage", (data) => {
//     const { room, message } = data;
//     io.to(room).emit("message", { sender: username, message });
//   });

//   socket.on("disconnect", () => {
//     console.log(`User ${username} disconnected`);
//     for (const room in rooms) {
//       rooms[room] = rooms[room].filter((name) => name !== username);
//       io.to(room).emit("updateUsers", rooms[room]);
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server listening at ${port}`);
// });

// export default app;

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { generateUsername } from "unique-username-generator";
import path from "path";
import { fileURLToPath } from "url";

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const rooms = {};

io.on("connection", (socket) => {
  const username = generateUsername(); // Generate a unique username for the user
  socket.username = username; // Assign the generated username to the socket

  console.log(`User ${username} connected`);

  socket.on("joinRoom", (room) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(username);
    socket.join(room);
    io.to(room).emit("updateUsers", rooms[room]);
  });

  socket.on("leaveRoom", (room) => {
    if (rooms[room]) {
      rooms[room] = rooms[room].filter((name) => name !== username);
      socket.leave(room);
      io.to(room).emit("updateUsers", rooms[room]);
    }
  });

  socket.on("chatMessage", (data) => {
    const { room, message } = data;
    io.to(room).emit("message", { sender: username, message });
  });

  socket.on("disconnect", () => {
    console.log(`User ${username} disconnected`);
    for (const room in rooms) {
      rooms[room] = rooms[room].filter((name) => name !== username);
      io.to(room).emit("updateUsers", rooms[room]);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

export default app;
