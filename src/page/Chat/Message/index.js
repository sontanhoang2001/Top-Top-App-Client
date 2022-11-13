import styles from './message.css';
import classNames from 'classnames/bind';

import { memo, useCallback, useState } from "react";
import { Avatar, CardHeader, Typography } from "@mui/material";
import { createTheme, ThemeProvider, Box } from '@mui/material';
import { urlFromDriveUrl, formatDate } from '~/shared/helper';

// redux
import { useDispatch } from 'react-redux';
import { imageViewer, setListImageViewer } from '../chatSlice';

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


function Message({ index, avatarUrl, message, direction, createdDate }) {
    const dispatch = useDispatch();

    var messageRender = <></>;

    if (message) {
        let position = message.search("https://drive.google.com");

        if (position == -1) {
            messageRender = (<div className={cx('message')}>{message}</div>);
        } else {
            const payload = { listImagesViewer: urlFromDriveUrl(message) };
            dispatch(setListImageViewer(payload));
            messageRender = (<img key={index} className={cx('messageImage')} src={urlFromDriveUrl(message)} onClick={() => openImageViewer(index)} />)
        }
    }

    // if(createdDate) {
    //     // const d = new Date();
    //     // console.log("d: ", d)

    //     const d = new Date(createdDate)
    //     console.log("createdDate: ", d.getFullYear);

    // }

    // image viewer
    const openImageViewer = useCallback((index) => {
        const payload = { currentImage: index, isViewerOpen: true };
        dispatch(imageViewer(payload))
    }, []);

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
                        <Typography variant="caption" sx={{ marginTop: "1em" }}>{createdDate}</Typography>
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        {messageRender}
                        <Typography variant="caption" sx={{ marginTop: "1em" }}>{createdDate}</Typography>
                    </Box>
                )}

            </ThemeProvider>
        </>);
}

export default memo(Message);

{/* {watched && (
                                <Typography variant="caption" sx={{ marginTop: "1em" }}>Đã xem</Typography>
                            )} */}