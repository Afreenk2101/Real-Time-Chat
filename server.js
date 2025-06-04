
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});
let messages = [];
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('chat_history', messages);
  socket.on('send_message', (data) => {
    messages.push(data);
    io.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
server.listen(3001, () => {
  console.log('Server running on port 3001');
});
