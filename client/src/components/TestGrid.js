import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function buttonClick(event) {

}

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={true}>
                    <ListItem button onclick={buttonClick}>Monday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Tuesday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Wednesday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Thursday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Friday</ListItem>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Monday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Tuesday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Wednesday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Thursday</ListItem>
                </Grid>
                <Grid item xs={true}>
                    <ListItem className={classes.paper}>Friday</ListItem>
                </Grid>
            </Grid>
        </div>
    );
}
