// redux
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, selectVideoId } from '~/components/customizedDialog/dialogSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// api
import videoApi from '~/api/video';
import { useNavigate } from 'react-router-dom';

// provider
import { UserAuth } from '~/context/AuthContext';

function DeleteVideo() {
    const dispatch = useDispatch();
    const videoId = useSelector(selectVideoId);
    const navigate = useNavigate();
    const { user } = UserAuth();

    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };

    const handleDeleteVideo = () => {
        videoApi.deleteVideo(videoId)
            .then(() => {
                const snackBarPayload = { type: 'success', message: 'Bạn đã xóa video thành công!' };
                dispatch(openSnackbar(snackBarPayload))
                navigate(`/@${user.alias}`);
            })
            .catch(error => {
                console.log(error)
                const snackBarPayload = { type: 'error', message: 'Bạn đã xóa video thất bại!' };
                dispatch(openSnackbar(snackBarPayload))
            })
        dispatch(closeDialog());
    };

    return (<>
        <DialogTitle>Bạn có thật sự muốn xóa video này không ?</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Khi nhấn "Xóa video" Video của bạn sẽ bị xóa vĩnh viễn và không thể khôi phục.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleDeleteVideo}>Xoá video</Button>
        </DialogActions>
    </>);
}

export default DeleteVideo;