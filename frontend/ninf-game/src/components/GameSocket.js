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

export const receiveQuestion = (setQuestion, setOptions) => {
  socket.on('question', function (data) {
    console.log("> QUESTION:" + data.question + " \n OPTIONS: " + data.options + "\n ANSWER: " + data.answer);
    setQuestion(data.question);
    setOptions(data.options);
  });
};

export const receiveTime = (setTime) => {
  socket.on('time', function (data) {
    console.log("time: " + data.time);
    setTime(data.time);
  });
};



export const sendTaunt = () => {
  socket.emit('taunt', 'YA FUCKING WANKER');
  console.log("Sent taunt");
};


//EXPORT EXAMPLES
//export const getCurrentPot = () => socket.emit('GET_CURRENT_POT');

//export const sendNameToServer = name =>
//  socket.emit('SEND_NAME_TO_SERVER', name);


export default configureSocket;
