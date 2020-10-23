const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 7000;
const users = [];
const user = {};

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));

//render template 
app.get("/", (req, res) => {
  res.render("index.njk", null);
});

//render template 
app.get("/chatroom", (req, res) => {
  res.render("chatroom.njk", { uname: req.query.uname });
});


io.on("connection", function (socket) {
  //broadcast the online user messafe to all users
  socket.on("uname", username => {
    users.push(username);
    user[socket.id] = username;
    socket.emit('online', users);
  });
  
  //broadcast the join message to all other users
  socket.on("connected", username => {
    socket.broadcast.emit('connected-message',username);
  });
  socket.on("message", (msg) => {
    debug(`${msg.user}: ${msg.message}`);
    //Broadcast the message to everyone
    io.emit("message", msg);
  });
  //broadcast the leave message to all other users
  socket.on("disconnect", () => {
    socket.broadcast.emit('disconnect-message',user[socket.id]);
    var index = users.indexOf(user[socket.id]);
    users.splice(index, 1);
    delete user[socket.id];
  });
});

http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
