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


function Lobby(props) {

    var socket = props.gameSocket;

    const getConnectedPlayers = () => {

        fetch(server + '/listPlayers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => {
                resp.json()
                    .then((data) => {
                        setPlayers(data);
                    })
            })
            .catch(err => { console.log(err) });
    }

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getConnectedPlayers();
        console.log("lobby effect1");
    }, []);

    useEffect(() => {
        if (socket)
            detectNewPlayers(getConnectedPlayers);
        console.log("lobby effect2");
    }, [players]);

    return (

        <div id="lobby">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                Players
                {players.map((player, index) => (<p key={index} >👤 {player}</p>))}
            </Grid>
        </div>
    );

};

export default Lobby;