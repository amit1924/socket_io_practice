const socket = io();

const joinRoom = () => {
  const roomName = document.getElementById("room-name").value.trim();
  console.log(roomName);

  if (roomName) {
    socket.emit("joinRoom", roomName);
    document.getElementById("room-selection").style.display = "none";
  }
};
const chatRoom = document.getElementById("chat-room");
const roomSelection = document.getElementById("room-selection");
const roomName = document.getElementById("room-name");
const leaveRoom = () => {
  const roomName = document.getElementById("room-name").value.trim();
  socket.emit("leaveRoom", roomName);
  chatRoom.style.display = "none";
  roomSelection.style.display = "";
};

const sendMessage = () => {
  const message = document.getElementById("message-input").value.trim();
  const roomName = document.getElementById("room-name").value.trim();
  if (message && roomName) {
    socket.emit("chatMessage", { room: roomName, message: message });
    document.getElementById("message-input").value = "";
  }
};

socket.on("updateUsers", (users) => {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.textContent = user;
    // console.log(user);
    userList.appendChild(userItem);
  });
});

socket.on("message", (message) => {
  const chatMessages = document.getElementById("chat-messages");
  const messageItem = document.createElement("div");
  messageItem.innerHTML = `<strong>${message.sender}:</strong> ${message.message}`;
  chatMessages.appendChild(messageItem);
});
