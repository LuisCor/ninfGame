// Game states
// 0 - waiting
// 1 - running
// 2 - finished
const gameStates = [
    "waiting",
    "running",
    "finished"
];
var gameState = 0;
var players = [];


module.exports = {
    getGameState: () => {
        return new Promise((resolve, reject) => {
            resolve(gameStates[gameState]);
        });
    },

    startGame: () => {        
        return new Promise((resolve, reject) => {
            if(gameState === 0){
                gameState = 1;
                console.log("-> GAME STARTED");
                resolve();
            } else {
                reject();
            }
        });
    },

    signUp: (username) => {
        
        return new Promise((resolve, reject) => {
            if(gameState === 0){
                if (players.some(e => e === username)) {
                    reject("Already registered");
                    console.log("Signup > Already registered " + username);
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
            if(gameState === 0){
                console.log(players);
                resolve(players);
            } else {
                reject();
            }
        });
    }
};