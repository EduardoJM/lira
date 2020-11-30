import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
    },
    box: {
        padding: 20,
        width: '90%',
        maxWidth: 400,
    },
    boxTitle: {
        marginBottom: 10,
    },
    boxForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    input: {
        marginBottom: 20,
    },
    formSubmitRow: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default useStyles;
