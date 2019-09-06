import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import gameSocket,
{
  receiveTaunt,
  isGameStarted,
  receiveQuestion,
  sendTaunt,
  receiveTime
} from './GameSocket';


function Game(props) {

    var socket = props.gameSocket;

    const [question, setQuestion] = useState("Questão");
    const [options, setOptions] = useState(["Option 1", "Option2"]);
    const [time, setTime] = useState("00:00");
  

    useEffect(() => {
        if (socket){
            receiveQuestion(setQuestion, setOptions);
            receiveTime(setTime);

        }
          
    });
    

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="center"
            >
                {question}
                {options.map((value, index) => (<Button key={index} >{value}</Button>))}
                {time}
            </Grid>
        </div>
    )

};

export default Game;