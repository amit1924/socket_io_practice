const socket = io();

const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.getElementById("btn");
const ul = document.querySelector("ul");

const sendMessage = (e) => {
  e.preventDefault();

  socket.emit("message", input.value);
  console.log(`Server is sending message: ${input.value}`);

  input.value = "";
};

button.addEventListener("click", sendMessage);

socket.on("message", (serverMessage) => {
  let li = document.createElement("li");
  li.textContent = serverMessage;
  ul.appendChild(li);
});
