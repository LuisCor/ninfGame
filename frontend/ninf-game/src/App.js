import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';

const socket = io('http://localhost:5000');

function App(props) {

  const [gameState, setGameState] = useState("waiting");
  
  

  useEffect( () => {
    socket.on('event', function(data){
      console.log("Event was triggered");
    });
  });

  
  if (gameState === "waiting")
    return (
      <div className={"app"}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header gameState={gameState} />
          </Grid>
          <Grid item xs={12}>
            <SignIn controlState={setGameState} />
          </Grid>
        </Grid>
      </div>
    );

  else if (gameState === "lobby")
    return (
      <div className={"app"}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header gameState={gameState} />
          </Grid>
          <Grid item xs={12}>
            other stuff now
        </Grid>
        </Grid>
      </div>
    );

};

export default App;