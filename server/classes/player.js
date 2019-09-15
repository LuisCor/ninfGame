const questions = require('../questions.json');
const nrQuestions = questions.question.length;


module.exports = function Player(username) {

    var username;
    var answers = new Array(nrQuestions);
    var score = 0;


    this.username = username;

    function getUsername() {
        return username;
    };

    //question - index
    //answer - option index
    function saveAnswer(question, answer, correct) {
        if (answers[question] !== undefined)
            return false;
        else {
            answers[question] = answer;
            if (correct)
                score++;
            return true;
        }
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
