import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2, 4, 3),
        width:'500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
            margin: theme.spacing(1),
            width: '25ch',
    },

}))

