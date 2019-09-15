import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import config from '../config.json';
const server = config.serverLocation;


function Signin(props) {

    const [value, setValue] = useState("Jogador");
    const [nameValid, setValidity] = useState(true);


    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(server + '/signup', {
            method: 'POST',
            body: JSON.stringify({ username: value }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    props.setInitSocket(value);
                    setValidity(true);
                    props.controlState("lobby");
                } else
                    setValidity(false);
            })
            .catch(err => { setValidity(false); console.log(err) });
    }

    var textField;

    if (nameValid)
        textField = <TextField
            id="username"
            label="Nome"
            value={value}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
        />
    else
        textField = <TextField
            error
            id="username"
            label="Nome"
            value={value}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Username já registado"
        />


    return (

        <div id="signin">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <form onSubmit={handleSubmit}>
                    <Grid>
                        {textField}
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            value="Submit"
                            fullWidth
                        >
                            Jogar
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );

};

export default Signin;