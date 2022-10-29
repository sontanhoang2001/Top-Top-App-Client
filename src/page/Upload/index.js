import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Card, CardContent, TextField, Button, Grid, FormControl, Select, MenuItem, InputLabel, Chip, Avatar, Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LibraryMusic, CloudUpload } from '@mui/icons-material';
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

// ----------------------------------------------------------------------

export default function UploadVideoForm() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const UploadSchema = Yup.object().shape({
        title: Yup.string()
            .min(8, 'Tên của bạn phải ít nhất 5 ký tự!')
            .max(30, 'Tên tối đa 30 ký tự!')
            .required('Bạn chưa nhập tiêu đề!'),
        hashTag: Yup.string("Hash Tag bạn vừa nhập chưa đúng định dạng!")
    });

    const defaultValues = {
        title: '',
        videoUrl: '',
        music: '',
        enableComment: '',
        hashTag: ''
    };

    const methods = useForm({
        resolver: yupResolver(UploadSchema),
        defaultValues,
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        console.log("upload video...")
        setIsSubmitting(false);


        // await accountApi.register(dataRegister)
        //   .then(res => {
        //     const userId = res.data.id;
        //     setUserTempId(userId);

        //     const snackBarPayload = { type: 'success', message: 'Bạn đã đăng ký tài khoản thành công!', duration: 10000 };
        //     dispatch(openSnackbar(snackBarPayload))

        //     dispatch(setDirection({ direction: '/' }));
        //     navigate('/otp');
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     const snackBarPayload = { type: 'error', message: 'Đã gặp sự cố!' };
        //     dispatch(openSnackbar(snackBarPayload))
        //   });
    }

    const [reviewVideo, setReviewVideo] = useState();

    const uploadVideo = (e) => {
        var filePath = URL.createObjectURL(e.target.files[0]);
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API

            console.log("review video: ", filePath)
            setReviewVideo(filePath);
            // mediaApi.uploadVideo(dataSend)
            //     .then(res => res.json())
            //     .then((a) => {
            //         console.log(a) //See response
            //     }).catch(e => console.log(e)) // Or Error in console
        }
    }

    // https://drive.google.com/uc?export=download&id=11t80AH_PK8JJSxWMjPDll4cCNsDRcrVT
    return (
        <>
            <NavBar namePage='Đăng Video mới' />

            <Card sx={{ marginLeft: '1rem', marginRight: '1rem', marginTop: '5rem', marginBottom: '1rem' }}>
                <CardContent>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={3}>
                                    {reviewVideo && (
                                        <video src={reviewVideo} height={400} autoPlay controls loop />
                                    )}

                                    {reviewVideo || (
                                        <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ paddingBottom: '100%' }}>
                                            Tải video lên
                                            <input hidden type="file" accept="application/video" onChange={(e) => uploadVideo(e)} />
                                        </Button>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    <TextField
                                        name='title'
                                        label="Tiêu đề video" id="outlined-start-adornment"
                                        sx={{ m: 1 }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                        }}
                                    />
                                    <RHFTextField name="hashTag" label="Hash tag" />

                                    <Button variant="outlined" startIcon={<LibraryMusic />} sx={{ m: 1, width: '36ch' }}>
                                        Chọn âm nhạc cho video
                                    </Button>

                                    <Box>
                                        <InputLabel id="demo-simple-select-label">Âm nhạc cho video</InputLabel>

                                        <Chip avatar={<Avatar>M</Avatar>} label="Đã có anh ở đây rồi - Chi Dân" sx={{ padding: '1rem' }} variant="outlined" />
                                    </Box>
                                    <FormGroup>
                                        <FormControlLabel name='enableComment' control={<Checkbox defaultChecked />} label="Cho phép bình luận video" />
                                    </FormGroup>
                                    <FormControl fullWidth sx={{ width: '26ch' }}>
                                        <InputLabel id="demo-simple-select-label">Ai có thể xem video này</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={1}
                                            label="Ai có thể xem video này"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Công khai</MenuItem>
                                            <MenuItem value={2}>Riêng Tư</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2} direction="row" mt={3}>
                                    <Button size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ width: '26ch' }}>
                                        Hủy bỏ
                                    </Button >
                                    <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ width: '26ch' }}>
                                        Đăng Video
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </CardContent>
            </Card>
        </>

    );
}
