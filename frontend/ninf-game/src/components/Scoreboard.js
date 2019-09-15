import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import gameSocket,
{
    detectNewPlayers
} from './GameSocket';
import config from '../config.json';
const server = config.serverLocation;


function Scoreboard(props) {

    var socket = props.gameSocket;

    const getScoreBoard = () => {

        fetch(server + '/getScores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => {
                resp.json()
                    .then((data) => {
                        setScores(data.sort((a, b) => {
                            return b[1] - a[1];
                        }));
                    })
            })
            .catch(err => { console.log(err) });
    }

    const [scores, setScores] = useState([]);

    useEffect(() => {
        getScoreBoard();
    }, []);


    return (

        <div id="lobby">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                Scores
                {scores.map((player, index) => {
                    if (index === 0)
                        return <h1 key={index} >🏆 {player[0]}     {player[1]}</h1>
                    else
                        return <p key={index} >👤 {player[0]}     {player[1]}</p>
                }
                )}
            </Grid>
        </div>
    );

};

export default Scoreboard;