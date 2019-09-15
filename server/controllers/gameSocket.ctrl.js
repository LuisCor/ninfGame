var io;

var receiveAnswer;

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

            socket.on('answer', (answer) => {
                receiveAnswer(username, answer);
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
        let timeString = "00:" + time.toString();
        io.sockets.emit('time', timeString);
        console.log("Time: " + timeString);
    },

    sendIntermissionTime : (time) => {
        let timeString = "00:" + time.toString();
        io.sockets.emit('intermission', timeString);
        console.log("Intermission: " + timeString);
    },

    receiveAnswer : (logic) => {
        receiveAnswer = logic;
    }
}
