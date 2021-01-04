import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Error = props => {
    return (
        <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', height: "100vh", backgroundSize: 'cover' }}
        >
            <Grid item xs={12}>
                <Typography style={{ textAlign: 'center', color: 'white', fontSize: '2.8em' }}>Error</Typography>
            </Grid>   
        </Grid>
    );
}

export default Error;
