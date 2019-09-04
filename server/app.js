const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

var http = require('http').createServer(app);
var socket = require('./controllers/socket.ctrl')(http);
//socket.configureSocket(io);

app.use(express.json());
app.use(cors());

const routes = require("./routes/game");
app.use(routes.router);


app.get("/", function (req, res, next) {
    res.status(200).send("-> Game server is running");
});


http.listen(port, () => console.log(`Game server started at port ${port}!`));