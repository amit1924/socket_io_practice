// Import necessary modules
import express from "express";
import http from "http";
import { Server } from "socket.io";

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a new instance of Socket.IO server and attach it to the HTTP server
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle incoming socket connections
io.on("connection", (socket) => {
  // Log when a client is connected to the server
  console.log("Client is connected to server");

  // Handle 'message' event from client
  socket.on("message", (clientMessage) => {
    // Log the message received from the client
    console.log(`Client is messaging ${socket.id}`, clientMessage);

    // Broadcast the received message to all connected clients including the sender
    io.emit("message", clientMessage);
  });

  // Handle 'disconnect' event when a client disconnects
  socket.on("disconnect", () => {
    // Log when a client is disconnected from the server
    console.log("Client is disconnected");
  });
});

// Define the port number on which the server will listen for incoming connections
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  // Log a message when the server starts listening
  console.log(`Server listening on ${port}`);
});

// /////////////////////////////////
