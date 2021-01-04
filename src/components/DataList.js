import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

const DataList = props => {
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card className={props.classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="pokemon" className={props.classes.avatar} src={props.item.default_type_icon} title={props.item.default_type} />
                    }
                    title={props.item.name}
                    subheader={props.item.hp}
                    classes={{
                        title: props.classes.cardTitle,
                        subheader: props.classes.cardSubheader,
                    }} 
                />
                <CardMedia
                className={props.classes.media}
                image={
                    props.item.sprites.other.dream_world.front_default !== null
                        ? props.item.sprites.other.dream_world.front_default
                        : props.item.sprites.other.["official-artwork"].front_default
                }
                title={props.item.name}
                />
                <CardContent>
                
                <Typography variant="body2" color="textSecondary" component="p">{props.item.types.join(", ")}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" className={props.classes.button} onClick={() => props.clickDetailsHandler(props.item)}>
                        Details
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default DataList;