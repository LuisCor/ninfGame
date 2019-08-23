const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.ctrl');

router.get('/gameState', (req, res, next) => {

    res.send(
        gameController
            .getGameState()
    );
});

router.get('/startGame', (req, res, next) => {

    let response = gameController.startGame();

    if(response === true)
        res.sendStatus(200);
    else
        res.sendStatus(428);

});

module.exports = router;