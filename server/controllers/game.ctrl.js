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
var currentQuestion = 0;
var timeLeft = defaultTime;

function gameRunner() {

    timeLeft = defaultTime;


    thisgameSocket.sendQuestion(
        {
            ...questions.question[currentQuestion],
            "questionNumber" : currentQuestion
        }
    );

    var questionTimer = setInterval(function () {
        thisgameSocket.sendTime(timeLeft);
        timeLeft--;
        if (timeLeft === -1) {
            clearInterval(questionTimer);
            currentQuestion++;
            if(currentQuestion >= questions.question.length) {
                gameState = 2;
                thisgameSocket.endGame();
                console.log("> Game has finished");
            }
        }
    }, 1000);


}

function receiveAnswer(username, answer) {

    players.some(p => {
        if (p.getUsername() === username) {
            //holy shit is this method bad
            //it saves the answer, but the verification if it's correct is done here, that's why it's so big
            console.log(answer.index);
            console.log(currentQuestion);
            if (answer.index !== currentQuestion)
                console.log("Answer> Received answer for the wrong question, client de-sync?");
            else
                if (!p.saveAnswer(currentQuestion, answer.option, answer.option === questions.question[currentQuestion].answer))
                    console.log("Answer> Client answered a second time, dismissing");
                else
                    console.log("Answer> " + username + " : " + JSON.stringify(p.getAnswers()));

        }
    });

}

module.exports = {

    setGameSocket: (gameSocket) => {
        thisgameSocket = gameSocket;
        gameSocket.receiveAnswer(receiveAnswer);
    },

    signUp: (username) => {

        return new Promise((resolve, reject) => {
            if (gameState === 0) {
                if (players.some(e => e.getUsername() === username)) {
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
                let playerNames = players.map((e) => (e.getUsername()));
                resolve(playerNames);
            } else {
                reject();
            }
        });
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

    nextQuestion: () => {
        return new Promise((resolve, reject) => {
            if (gameState === 1 && timeLeft === -1) {
                gameRunner();
                resolve();
            } else {
                reject("> Game not running, or question has not finished");
            }
        });
    },

    getScores: () => {
        return new Promise((resolve, reject) => {
            let playerScores = players.map((e) => ([e.getUsername(), e.getScore()]));
            resolve(playerScores);

        });
    }


};