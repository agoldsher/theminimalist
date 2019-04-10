require("dotenv").config()
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./routes");
const app = express();
const socket = require("socket.io");
const db = require("./models");

// Define middleware here
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Send every other request to the React app
// Define any API routes before this runs
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);


// Connecting to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/theminimalist", { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
server = app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io = socket(server);

// let allUsers = [];

io.sockets.on('connection', function (socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function (room) {
    socket.join(room);
  });
  socket.on("server", function (msg) {
    console.log(msg);
    room = "abc123";
    io.sockets.in(room).emit('message', msg.msg)
    db.Message
            .create({
                to: msg.to,
                from: msg.from,
                body: msg.msg,
                room: msg.room,
            })
            // .then(dbModel => res.json(dbModel))
            // .catch(err => res.status(422).json(err))
  })
});

// room = "abc123";
// io.sockets.in(room).emit('message', 'what is going on, party people?');
  // socket.on("user_join", function (data) {
  //   socket.join("greg");
  // });
  //allUsers.push(socket.id);
  //socket.emit("users", allUsers);
  //socket.emit("id", {socketId:socket.id})
  // io.sockets.on("server", function (msg) {
  //   console.log(msg);
    //io.sockets.in(room).emit('message', msg.msg);
  //   // upload message to db
  //   // serve the message back to the sender and receiver
  //   //io.emit(msg.to, msg.msg);
  //   io.emit(msg.from, msg.msg);

  // });

  // socket.on('disconnect', function() {
  //   console.log(socket.id, "has disconnected")
  //   // allUsers = allUsers.filter( a => a !== socket.id)
  //   // socket.emit("users", allUsers);

  // });
//   socket.on('send private', function(data){
//     console.log('sending private', data);
//     io.in("greg").emit('greg',data);
// })

