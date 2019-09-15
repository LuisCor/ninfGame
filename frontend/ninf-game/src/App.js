import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import SignIn from './components/Signin';
import Game from './components/Game';
import Lobby from './components/Lobby';
import Scoreboard from './components/Scoreboard';
import gameSocket,
{
  receiveTaunt,
  isGameStarted,
  sendTaunt,
  isGameFinished
} from './components/GameSocket';


var socket = undefined;
var messagesnum = 0;


function App(props) {

  const [gameState, setGameState] = useState("waiting");

  useEffect(() => {
    if (socket) {
        isGameStarted(setGameState);
        isGameFinished(setGameState);
    }
    console.log("app effect1");

  }, [gameState]);


  const [messages, setMessages] = useState(["Messages"]);

  useEffect(() => {
    if (socket) {

      receiveTaunt((newMessage) => {
        setMessages((messages) => ([...messages, newMessage]));
      });

    }
    console.log("app effect2");

  }, [gameState]);


  const initSocket = (username) => {
    socket = gameSocket(username);
  };


  const clickTaunt = () => {
    if (socket) {
      sendTaunt(messagesnum);
      messagesnum++;
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
                <Lobby gameSocket={socket}/>
                <Button onClick={clickTaunt}> Send taunt </Button>
                {messages.map((value, index) => (<p key={index} >{value}</p>))}
              </>
            ) : gameState === "running" ? (
              <>
                <Game gameSocket={socket} />
              </>
            ) : gameState === "finished" ? (
              <Scoreboard/>
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