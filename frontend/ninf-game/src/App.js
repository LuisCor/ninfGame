import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';
import Game from './components/Game';
import gameSocket,
{
  receiveTaunt,
  isGameStarted,
  sendTaunt
} from './components/GameSocket';


var socket = undefined;

function App(props) {

  const [gameState, setGameState] = useState("waiting");
  const [messages, setMessages] = useState(["Messages:"]);

  const initSocket = (username) => {
    socket = gameSocket(username);
  };

  useEffect(() => {
    if (socket) {
      receiveTaunt((newMessage) => {
        let buffer = messages;
        buffer.push(newMessage)
        setMessages(Array.from(buffer))
      });
    }
  });

  useEffect(() => {
    if (socket)
      isGameStarted(setGameState);

  });

  const clickTaunt = () => {
    if (socket) {
      sendTaunt();
    }
  }

  return (
    <div className={"app"}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header gameState={gameState} />
        </Grid>
        <Grid item xs={12}>
          {gameState === "waiting" ?
            (
              <SignIn controlState={setGameState} setInitSocket={initSocket} />
            ) : gameState === "lobby" ? (
              <>
                <p>Waiting for start</p>
                {messages.map((value, index) => (<p key={index} >{value}</p>))}
                <Button onClick={clickTaunt}> Send taunt </Button>
              </>
            ) : gameState === "running" ? (
              <>
                <Game gameSocket={socket}/>
              </>
            ) : (
                  "render failed"
                )
          }
        </Grid>
      </Grid>
    </div>
  );



};

export default App;