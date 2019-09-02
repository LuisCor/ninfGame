import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import SignIn from './components/Signin';


function App(props) {

  const [gameState, setGameState] = useState("waiting");

  if (gameState === "waiting")
    return (

      <div className={"app"}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <SignIn controlState={setGameState} />
          </Grid>
        </Grid>
      </div>
    );
  
  else if(gameState === "lobby")
  return (

    <div className={"app"}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          other stuff now
        </Grid>
      </Grid>
    </div>
  );
  
};

export default App;