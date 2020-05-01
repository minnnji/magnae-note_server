const util = require('util');
const rooms = {};
const users = {};

const addUser = (roomId, name, socketId) => {
  if (rooms[roomId]) {
    rooms[roomId].push([name, socketId]);
  } else {
    rooms[roomId] = [];
    rooms[roomId].push([name, socketId]);
  }
};

const handleSocket = io => {
  io.on('connection', socket => {
    util.log('connect>>', socket.id, socket.handshake.query);
    socket.emit("yourID", socket.id);

    socket.on('createRoom', (name, roomId) => {
      socket.join(roomId, () => {
        util.log('create>>', name, roomId, Object.keys(socket.rooms));
      });

      addUser(roomId, name, socket.id);

      io.sockets.emit("thisRoomUsers", rooms[roomId]);
      socket.emit('message', { message: '참석자를 기다리는 중입니다.' });
    });

    socket.on('joinRoom', (name, roomId) => {
      addUser(roomId, name, socket.id);

      io.sockets.emit("thisRoomUsers", rooms[roomId][0]);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
    });

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit('hey', {
        signal: data.signalData,
        fromId: data.fromId,
        fromName: data.fromName });
    });

    socket.on("acceptCall", (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
    });
  });
}
module.exports = handleSocket;
