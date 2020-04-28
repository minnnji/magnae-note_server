const util = require('util');
const rooms = {};
const users = {};

const handleSocket = io => {
  io.on('connection', socket => {
    util.log('connect>>', socket.id, socket.handshake.query);

    socket.on('createRoom', (name, roomId) => {
      const socketId = socket.id;
      rooms[roomId] = socketId;
      users[socketId] = name;

      socket.join(roomId, () => {
        util.log('create>>', name, Object.keys(socket.rooms));
      });

      socket.emit('message', { message: '참석자를 기다리는 중입니다.' });
    });

    socket.on('peerCall', data => {
      io.to(rooms[data.roomId]).emit('peerCallToCreator', {
        signal: data.signalData,
        from: data.from
      });
    });

    socket.on('creatorCall', data => {
      io.to(data.to).emit('callAccepted', data.signal);
    })

    // To Do
    socket.on('disconnect', () => {
      // delete rooms[roomId];
    });
  });
}

module.exports = handleSocket;
