// Import necessary modules
import express from "express";
import http from "http";
import { Server } from "socket.io";

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Array of usernames
const usernames = [
  "Amit",
  "Rahul",
  "John",
  "Alice",
  "Bob",
  "Catherine",
  "David",
  "Emily",
  "Frank",
  "Grace",
  "Arsh",
  "Rashmi",
  "Abhishek",
  "Anurag",
];

// Function to generate a random username
function generateUsername() {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  // Return username corresponding to random index
  return usernames[randomIndex];
}

// Create a new instance of Socket.IO server and attach it to the HTTP server
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle incoming socket connections
io.on("connection", (socket) => {
  // Generate random username for the user
  const username = generateUsername();

  // Store the username in the socket object for future reference
  socket.username = username;

  // Send a welcome message to the client
  socket.emit("message", `Welcome ${username}`);

  // Broadcast a notification to all clients that a new user has joined
  socket.broadcast.emit("message", `${username} has joined the chat`);

  // Handle 'message' event from client
  socket.on("message", (clientMessage) => {
    // Broadcast the message to all clients except the sender
    socket.broadcast.emit("message", `${socket.username}: ${clientMessage}`);
  });

  // Handle 'disconnect' event when a client disconnects
  socket.on("disconnect", () => {
    // Broadcast a notification to all other clients that a user has left
    io.emit("message", `${socket.username} has left the chat`);
  });
});

// Define the port number on which the server will listen for incoming connections
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  // Log a message when the server starts listening
  console.log(`Server listening on ${port}`);
});
