
import { useEffect, useState } from 'react';


// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


// material
import {
    styled,
    Paper,
    Card,
    Stack,
    Avatar,
    Container,
    Typography,
    Box,
    CardHeader,
    CardContent,
    Grid,
    ImageList,
    ImageListItem,
    Divider,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    TextField,
    DialogActions,
    InputAdornment,
    Badge,
    IconButton,
    LinearProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import propTypes from 'prop-types';
import { EmailOutlined, ArticleOutlined, Edit, Save, CameraAltRounded } from '@mui/icons-material';

import { red } from '@mui/material/colors';


// component
import NavBar from '~/components/Layout/NavBarHeader'
import { FormProvider, RHFTextField } from '~/components/hook-form';

// api
import profileApi from '~/api/profile'


// redux
import { useDispatch } from 'react-redux';
import { openSnackbar } from '~/components/customizedSnackbars/snackbarSlice';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// api
import mediaApi from '~/api/media';

import useResponsive from '~/hooks/useResponsive';

// helper
import { urlFromDriveUrl } from '~/shared/helper'

// image
import userDefaultImg from '~/assets/image/user-profile-default.png'
import { Link, useParams } from 'react-router-dom';
import Loading from '~/components/Layout/Loading';
// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode !== 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const itemData = [{
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
}]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: propTypes.node,
    index: propTypes.number.isRequired,
    value: propTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Profile() {
    const dispatch = useDispatch();
    const { userAlias } = useParams();
    const { user, loginStatus, logOut } = UserAuth();

    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const [userProfile, setUserProfile] = useState();
    const [isLoad, setIsLoad] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);


    const profileSchema = Yup.object().shape({
        fullName: Yup.string()
            .max(40, 'Tên tối đa 40 ký tự!')
            .required('Bạn chưa nhập tên!'),
        alias: Yup.string()
            .max(15, 'TopTop ID tối đa 15 ký tự!')
            .required('Bạn chưa nhập TopTop ID!'),
    });

    const defaultValues = {
        id: "",
        fullName: "",
        avatar: "",
        history: "",
        alias: ""
    };

    const methods = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues,
    });

    const {
        handleSubmit
    } = methods;


    useEffect(() => {
        if (userAlias) {
            profileApi.getProfileByAlias(userAlias)
                .then(res => {
                    setUserProfile(res.data);
                    setIsLoad(true);

                    setFormState(res.data.id, res.data.fullName, res.data.avatar, res.data.history, res.data.alias);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [userAlias])


    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const [imageListCol, setImageListCol] = useState();

    useEffect(() => {
        if (smUp) {
            setImageListCol(3);
        } else {
            setImageListCol(2);
        }
    })

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);

    const setFormState = (id, fullName, avatar, history, alias) => {
        methods.setValue("id", id);
        methods.setValue("fullName", fullName);
        methods.setValue("avatar", avatar);
        methods.setValue("history", history === null ? "" : history);
        methods.setValue("alias", alias);
    }

    const handleClickOpen = () => {
        setFormState(userProfile.id, userProfile.fullName, userProfile.avatar, userProfile.history, userProfile.alias);
        setOpen(true);
    };

    const handleClose = () => {
        setBtnSubmitLoading(false);
        setUploadedImage(false);
        setOpen(false);
    };

    // handle change event of input file
    const onChangeFile = async (e) => {
        setBtnSubmitLoading(true);
        setUploadedImage(true);

        var filePath = URL.createObjectURL(e.target.files[0]);
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadUserAvatar" }; //preapre info to send to API

            mediaApi.uploadUserAvatar(dataSend)
                .then(res => res.json())
                .then((res) => {
                    console.log("res upload avatar: ", urlFromDriveUrl(res.url))
                    methods.setValue("avatar", urlFromDriveUrl(res.url))
                    setBtnSubmitLoading(false);
                    setUploadedImage(false);
                })
                .catch((error) => {
                    setBtnSubmitLoading(false);
                    setUploadedImage(false);
                    console.error(error)
                    const snackBarPayload = { type: 'error', message: 'Tải avatar không thành công!' };
                    dispatch(openSnackbar(snackBarPayload))
                });
        }



    };

    const onSubmit = async (data) => {
        // check nếu thay đổi thì cho update
        const history = methods.getValues("history") === "" ? null : methods.getValues("history");
        if (userProfile.fullName !== methods.getValues("fullName") || userProfile.alias !== methods.getValues("alias") || userProfile.history !== history) {
            console.log("submit profile: ", data);

            // check TopTop ID
            profileApi.findByAlias(methods.getValues("alias"))
                .then((res) => {
                    if (res.data.result == true) {
                        updateProfile();
                    } else {
                        const snackBarPayload = { type: 'error', message: 'TopTop ID vừa nhập đã tồn tại. Vui lòng thử lại!' };
                        dispatch(openSnackbar(snackBarPayload))
                        setBtnSubmitLoading(false);
                        setUploadedImage(false);
                    }
                })
                .catch((error) => {
                    setBtnSubmitLoading(false);
                    setUploadedImage(false);
                    console.error(error)
                });
            // khi update thanh cong update lai user Profile
        } else {
            console.log("ko thay doi: ");
        }

        // uploadVideo(data);

        // const snackBarPayload = { type: 'error', message: 'Tải avatar không thành công!' };
        // dispatch(openSnackbar(snackBarPayload))
    }


    const updateProfile = async (data) => {
        // check TopTop ID
        profileApi.findByAlias(methods.getValues("alias"))
            .then((res) => {
                
                const snackBarPayload = { type: 'success', message: 'Cập nhật thông tin thành công!' };
                dispatch(openSnackbar(snackBarPayload))
            })
            .catch((error) => {
                setBtnSubmitLoading(false);
                setUploadedImage(false);
                console.error(error)

                const snackBarPayload = { type: 'error', message: 'Cập nhật thông tin thất bại. Vui lòng thử lại!' };
                dispatch(openSnackbar(snackBarPayload))
            });
    }
    if (isLoad) {
        return (
            <>
                <NavBar namePage='Thông tin cá nhân' />
                <Card>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500], width: 66, height: 66 }} aria-label="recipe" src={userProfile.avatar} >
                                    {userProfile.fullName[0]}
                                </Avatar>
                            }
                            title={userProfile.fullName}
                            subheader={'@' + userProfile.alias}
                        />

                        <Box sx={{ m: 3 }}>
                            <Box mb={2}>
                                {user.alias === userProfile.alias ? (
                                    <Button variant="outlined" sx={{ margin: '5px' }} onClick={handleClickOpen}><Edit /> Chỉnh sửa hồ sơ</Button>
                                ) : (
                                    <>
                                        <Button variant="contained" sx={{ margin: '5px' }}>Theo dõi</Button>
                                        <Button variant="outlined" sx={{ margin: '5px' }}>Nhắn tin</Button>
                                    </>
                                )}
                            </Box>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom: '0.6rem',
                                marginRight: '1rem'
                            }}>
                                <EmailOutlined sx={{ mr: 1 }} /> <Typography>Email: </Typography>
                                <Typography sx={{ ml: 1 }} color="text.secondary">{userProfile.email}</Typography>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom: '0.6rem',
                                marginRight: '1rem'
                            }}>
                                <Typography color="text.secondary">Đang follow: </Typography>
                                <Typography sx={{ mr: 3, m: 1 }}>{userProfile.following}</Typography>
                                <Typography color="text.secondary">follower: </Typography>
                                <Typography sx={{ mr: 3, m: 1 }}>{userProfile.followers}</Typography>
                                <Typography color="text.secondary">Thích: </Typography>
                                <Typography sx={{ mr: 3, m: 1 }} >{userProfile.heart}</Typography>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom: '0.6rem',
                                marginRight: '1rem'
                            }}>
                                <ArticleOutlined sx={{ mr: 1 }} /> <Typography>Tiểu sử: </Typography>
                                <Typography sx={{ ml: 1 }} color="text.secondary">{userProfile.history === null ? 'Chưa có tiểu sử' : userProfile.history}</Typography>
                            </div>

                            {user.alias === userProfile.alias ? (
                                <Stack spacing={2} direction="column" alignItems='center' >
                                    <Typography onClick={handleSignOut}>Đăng xuất</Typography>
                                </Stack>) : <></>}
                        </Box>
                    </CardContent>
                </Card>

                {/* <Box sx={{ width: '100%' }} mt={2}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Video Của Bạn" />
                        <Tab value="two" label="Yêu Thích" />
                    </Tabs>
                </Box> */}


                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Video của bạn" {...a11yProps(0)} />
                            <Tab label="Riêng tư" {...a11yProps(1)} />
                            <Tab label="Yêu thích" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Video của bạn
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Riêng tư
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Yêu thích
                    </TabPanel>
                </Box>


                {loginStatus || (
                    <Card>
                        <CardContent>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500], width: 66, height: 66 }} aria-label="recipe" src={userDefaultImg} ></Avatar>
                                }
                                title='Bạn chưa đăng nhập'
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button component={Link} to="/login" variant="contained" size='large' sx={{ width: '100%' }}>Đăng ký</Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                <Dialog open={open} fullWidth>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3} sx={{ marginTop: '1rem' }}>
                                <CardHeader sx={{ mb: 3 }}
                                    avatar={
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <IconButton aria-label="upload picture" component="label">
                                                    <input hidden accept="image/*" type="file" onChange={onChangeFile} />
                                                    <CameraAltRounded />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar sx={{ bgcolor: red[500], width: 66, height: 66 }} aria-label="recipe" src={methods.getValues("avatar")} >
                                                {methods.getValues("avatar") === "" ? methods.getValues("fullName")[0] : methods.getValues("avatar")}
                                            </Avatar>
                                        </Badge>
                                    }
                                    title=""
                                    subheader=""
                                />

                                <RHFTextField name="fullName" label="Tên của bạn"
                                />
                                <RHFTextField
                                    name='alias'
                                    label="TopTop ID"
                                    sx={{ m: 1 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                    }}
                                />
                                <RHFTextField
                                    name='history'
                                    label="Tiểu sử"
                                    sx={{ m: 1 }}

                                />
                            </Stack>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} disabled={btnSubmitLoading}>Hủy bỏ</Button>
                            <Button type='submit' disabled={btnSubmitLoading}>Cập nhật</Button>
                        </DialogActions>
                    </FormProvider>
                    {uploadedImage && (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    )}
                </Dialog>
            </ >
        );
    } else {
        <Loading />
    }
}
