import io from 'socket.io-client';

var socket = undefined;

const configureSocket = (username) => {

  socket = io('http://localhost:5000', { query: "username=" + username });

  return socket;
};

export const isGameStarted = (gameStatus) => {
  socket.on('gameStarted', function (data) {
    console.log("> GAME STARTED");
    gameStatus("running");
  });
};

export const receiveTaunt = (updateMessages) => {
  socket.on('taunt', function (data) {
    console.log("> " + data.username + " : " + data.message);
    updateMessages(data.message);
  });
};

export const receiveQuestion = (setQuestionNumber, setQuestion, setOptions, setAnswer) => {
  socket.on('question', function (data) {
    console.log("> QUESTION " + data.questionNumber + " : " + data.question + " \n OPTIONS: " + data.options + "\n ANSWER: " + data.answer);
    setQuestionNumber(data.questionNumber);
    setQuestion(data.question);
    setOptions(data.options);
    setAnswer(data.answer);
  });
};

export const receiveTime = (setTime) => {
  socket.on('time', function (data) {
    console.log("Time: " + data);
    setTime(data);
  });
};

export const isGameFinished = (gameStatus) => {
  socket.on('gameFinished', function (data) {
    console.log("> GAME FINISHED");
    gameStatus("finished");
  });
};


export const sendTaunt = (message) => {
  socket.emit('taunt', 'message nr ' + message);
  console.log("Sent taunt");
};

export const sendAnswer = (answer) => {
  socket.emit('answer', answer);
  console.log("Sent answer > " + answer);
};


export default configureSocket;
