const questions = require('../questions.json');
const nrQuestions = questions.question.length;

var username;
var answers = new Array(nrQuestions);
var score;


module.exports = function Player(username) {

    this.username = username;
    console.log("player init: " + this.username);

    function getUsername() {
        return username;
    };
    
    //question - index
    //answer - option index
    function saveAnswer(question, answer, correct) {
        answers[question] = answer;
        if (correct)
            score++;
    };
    
    function getAnswers() {
        return answers;
    };
    
    function getScore() {
        return score;
    };
    
    return {
        getUsername: getUsername,
        saveAnswer: saveAnswer,
        getAnswers: getAnswers,
        getScore: getScore
    }
};