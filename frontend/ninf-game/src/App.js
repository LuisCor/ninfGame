import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';
import gameSocket from './components/GameSocket';
import { triggeredEvent, sendTaunt } from './components/GameSocket';


var socket = undefined;

function App(props) {

  const [gameState, setGameState] = useState("waiting");

  const initSocket = (username) => {
    socket = gameSocket(username);
  };

  useEffect(() => {
    if (socket)
      triggeredEvent();
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
          {gameState === "waiting" ? ([
            <SignIn controlState={setGameState} setInitSocket={initSocket} />
          ]) : gameState === "lobby" ? (
            [
              "Waiting for start",
              < Button onClick={clickTaunt} > Send taunt </Button>
            ]
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