import styles from './message.css';
import classNames from 'classnames/bind';

import { memo, useRef, useState } from "react";
import { Avatar, CardHeader, Chip, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled, Box } from '@mui/material';
import { urlFromDriveUrl } from '~/shared/helper';

const cx = classNames.bind(styles);

const theme = createTheme({
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                },
            },
        },
    }
})


function Message({ avatarUrl, message, direction }) {

    var messageRender = <></>;

    if (message) {
        let position = message.search("https://drive.google.com");
        if (position == -1) {
            messageRender = (<div className={cx('message')}>{message}</div>);
        } else {
            messageRender = (<img className={cx('messageImage')} src={urlFromDriveUrl(message)} />)
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {direction == "left" ? (
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: "2rem", height: '2rem' }} aria-label="recipe" src={avatarUrl}></Avatar>
                            }
                            subheader={messageRender}
                        />
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        {messageRender}
                    </Box>
                )}

            </ThemeProvider>
        </>);
}

export default memo(Message);

{/* {watched && (
                                <Typography variant="caption" sx={{ marginTop: "1em" }}>Đã xem</Typography>
                            )} */}