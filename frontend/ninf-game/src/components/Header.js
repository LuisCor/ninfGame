import React from 'react';
import Grid from '@material-ui/core/Grid';
import logo from '../images/ninfQuiz.png';

function Header(props) {

    return (

        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <img
                    src={logo}
                    style={{
                        minHeight:"150px",
                        maxHeight:"25vh",
                        minWidth:"150px",
                        maxWidth:"25vh"

                    }}
                />
            </Grid>
        </div>

    );

};

export default Header;