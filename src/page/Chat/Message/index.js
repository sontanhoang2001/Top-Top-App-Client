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

function Message({ message, direction, watched }) {

    return (
        <>
            <ThemeProvider theme={theme}>
                {direction == "left" ? (
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: "2rem", height: '2rem' }} aria-label="recipe" src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/292390027_1755321011483231_2634012541279686139_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=90sm5X0Bn54AX8_iz2n&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfAtFbJA6eqwNOWUkCyNkxfh6joDKI0pXPPEqlv-RwARBw&oe=636C6A80">
                                    R
                                </Avatar>
                            }
                            subheader={(<Chip label={message} component="a" href="#basic-chip" />)}
                        />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <Chip label={message} component="a" href="#basic-chip" />
                            {watched && (
                            <Typography variant="caption" sx={{marginTop: "1em"}}>Đã xem</Typography>
                            )}
                        </Box>
                    </>
                )}


            </ThemeProvider>
        </>);
}

export default memo(Message);