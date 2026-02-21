import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import {socketAuth} from "../middlewares/socketMiddleware.js";
import {getUserConversationsForSocketIO} from "../controllers/conversationController.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
});

io.use(socketAuth);

const onlineUsers = new Map(); /*this is for a small number of users, when reaching millions of users, use redis*/


io.on('connection',  async(socket) => {
  const user = socket.user;
  console.log(`${user.displayName} online with socket id: ${socket.id}`);
  onlineUsers.set(user._id, socket.id);

  io.emit('online-users', Array.from(onlineUsers.keys()));

  const conversationIds = await getUserConversationsForSocketIO(user._id);
  conversationIds.forEach(conversationId => socket.join(conversationId));

  socket.on('disconnect', () => {
    onlineUsers.delete(user._id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
    console.log(`${user.displayName} offline with socket id: ${socket.id}`);

  })
})

export {io, app, server}
