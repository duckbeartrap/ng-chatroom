const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();
let socketIO = require('socket.io');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/ng-chatroom')));

// Send all other requests to the Angular app
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ng-chatroom/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
let io = socketIO(server);

let rooms = {};

io.on('connection', (socket) => {
  socket.on('join', (room, user) => {
    socket['user'] = user;
    if (rooms[room]) {
      rooms[room][user.email] = socket;
    } else {
      let newRoom = {};
      newRoom[user.email] = socket;
      rooms[room] = newRoom;
    }
    socket.emit('joined', true);
    emitForGroup(room, Object.keys(rooms[room]), 'participantsUpdate');
  });

  socket.on('typing', (room, payload) => {
    emitForGroup(room, payload, 'typed')
  });

  socket.on('message', (room, payload) => {
    emitForGroup(room, payload, 'new-message')
  });

  socket.on('leave', (room, payload) => {
     delete rooms[room][payload.email];
     emitForGroup(room, Object.keys(rooms[room]), 'participantsUpdate');
  })
});

function emitForGroup(room, payload, event) {
    clientsToEmit = rooms[room];
    console.log(clientsToEmit);
    for( let client of Object.values(clientsToEmit) ){
      client.emit(event, payload)
    }
}

server.listen(port, () => console.log(`Running on localhost:${port}`));
