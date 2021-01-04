import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Home from './components/Home';
import Error from './components/Error';

const useStyles = makeStyles({
  root: {
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
  }
});

function App() {
  const classes = useStyles();

  return (
    <Router>
            <AppBar position="static" style={{ backgroundColor: '#ff5000' }}>
                <Toolbar>
                <Typography variant="h6">
                        Houmdex
                </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" disableGutters={false} className={classes.root}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route component={Error}/>
                </Switch>
            </Container>
        </Router >
  );
}

export default App;
