import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';

var socket = undefined;

function App(props) {

  const [gameState, setGameState] = useState("waiting");

  const initSocket = (username) => {
    socket = io('http://localhost:5000', { query: "username=" + username });
  };

  useEffect(() => {
    if (socket)
      socket.on('event', function (data) {
        console.log("Event was triggered");
      });
  });

  const sendTaunt = () => {
    if (socket) {
      socket.emit('taunt', 'YA FUCKING WANKER');
      console.log("Sent taunt");
    }
  }

  return (
    <div className={"app"}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header gameState={gameState} />
        </Grid>
        <Grid item xs={12}>
          {gameState === "waiting" ? (
            <SignIn controlState={setGameState} setInitSocket={initSocket} />
          ) : gameState === "lobby" ? (
            [
            "Waiting for start",
            < Button onClick={sendTaunt} > Send taunt </Button>
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