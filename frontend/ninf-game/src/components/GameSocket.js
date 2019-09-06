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

export const receiveTaunt = (messages, setMessages) => {
  socket.on('taunt', function (data) {
    console.log("> " + data.username + " : " + data.message);
    messages.push(data.message);
    setMessages(Array.from(messages));
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