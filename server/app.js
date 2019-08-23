const express = require('express');
const app = express();
const port = 3000;

const routes = require("./routes/game");
app.use(routes);

app.get("/", function(req, res, next) {
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Game server started at port ${port}!`));