import React from 'react';
import {Card, CardMedia, CardContent, Typography} from "@material-ui/core";

import useStyles from './styles';

function Book(props) {
    const classes = useStyles();
    const image = `/${props.data.image_path}`;

    return(
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={image} title={props.data.title}/>

            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {props.data.title}
                    </Typography>
                </div>

            </CardContent>
        </Card>
    );
}

export default Book;
