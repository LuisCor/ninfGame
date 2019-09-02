import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function Signin(props) {

    const [value, setValue] = useState("Jogador");


    const handleChange = (event) => {
        setValue(event.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/signup', {
            method: 'POST',
            body: JSON.stringify({ username: value }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            if (resp.ok) {
                props.controlState("lobby");
            }
        })
        .catch(err => {/* catch the error here */ });
    }


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
                        <TextField
                            id="username"
                            label="Nome"
                            value={value}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
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