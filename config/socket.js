const util = require('util');
const users = {};

const handleSocket = io => {
  io.on('connection', socket => {
    util.log('connect>>', socket.id, socket.handshake.query);

    socket.on('createRoom', (name, roomId) => {
      const socketId = socket.id;
      users[socketId] = name;

      socket.join(roomId, () => {
        util.log('create>>', name, Object.keys(socket.rooms));
      });

      socket.emit('message', { message: '참석자를 기다리는 중입니다.' });
    });

    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }

    socket.on('disconnect', () => {
      delete users[socket.id];
    });
  });
}

module.exports = handleSocket;
