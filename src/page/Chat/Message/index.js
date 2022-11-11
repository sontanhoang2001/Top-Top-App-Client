import { Avatar, CardHeader, Chip, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled, Box } from '@mui/material';
import { memo } from "react";

const theme = createTheme({
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    maxWidth: "48%"
                },
            },
        },
    }
})

const myMessage = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    backgroundColor: 'rgb(32 101 209)',
                },
            }
        },
    }
});

function Message({ avatarUrl, message, direction }) {

    return (
        <>
            <ThemeProvider theme={theme}>
                {direction == "left" ? (
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: "2rem", height: '2rem' }} aria-label="recipe" src={avatarUrl}></Avatar>
                            }
                            subheader={(<Chip label={<Typography variant="subtitle1">{message}</Typography>} component="p" />)}
                        />
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <ThemeProvider theme={myMessage}>
                            <Chip label={<Typography variant="subtitle1">{message}</Typography>} component="p" />
                        </ThemeProvider>
                    </Box>
                )}


            </ThemeProvider>
        </>);
}

export default memo(Message);

{/* {watched && (
                                <Typography variant="caption" sx={{ marginTop: "1em" }}>Đã xem</Typography>
                            )} */}