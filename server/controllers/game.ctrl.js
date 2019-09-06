const questions = require('../questions.json');
const Player = require('../classes/player');

const defaultTime = 15;
const gameStates = [
    "waiting",
    "running",
    "finished"
];
var gameState = 0;
var players = [];
var thisgameSocket = undefined;

function gameRunner() {

    let timeLeft = defaultTime;

    thisgameSocket.sendQuestion(questions.question[0]);

    var questionTimer = setInterval(function () {
        thisgameSocket.sendTime(timeLeft);
        timeLeft--;
        if(timeLeft === -1)
            clearInterval(questionTimer);
    }, 1000);

    console.log("started intermission");
    timeLeft = defaultTime;

    var intermissionTimer = setInterval(function () {
        thisgameSocket.sendIntermissionTime(timeLeft);
        timeLeft--;
        if(timeLeft === -1)
            clearInterval(intermissionTimer);
    }, 1000);

    console.log("intermission ended");


}

module.exports = {

    setGameSocket: (gameSocket) => {
        thisgameSocket = gameSocket;
    },

    getGameState: () => {
        return new Promise((resolve, reject) => {
            resolve(gameStates[gameState]);
        });
    },

    startGame: () => {
        return new Promise((resolve, reject) => {
            if (gameState === 0) {
                gameState = 1;
                thisgameSocket.startGame();
                console.log("-> GAME STARTED");
                gameRunner();
                resolve();
            } else {
                reject();
            }
        });
    },


    signUp: (username) => {

        return new Promise((resolve, reject) => {
            if (gameState === 0) {
                if (players.some(e => e === username)) {
                    console.log("Signup > Already registered " + username);
                    reject();
                }
                else {
                    console.log("Signup > Registering " + username);
                    players.push(new Player(username));
                    resolve();
                }
            } else {
                console.log("Signup > Can't signup now");
                reject();
            }
        });
    },

    listPlayers: () => {
        return new Promise((resolve, reject) => {
            if (gameState === 0) {
                console.log(players[0].getUsername());
                resolve(players[0].getUsername());
            } else {
                reject();
            }
        });
    }
};