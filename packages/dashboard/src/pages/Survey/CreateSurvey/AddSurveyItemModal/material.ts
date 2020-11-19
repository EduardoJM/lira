import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: 120,
    },
    content: {
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    footer: {
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    appBar: {
        position: 'relative',
    },
    appBarTitle: {
        flex: 1,
    },
}));

export default useStyles;
