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
    
    startGame : () => {
        io.sockets.emit('gameStarted');
    },

    sendQuestion : (question) => {
        console.log("> SENT QUESTION: " + question);
        io.sockets.emit('question', question);
    },

    sendTime : (time) => {
        io.sockets.emit('time', time);
        console.log("Time: " + time);
        console.log("\033c");
    }


}

