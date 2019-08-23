// Game states
// - notStarted
// - awaitingPlayers
var gameState = "notStarted";
var players = [];

module.exports = {
    getGameState: () => {
        return gameState;
    },

    startGame: () => {
        if(gameState === "notStarted"){
            gameState = "started";
            console.log("-> GAME STARTED");
            return true;
        } else {
            return false;
        }

    }

};