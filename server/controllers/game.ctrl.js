const questions = require('../questions.json');
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
    /*function updateTime() {
        thisgameSocket.sendTime(timeLeft - 1);
        return Promise.delay(1000).then(() => updateTime());
    }
    updateTime();
*/

    var updateTime = setInterval(function () {
        thisgameSocket.sendTime(timeLeft);
        timeLeft--;
        if(timeLeft === 0)
            clearInterval(setInterval);
    }, 1000);

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
                    players.push(username);
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
                console.log(players);
                resolve(players);
            } else {
                reject();
            }
        });
    }
};