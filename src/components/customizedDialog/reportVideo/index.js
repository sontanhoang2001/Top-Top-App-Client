// redux
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, selectVideoId } from '~/components/customizedDialog/dialogSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// api
import videoApi from '~/api/video';
import { useNavigate } from 'react-router-dom';

// provider
import { UserAuth } from '~/context/AuthContext';
import { useEffect, useState } from 'react';

function ReportVideo() {
    const dispatch = useDispatch();
    const videoId = useSelector(selectVideoId);
    const navigate = useNavigate();
    const { user } = UserAuth();

    const [reportVideo, setReportVideo] = useState();
    const [allReportType, setAllReportType] = useState();


    useEffect(() => {
        videoApi.loadReportVideoType()
            .then((res) => {
                setAllReportType(res.data);
            })
            .catch(error => console.log(error))
    }, [])

    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };

    const handleReportVideo = () => {
        const data = {
            "typeId": reportVideo,
            "userId": user.id,
            "videoId": videoId
        };

        videoApi.createReportVideo(data)
            .then(() => {
                const snackBarPayload = { type: 'success', message: 'Chúng tôi đã ghi nhận báo cáo của bạn!' };
                dispatch(openSnackbar(snackBarPayload))
            })
            .catch(error => {
                console.log(error)
                const snackBarPayload = { type: 'error', message: 'Gửi thông báo thất bại!' };
                dispatch(openSnackbar(snackBarPayload))
            })
        dispatch(closeDialog());
    };

    return (<>
        <DialogTitle>Báo cáo vi phạm nội dung video</DialogTitle>
        <DialogContent>
            <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                <InputLabel id="reportVideo">Nội dung báo cáo</InputLabel>
                <Select
                    labelId="reportVideo"
                    label="Nội dung báo cáo"
                    name='reportVideo'
                    value={reportVideo}
                    onChange={(e) => { setReportVideo(e.target.value) }}
                >
                    {allReportType && allReportType.map(({ id, description }) => (
                        <MenuItem value={id}>{description}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleReportVideo}>Gửi báo cáo</Button>
        </DialogActions>
    </>);
}

export default ReportVideo;