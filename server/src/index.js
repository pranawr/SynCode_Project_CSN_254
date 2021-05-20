const dotenv = require('dotenv');
const cors =  require('cors');
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const httpServer = new http.Server(app);
const axios = require("axios");

const CLIENT_URL = "http://localhost:3000";

app.use(
    cors({
      origin: CLIENT_URL,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // allow session cookies from browser to pass throught
    })
);

app.use(cookieParser());

dotenv.config({path:'./config.env'});

app.use(express.json());

require('./db/connec');

app.use(require('./router/auth'));

const User = require('./models/userSchema');

const PORT = process.env.PORT;

var rooms = []
var removeRooms = []

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

function removingRooms() {

  console.log("ROOMS: " + rooms)
  if (removeRooms.length != 0) {
      for (let i = 0; i < removeRooms.length; i++) {
          if (io.sockets.adapter.rooms[removeRooms[i]] === undefined) {
              rooms = rooms.filter(function (item) {
                  return item !== removeRooms[i]
              })
          }
      }
  }
  removeRooms.splice(0,removeRooms.length)

  setTimeout(removingRooms, 60 * 60 * 1000);
}

function getLastValue(set){
  let value;
  for(value of set);
  return value;
}

io.on("connection", socket => {
  console.log("COMMECTED SUCCESSFULLY");
  const { id } = socket.client
  console.log(`User connected ${id}`)

  // Check if room exists
  socket.on('room-id', msg => {
      let exists = rooms.includes(msg)
      socket.emit('room-check', exists)

  })

  // If code changes, broadcast to sockets
  socket.on('code-change', msg => {
      socket.broadcast.to(socket.room).emit('code-update', msg)

  })

  // Send initial data to last person who joined
  socket.on('user-join', msg => {
      let room = io.sockets.adapter.rooms.get(socket.room);
      let lastPerson = getLastValue(room);
      console.log("lastPerson-->" + lastPerson);
      io.to(lastPerson).emit('accept-info', msg);
  })

  // Add room to socket
  socket.on('join-room', msg => {
      console.log("JOINING " + msg.id)
      socket.room = msg.id
      socket.join(msg.id);
      console.log(io.sockets.adapter.rooms);
      console.log(io.sockets.adapter.rooms.get(msg.id));
    
      let room = io.sockets.adapter.rooms.get(socket.room);
      console.log(room);
      if (room.size > 1) {
          var it = room.values();

          var first = it.next();
          let user = first.value;
          console.log("first-->" + user);
          // let user = Object.keys(room.sockets)[0]
          io.to(user).emit('request-info', "");
      }
      console.log("-----> "+ Object.values(msg));
      socket.emit('receive-message', { sender: 'admin', text: `${msg.nameOfUser}, welcome to room.`});
      socket.broadcast.to(socket.room).emit('receive-message', { sender: 'admin', text: `${msg.nameOfUser} has joined!` });
      io.sockets.in(socket.room).emit('joined-users', room.size)
  })

  socket.on('created-room', msg => {
      console.log("CREATED-ROOM " + msg)
      rooms.push(msg)
      console.log(rooms);
  })


  // If language changes, broadcast to sockets
  socket.on('language-change', msg => {
      io.sockets.in(socket.room).emit('language-update', msg)
  })

  // If title changes, broadcast to sockets
  socket.on('title-change', msg => {
      io.sockets.in(socket.room).emit('title-update', msg)
  })

  socket.on('sendMessage', ({message, sender}) => {
    io.to(socket.room).emit('receive-message', { sender: sender, text: message });
  });

  // If connection is lost
  socket.on('disconnect', () => {
      console.log(`User ${id} disconnected`)
  })

  socket.on('leaving', (msg)=>{
    try {
        let room = io.sockets.adapter.rooms.get(socket.room)
        io.sockets.in(socket.room).emit('joined-users', room.size - 1)
        socket.broadcast.to(socket.room).emit('receive-message', { sender: 'admin', text: `${msg.nameOfUser} has left!` });
        if (room.size === 1) {
            console.log("Leaving Room " + socket.room)
            socket.leave(socket.room)
            removeRooms.push(socket.room)
        }
    }
    catch (error) {
        console.log("Leaving error")
    }
  })

  // Check if there is no one in the room, remove the room if true
  socket.on('disconnecting', () => {
      try {
          let room = io.sockets.adapter.rooms.get(socket.room)
          io.sockets.in(socket.room).emit('joined-users', room.size - 1)
          if (room.size === 1) {
              console.log("Leaving Room " + socket.room)
              socket.leave(socket.room)
              removeRooms.push(socket.room)
          }
      }
      catch (error) {
          console.log("Disconnect error")
      }
  })
})

app.get('/', (req, res) => {
    res.send(`Welcome`);
});

app.post('/execute', async (req, res)=>{
    console.log(req.body);
    const { script, language, stdin, versionIndex } = req.body;

    const response = await axios({
        method: "POST",
        url: process.env.JDOODLE_URL,
        data: {
          script: script,
          stdin: stdin,
          language: language,
          versionIndex: versionIndex,
          clientId: process.env.JDOODLE_CLIENT_ID,
          clientSecret: process.env.JDOODLE_CLIENT_SECRET
        },
        responseType: "json",
      });

    console.log("RESPONSE from jdoodle--->" + response.data);
    res.json(response.data);
})

console.log('Hello world from server IndexJS');
removingRooms();
httpServer.listen(PORT, () => {
    console.log(`port ${PORT}`);
});
