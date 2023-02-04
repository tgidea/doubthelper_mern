import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export default makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
    },
    fileInput: {        
        margin: '10px 0',
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addOptionButton: {
        maxWidth: '600px',
        marginTop: theme.spacing(1),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
    submitButton: {
        maxWidth: '600px',
        marginTop: theme.spacing(2),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}));