var io;

module.exports = {
    configureSocket : (http) => {

        io = require('socket.io')(http);

        io.on('connection', (socket) => {
            var username = socket.handshake.query['username'];
            console.log(username + ' user connected');

            socket.on('disconnect', function () {
                console.log(username + ' disconnected');
            });

            socket.on('taunt', (message) => {
                console.log("> Socket " + username + " said: " + message);
                io.sockets.emit('taunt', {username, message})
            });
        });
    },
    
    broadcastEvent : () => {
        io.sockets.emit('gameStarted');
    }

}

