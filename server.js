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

// Real time private messaging with socket.io

io = socket(server);

io.sockets.on('connection', function (socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function (room) {
    socket.join(room);
    db.Message
      .find({ room: room })
      .then((dbModel) => {
        dbModel.forEach(message => {
          io.sockets.in(room).emit('message', message.body)
        })
      })
      .catch(err => console.log(err));
  });
  socket.on("server", function (msg) {
    room = msg.room;
    io.sockets.in(room).emit('message', msg.msg)
    db.Message
      .create({
        to: msg.to,
        from: msg.from,
        body: msg.msg,
        room: msg.room,
      })
      //.then(dbModel => res.json(dbModel))
      .catch(err => console.log(err))
  });
  socket.on('person', function (person) {
    console.log(person);
    db.Message
      .find({ $or: [
        {to: person},
        {from: person}
      ]
      })
      .then((dbModel) => {
        //console.log(dbModel);
        console.log(person);
        dbModel.forEach(conversation => {
          //console.log(conversation);
          io.sockets.in(person).emit('message', conversation.to + " : " + conversation.from)
        })
      })
      .catch(err => console.log(err));
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});