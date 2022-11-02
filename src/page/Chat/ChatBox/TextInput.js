import { createTheme, useTheme } from "@mui/material/styles";
import { Send } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';

export const TextInput = () => {
    const theme = useTheme();

    const useStyles = createTheme({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    });

    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="メッセージを入力"
                    className={classes.wrapText}
                //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    <Send />
                </Button>
            </form>
        </>
    )
}
