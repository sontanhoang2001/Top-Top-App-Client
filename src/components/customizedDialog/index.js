import React, { forwardRef, memo, useEffect, useState } from 'react';

import ShareSocialList from '../shareSocialNetwork';
// mui
import { createTheme, ThemeProvider } from '@mui/material/styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import { closeDialog, selectDialogStatus, selectDialogName } from './dialogSlice'
import { selectTotalComment } from '../comment/commentSlice';

import Comment from '../comment';
import OptionVideo from './optionVideo';
import DeleteVideo from './deleteVideo';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(0 0 0 / 15%)"
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '20px 0px !important'
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "12px 12px 0 0 !important",
                    verticalAlign: "bottom !important",
                    margin: "0px !important",
                    maxWidth: "none !important",
                    width: "100% !important"
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "600"
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    flexDirection: "column"
                }
            }
        }
    }
})

const themeOptionVideo = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    width: '40ch !important'
                },
            },
        }
    }
})

function CustomizedDialog() {
    const dispatch = useDispatch();
    const dialogStatus = useSelector(selectDialogStatus);
    const dialogName = useSelector(selectDialogName);
    const totalComment = useSelector(selectTotalComment);

    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };


    switch (dialogName) {
        case 'comment': {
            return (
                <ThemeProvider theme={theme}>
                    <Dialog
                        open={dialogStatus}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDialog}
                        aria-labelledby="draggable-dialog-title"
                        fullWidth={true}
                        maxWidth={false}
                        scroll='body'
                    >
                        <DialogTitle>{totalComment === 0 ? ("Chưa có bình luận nào cho video này") : (`${totalComment} bình luận`)}</DialogTitle>
                        <DialogContent>
                            <Comment />
                        </DialogContent>
                    </Dialog>
                </ThemeProvider>
            );
        }
        case 'commentLock': {
            return (
                <ThemeProvider theme={theme}>
                    <Dialog
                        open={dialogStatus}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDialog}
                        aria-labelledby="draggable-dialog-title"
                        fullWidth={true}
                        maxWidth={false}
                        scroll='body'
                    >
                        <DialogTitle>Bình luận</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ padding: '1rem', color: 'var(--primary-btn-color)', textAlign: 'center' }}>
                                Người dùng đã tạm khóa tính năng bình luận video này!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Đóng</Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            );
        }
        case 'share':
            {
                return (
                    <ThemeProvider theme={theme}>
                        <Dialog
                            open={dialogStatus}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-labelledby="draggable-dialog-title"
                            fullWidth={true}
                            maxWidth={false}
                            scroll='body'
                        >
                            <DialogTitle>Chia sẻ với</DialogTitle>
                            <DialogContent>
                                <ShareSocialList />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Hủy</Button>
                            </DialogActions>
                        </Dialog>
                    </ThemeProvider>
                );
            }
        case 'optionVideo':
            {
                return (
                    <ThemeProvider theme={themeOptionVideo}>
                        <Dialog
                            open={dialogStatus}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-labelledby="draggable-dialog-title"
                            fullWidth={true}
                            maxWidth={false}
                            scroll='body'
                        >
                            <OptionVideo />
                        </Dialog>
                    </ThemeProvider>
                );
            }
            case 'deleteVideo':
            {
                return (
                    <ThemeProvider theme={themeOptionVideo}>
                        <Dialog
                            open={dialogStatus}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-labelledby="draggable-dialog-title"
                            fullWidth={true}
                            maxWidth={false}
                            scroll='body'
                        >
                            <DeleteVideo />
                        </Dialog>
                    </ThemeProvider>
                );
            }
        default: <></>
    }
}
export default memo(CustomizedDialog);
