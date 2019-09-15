const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.ctrl');

router.get('/gameState', (req, res, next) => {

    gameController
        .getGameState()
        .then(state => res.status(200).send(state))
        .catch(err => res.sendStatus(500));
});

router.post('/signup', (req, res, next) => {

    if (req.body === undefined || req.body.username === undefined)
        res.sendStatus(400);
    else
        gameController
            .signUp(req.body.username)
            .then(() => res.sendStatus(200))
            .catch((err) => {console.log(err), res.status(428).send(err)});
});

router.get('/listPlayers', (req, res, next) => {
    gameController
        .listPlayers()
        .then((players) => res.status(200).send(players))
        .catch((err) => {console.log(err), res.sendStatus(500)});
});

router.get('/startGame', (req, res, next) => {

    gameController
        .startGame()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {console.log(err), res.sendStatus(428)});
});

router.get('/nextQuestion', (req, res, next) => {

    gameController
        .nextQuestion()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {console.log(err), res.sendStatus(428)});
});

router.get('/getScores', (req, res, next) => {

    gameController
        .getScores()
        .then((players) => res.status(200).send(players))
        .catch((err) => {console.log(err), res.sendStatus(500)});
});



module.exports.router = router;
module.exports.gameController = gameController;