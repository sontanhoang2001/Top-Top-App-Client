// redux
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, selectVideoId, selectDialogStatus, selectDialogName } from '~/components/customizedDialog/dialogSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { selectEnableComment, selectProfessed } from "~/page/VideoProfile/videoProfileSlice";


import { Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

// api
import videoApi from '~/api/video';

function SettingFormVideo() {
    const dispatch = useDispatch();
    const videoId = useSelector(selectVideoId);
    const enableCommentBefor = useSelector(selectEnableComment);
    const professedBefor = useSelector(selectProfessed);

    const [isloaded, setIsloaded] = useState();
    const [enableComment, setEnableComment] = useState();
    const [professed, setProfessed] = useState();

    useEffect(() => {
        setEnableComment(enableCommentBefor);
        setProfessed(professedBefor);
        setIsloaded(true);
    }, [enableCommentBefor, professedBefor])

    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };

    const handleUpdateVideo = () => {
        if (enableComment !== enableCommentBefor || professed !== professedBefor) {
            const data = {
                "enableComment": enableComment,
                "professed": professed
            };
            videoApi.updateVideo(videoId, data)
                .then(res => {
                    const snackBarPayload = { type: 'success', message: 'Cập nhật thành công!' };
                    dispatch(openSnackbar(snackBarPayload))
                    dispatch(closeDialog());
                })
                .catch(error => {
                    console.log(error)
                    const snackBarPayload = { type: 'error', message: 'Cập nhật thất bại!' };
                    dispatch(openSnackbar(snackBarPayload))
                    dispatch(closeDialog());
                })
        }
    };

    if (isloaded)
        return (<>
            <DialogTitle>Cập nhật quyền cho video</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormControlLabel onChange={(e) => setEnableComment(e.target.checked)} control={<Checkbox checked={enableComment} />} label="Cho phép bình luận video" />
                </FormGroup>
                <FormControl sx={{ width: '26ch', marginTop: '1rem' }}>
                    <InputLabel id="professed">Ai có thể xem video này</InputLabel>
                    <Select
                        labelId="professed"
                        label="Ai có thể xem video này"
                        name='professed'
                        value={professed}
                        onChange={(e) => { setProfessed(e.target.value) }}
                    >
                        <MenuItem value={true}>Công khai</MenuItem>
                        <MenuItem value={false}>Riêng Tư</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Hủy</Button>
                <Button onClick={handleUpdateVideo}>Lưu</Button>
            </DialogActions>
        </>);
}

export default SettingFormVideo;