const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(cors());

const routes = require("./routes/game");
app.use(routes.router);


app.get("/", function (req, res, next) {
    res.status(200).send("-> Game server is running");
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(port, () => console.log(`Game server started at port ${port}!`));