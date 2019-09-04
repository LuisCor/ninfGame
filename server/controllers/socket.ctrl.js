var io;

module.exports = exports = function (http) {

    io = require('socket.io')(http);

    configureSocket();
}

const configureSocket = () => {
    io.on('connection', (socket) => {
        var username = socket.handshake.query['username'];
        console.log(username + ' user connected');
        socket.on('disconnect', function () {
            console.log(username + ' disconnected');
        });
        socket.on('taunt', (message) => {
            console.log("> Socket " + username + " said: " + message);
        })
    });
  };
