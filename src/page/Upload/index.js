import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Card, CardContent, TextField, Button, Grid, FormControl, Select, MenuItem, InputLabel, Chip, Avatar, Typography, Box, FormGroup, FormControlLabel, Checkbox, DialogContent, DialogTitle, DialogContentText, DialogActions, Dialog } from '@mui/material';
import { LibraryMusic, CloudUpload, Save } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import NavBar from '~/components/Layout/NavBarHeader'
import { FormProvider, RHFTextField } from '~/components/hook-form';

// redux
import { useDispatch } from 'react-redux';
import { setDirection } from '~/router/routerPathSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

// api
import mediaApi from '~/api/media';
import videoApi from '~/api/video';

// auth provider
import { UserAuth } from '~/context/AuthContext';
import { Container } from '@mui/system';

// helper
import { urlFromDriveUrl } from '~/shared/helper';

// ----------------------------------------------------------------------

export default function UploadVideoForm() {
    const dispatch = useDispatch();
    const { user } = UserAuth();
    const userId = user.id;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviewVideo, setReviewVideo] = useState();
    const [professed, setProfessed] = useState(true);

    const UploadSchema = Yup.object().shape({
        title: Yup.string()
            .max(80, 'Tên tối đa 80 ký tự!')
            .required('Bạn chưa nhập tiêu đề!'),
        hashTag: Yup.string("Hash Tag bạn vừa nhập chưa đúng định dạng!")
    });

    const defaultValues = {
        title: '',
        videoUrl: null,
        music: '',
        enableComment: true,
        hashTag: '',
        professed: true
    };

    const methods = useForm({
        resolver: yupResolver(UploadSchema),
        defaultValues,
    });

    const {
        handleSubmit
    } = methods;

    const onSubmit = async (data) => {
        uploadVideo(data);
    }

    const handleReviewVideo = (e) => {
        var filePath = URL.createObjectURL(e.target.files[0]);
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadUserVideo" }; //preapre info to send to API

            methods.setValue("videoUrl", dataSend);
            setReviewVideo(filePath);
        }
    }

    const uploadVideo = (data) => {
        if (data.videoUrl === null) {
            const snackBarPayload = { type: 'error', message: 'Bạn chưa tải video!', duration: 5000 };
            dispatch(openSnackbar(snackBarPayload))
            setIsSubmitting(false);
        } else {
            setIsSubmitting(true);
            const dataVideoUrl = data.videoUrl;
            mediaApi.uploadVideo(dataVideoUrl)
                .then(res => res.json())
                .then((res) => {
                    console.log(res.url) //See response

                    const videoUrl = urlFromDriveUrl(res.url);
                    if (videoUrl !== "") {
                        // lọc dữ liệu trước khi gửi lên
                        // console.log("upload video...", data)

                        const hashTag = data.hashTag.split(" ").join('').split("#");

                        const dataVideo = {
                            title: data.title,
                            videoUrl: videoUrl,
                            music: data.music,
                            enableComment: true,
                            userid: userId,
                            hashTag: hashTag,
                            professed: methods.getValues("professed")
                        };

                        console.log("dataVideo: ", dataVideo)

                        // // gọi tiếp method post db lên database
                        createVideoInfo(dataVideo);
                    }
                }).catch(e => console.log(e)) // Or Error in console
        }
    }

    const createVideoInfo = async (dataVideo) => {
        await videoApi.createVideo(dataVideo)
            .then(() => {
                resetForm();
                const snackBarPayload = { type: 'success', message: 'Bạn đã tải video thành công!', duration: 10000 };
                dispatch(openSnackbar(snackBarPayload))
            })
            .catch(error => {
                console.log(error);
                const snackBarPayload = { type: 'error', message: 'Bạn đã tải video thất bại!' };
                dispatch(openSnackbar(snackBarPayload))
            });
        setIsSubmitting(false);
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetForm = () => {
        setReviewVideo("");
        methods.resetField("title");
        methods.resetField("videoUrl");
        methods.resetField("music");
        methods.resetField("enableComment");
        methods.resetField("hashTag");
        methods.setValue("professed", true);
    }

    return (
        <>
            <NavBar namePage='Đăng Video mới' />

            <div className='container__center'>
                <Card sx={{ marginLeft: '1rem', marginRight: '1rem', marginTop: '5rem', marginBottom: '1rem' }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={3}>
                                        {reviewVideo && (
                                            <video src={reviewVideo} height={450} autoPlay controls loop />
                                        )}

                                        {reviewVideo || (
                                            <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ height: '450px' }}>
                                                Tải video lên
                                                <input hidden type="file" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleReviewVideo(e)} />
                                            </Button>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Stack spacing={3}>
                                        <RHFTextField name="title" label="Tiêu đề video" />
                                        <RHFTextField
                                            name='hashTag'
                                            label="Hash tag"
                                            sx={{ m: 1 }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                            }}
                                        />

                                        <Button variant="outlined" startIcon={<LibraryMusic />} sx={{ m: 1, width: '36ch' }} onClick={handleClickOpen}>
                                            Chọn âm nhạc cho video
                                        </Button>

                                        <Box>
                                            <InputLabel id="demo-simple-select-label">Âm nhạc cho video</InputLabel>

                                            <Chip avatar={<Avatar>M</Avatar>} label="Đã có anh ở đây rồi - Chi Dân" sx={{ padding: '1rem' }} variant="outlined" />
                                        </Box>
                                        <FormGroup>
                                            <FormControlLabel onChange={(e) => methods.setValue("enableComment", e.target.checked)} control={<Checkbox defaultChecked />} label="Cho phép bình luận video" />
                                        </FormGroup>
                                        <FormControl fullWidth sx={{ width: '26ch' }}>
                                            <InputLabel id="professed">Ai có thể xem video này</InputLabel>
                                            <Select
                                                labelId="professed"
                                                label="Ai có thể xem video này"
                                                name='professed'
                                                value={professed}
                                                onChange={(e) => { methods.setValue("professed", e.target.value); setProfessed(e.target.value) }}
                                            >
                                                <MenuItem value={true}>Công khai</MenuItem>
                                                <MenuItem value={false}>Riêng Tư</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Stack spacing={2} direction="row" mt={3}>
                                        <Button size="large" variant="outlined" disabled={isSubmitting} onClick={resetForm}>
                                            Hủy bỏ
                                        </Button >

                                        <LoadingButton
                                            loading={isSubmitting}
                                            loadingPosition="start"
                                            startIcon={<Save />}
                                            variant="contained"
                                            size="large" type="submit"
                                        >
                                            Đăng Video
                                        </LoadingButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </FormProvider>
                </Card>
            </div>



            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}