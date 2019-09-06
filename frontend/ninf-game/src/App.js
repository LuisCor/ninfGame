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
  const [messages, setMessages] = useState([]);

  const initSocket = (username) => {
    socket = gameSocket(username);
  };

  useEffect(() => {
    console.table(messages);
    if (socket) {

      isGameStarted(setGameState);

      receiveTaunt((newMessage) => {
        setMessages((messages) => ([...messages, newMessage]));
      });

    }
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
                <Button onClick={clickTaunt}> Send taunt </Button>
            {messages.map((value, index) => (<p key={index} >{value}</p>))}
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