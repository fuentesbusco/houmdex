import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Detail = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='md'
            fullWidth={true}
        >
            { props.item && 
                <DialogTitle id="alert-dialog-title">
                    <Typography className={props.classes.cardTitle}>{props.item.name}</Typography>                            
                    <Typography className={props.classes.cardSubheader} variant="body2" color="textSecondary" component="p">{props.item.hp}</Typography>
                </DialogTitle> 
            }
            <DialogContent dividers>
            <DialogContentText id="alert-dialog-description" component="div">
                <Grid container justify="center">
                    { props.item && props.item.sprites &&
                    <Grid item xs={12} md={6} lg={6} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                        <img src={
                                props.item && props.item.sprites && props.item.sprites.other && props.item.sprites.other.dream_world.front_default !== null
                                    ? props.item.sprites.other.dream_world.front_default
                                    : props.item.sprites.other.["official-artwork"].front_default
                            }
                            style={{ maxWidth: '250px' }}
                            alt={`${props.item.name}`}
                        />
                    </Grid>
                    }
                    <Grid item xs={12} md={6} lg={6}>
                        <List>
                            <ListItem style={{ padding: 0 }}>
                                <ListItemText primary={`${props.item.base_experience} exp`} secondary="Base Experience" />
                            </ListItem>
                            <ListItem style={{ padding: 0 }}>
                                <ListItemText primary={`${props.item.height} in`} secondary="Height" />
                            </ListItem>
                            <ListItem style={{ padding: 0 }}>
                                <ListItemText primary={
                                    props.item && props.item.types &&
                                        props.item.types.join(", ")
                                    } secondary="Types" />
                            </ListItem>
                            <ListItem style={{ padding: 0 }}>
                                <ListItemText primary={
                                    props.item && props.item.abilities &&
                                        props.item.abilities.join(", ")
                                    } secondary="Abilities" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button size="small" onClick={props.handleClose} color="primary" autoFocus className={props.classes.button}>
                Close
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Detail;