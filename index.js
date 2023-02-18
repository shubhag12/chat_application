const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const Chat = require("./models/chat");
const connect = require("./config/database-config.js");
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.roomid);
  });
  socket.on("msg_send", async (data) => {
    console.log(data);
    const chat = await Chat.create({
      roomId: data.roomid,
      user: data.username,
      content: data.msg,
    });
    io.to(data.roomid).emit("msg_rcvd", data);
  });
});
app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));
app.get("/chat/:roomid",async (req, res) => {
    const chats=await Chat.find({
        roomId:req.params.roomid
    }).select('content user')
    console.log(chats);
  res.render("index", {
    name: "shubh",
    id: req.params.roomid,
    chats:chats
  });
});
server.listen(3000, async () => {
  console.log("server starting ");
  await connect();
  console.log("mongodb connected");
});
