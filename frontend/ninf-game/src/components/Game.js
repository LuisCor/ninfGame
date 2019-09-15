import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import gameSocket,
{
    receiveTaunt,
    isGameStarted,
    receiveQuestion,
    sendTaunt,
    receiveTime,
    receiveIntermission,
    sendAnswer
} from './GameSocket';


function Game(props) {

    var socket = props.gameSocket;

    const [question, setQuestion] = useState("Question");
    const [options, setOptions] = useState(["Option 1", "Option2"]);
    const [answer, setAnswer] = useState("Answer");
    useEffect(() => {
        if (socket) {
            receiveQuestion(setQuestion, setOptions, setAnswer);
        }
    }, [question]);


    const [time, setTime] = useState("Time");
    useEffect(() => {
        if (socket) {
            receiveTime(setTime);
        }
    }, [question, time]);


    const clickAnswer = ((questionIndex, optionIndex) => {
        if (socket) {
            sendAnswer({
                "index": questionIndex,
                "option": optionIndex
            });
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
                {time === "00:0" ? (
                    <>
                        {options.map((value, index) => (
                            index === answer ? (
                                <Button key={index} variant="contained" color="primary">{value}</Button>
                            ) : (
                                    <Button key={index} variant="contained" color="secondary">{value}</Button>
                                )
                        ))}
                    </>
                ) : (
                        <>
                            {options.map((value, index) => (
                                <Button
                                    key={index}
                                    onClick={() => (clickAnswer(0, index))}
                                >
                                    {value}
                                </Button>))}
                        </>
                    )
                }
                {time}
            </Grid>
        </div>
    )

};

export default Game;