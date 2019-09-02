import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';


import {
  getCurrentPot,
  sendNameToServer,
  sendPitchInToServer,
  sendGetOneToServer
} from './components/socket';

function App(props) {

  const [gameState, setGameState] = useState("waiting");

  const getOne = () => {
    const { dispatch, name } = "dude";
    dispatch({ type: 'GET_ONE' });
    sendGetOneToServer(name);
  };


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
        <Button onClick={getOne} variant="raised" color="secondary">Button</Button>

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