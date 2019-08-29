const express = require('express');
const app = express();
const port = 3000;

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.json());

const routes = require("./routes/game");
app.use(routes);

/*
app.get("/", function(req, res, next) {
    res.status(200).send("-> Game server is running");
});
*/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(port, () => console.log(`Game server started at port ${port}!`));