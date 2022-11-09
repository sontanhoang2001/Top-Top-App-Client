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

function Message({ avatarUrl, message, direction, watched }) {

    return (
        <>
            <ThemeProvider theme={theme}>
                {direction == "left" ? (
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: "2rem", height: '2rem' }} aria-label="recipe" src={avatarUrl}></Avatar>
                            }
                            subheader={(<Chip label={message} component="a" href="#basic-chip" />)}
                        />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <Chip label={message} component="p" />
                            {watched && (
                                <Typography variant="caption" sx={{ marginTop: "1em" }}>Đã xem</Typography>
                            )}
                        </Box>
                    </>
                )}


            </ThemeProvider>
        </>);
}

export default memo(Message);