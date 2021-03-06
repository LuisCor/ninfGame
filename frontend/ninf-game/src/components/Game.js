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

    const [questionNumber, setQuestionNumber] = useState(0);
    const [question, setQuestion] = useState("Question");
    const [options, setOptions] = useState(["Option 1", "Option2"]);
    const [answer, setAnswer] = useState("Answer");
    const [time, setTime] = useState("Time");


    useEffect(() => {
        if (socket) {
            receiveQuestion(setQuestionNumber, setQuestion, setOptions, setAnswer, setTime);
        }
    }, [questionNumber]);


    useEffect(() => {
        if (socket)
            receiveTime(setTime);
    }, [questionNumber]);


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
                <h2>{questionNumber+1} - {question}</h2>
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
                                    variant="outlined"
                                    onClick={() => (clickAnswer(questionNumber, index))}
                                >
                                    {value}
                                </Button>))}
                        </>
                    )
                }
                <b>{time}</b>
            </Grid>
        </div>
    )

};

export default Game;