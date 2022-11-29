
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import TabPanel from '~/components/TabPanel';
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
import { EmailOutlined, ArticleOutlined, Edit, Save, CameraAltRounded, Logout } from '@mui/icons-material';

import { red } from '@mui/material/colors';

// component
import NavBar from '~/components/Layout/NavBarHeader'
import { FormProvider, RHFTextField } from '~/components/hook-form';

// api
import profileApi from '~/api/profile'


// redux
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '~/components/customizedSnackbars/snackbarSlice';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// api
import mediaApi from '~/api/media';
import accountApi from '~/api/account';


// helper
import { urlFromDriveUrl } from '~/shared/helper'

// image
import userDefaultImg from '~/assets/image/user-profile-default.png'
import { Link, useParams } from 'react-router-dom';
import Loading from '~/components/Layout/Loading';
import ListVideo from './listVideo';
import Title from '~/components/title';
// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode !== 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));


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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAlias } = useParams();
    const { user, loginStatus, logOut } = UserAuth();

    const [userProfile, setUserProfile] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [follow, setFollow] = useState(false);
    const [isBothAreFriend, setIsBothAreFriend] = useState(false);

    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);




    const profileSchema = Yup.object().shape({
        fullName: Yup.string()
            .max(40, 'Tên tối đa 40 ký tự!')
            .required('Bạn chưa nhập tên!'),
        alias: Yup.string()
            .max(15, 'TopTop ID tối đa 15 ký tự!')
            .required('Bạn chưa nhập TopTop ID!'),
        history: Yup.string()
            .max(80, 'Tiểu sử tối đa 80 ký tự')
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

    // load profile info
    useEffect(() => {
        profileApi.getProfileByAlias(userAlias)
            .then(res => {
                setIsLoad(true);
                if (res.data !== "") {
                    setUserProfile(res.data);
                    setFormState(res.data.id, res.data.fullName, res.data.avatar, res.data.history, res.data.alias);
                } else {
                    navigate("/404");
                }
            })
            .catch(error => {
                console.log(error)
                setIsLoad(false);
            })
    }, [userAlias])

    useEffect(() => {
        let requestId = user.id;
        let acceptId = userProfile.id;

        // check xem có kết bạn hay chưa
        accountApi.isBothAreFriend(requestId, acceptId)
            .then(res => {
                console.log("check friend ship: ", res.data)
                setIsBothAreFriend(res.data.result)
            })
            .catch(error => console.log(error))
    }, [userProfile, follow])

    useEffect(() => {
        // userId của người dùng đang xem
        const userId = methods.getValues("id");
        if (user)
            if (userId) {
                profileApi.isYouFollowUser(user.id, userId)
                    .then(res => {
                        setFollow(res.data.result);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
    }, [methods.getValues("id")])

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const [tabMenu, setTabMenu] = useState(0);

    const handleChange = (event, newValue) => {
        setTabMenu(newValue);
    };

    const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

    const setFormState = (id, fullName, avatar, history, alias) => {
        methods.setValue("id", id);
        methods.setValue("fullName", fullName);
        methods.setValue("avatar", avatar);
        methods.setValue("history", history === null ? "" : history);
        methods.setValue("alias", alias);
    }

    const handleClickOpen = () => {
        setFormState(userProfile.id, userProfile.fullName, userProfile.avatar, userProfile.history, userProfile.alias);
        setOpenDialogUpdate(true);
    };

    const handleClose = () => {
        setBtnSubmitLoading(false);
        setOpenDialogUpdate(false);
    };

    // handle change event of input file
    const onChangeFile = async (e) => {
        setBtnSubmitLoading(true);

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
                    methods.setValue("avatar", urlFromDriveUrl(res.url))
                    setBtnSubmitLoading(false);
                })
                .catch((error) => {
                    setBtnSubmitLoading(false);
                    console.error(error)
                    const snackBarPayload = { type: 'error', message: 'Tải avatar không thành công!' };
                    dispatch(openSnackbar(snackBarPayload))
                });
        }
    };

    const onSubmit = async (data) => {
        // check nếu thay đổi thì cho update
        const history = methods.getValues("history").trim() === "" ? null : methods.getValues("history");

        if (userProfile.avatar !== methods.getValues("avatar") || userProfile.fullName !== methods.getValues("fullName") || (userProfile.alias !== methods.getValues("alias")) || userProfile.history !== history) {

            if (userProfile.alias !== methods.getValues("alias")) {
                // check TopTop ID
                profileApi.findByAlias(methods.getValues("alias"))
                    .then((res) => {
                        console.log("check toptop id: ", res.data)
                        // nếu check chưa trùng thì cho phép update
                        if (res.data.result == false) {
                            updateProfile();
                        } else {
                            methods.setError("alias");
                            const snackBarPayload = { type: 'error', message: 'TopTop ID vừa nhập đã tồn tại. Vui lòng thử lại!', duration: 8000 };
                            dispatch(openSnackbar(snackBarPayload))
                            setBtnSubmitLoading(false);
                        }
                    })
                    .catch((error) => {
                        setBtnSubmitLoading(false);

                        console.error(error)
                    });
            } else {
                // alias không có sự thay đổi nên ko cần check
                updateProfile();
            }
        }
    }

    const updateProfile = async () => {
        // Put update profile
        const resqestData = {
            "id": user.id,
            "fullName": methods.getValues("fullName"),
            "avatar": methods.getValues("avatar"),
            "history": methods.getValues("history").trim() === "" ? null : methods.getValues("history").trim(),
            "alias": methods.getValues("alias"),
        };
        profileApi.updateProfile(resqestData)
            .then((res) => {
                setUserProfile(res.data);
                const snackBarPayload = { type: 'success', message: 'Cập nhật thông tin thành công!' };
                dispatch(openSnackbar(snackBarPayload));

                if (userProfile.alias !== methods.getValues("alias")) {
                    navigate(`/@${res.data.alias}`);
                    window.location.reload();
                }
                handleClose();
            })
            .catch((error) => {
                setBtnSubmitLoading(false);
                console.error(error)

                const snackBarPayload = { type: 'error', message: 'Cập nhật thông tin thất bại. Vui lòng thử lại!' };
                dispatch(openSnackbar(snackBarPayload))
            });
    }

    const handleFollow = () => {
        const userId = methods.getValues("id");
        if (user)
            if (userId) {
                const data = {
                    "requestId": user.id,
                    "accetpId": userId,
                };
                profileApi.folllow(data)
                    .then(res => {
                        setFollow(true);
                        const snackBarPayload = { type: 'success', message: `Bạn đã follow @${methods.getValues("alias")}` };
                        dispatch(openSnackbar(snackBarPayload))
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
    }

    const handleUnFollow = () => {
        const userId = methods.getValues("id");
        if (user)
            if (userId) {
                const data = {
                    "requestId": user.id,
                    "accetpId": userId,
                };
                profileApi.unFolllow(data)
                    .then(res => {
                        setFollow(false);
                        const snackBarPayload = { type: 'success', message: `Bạn đã hủy follow @${methods.getValues("alias")}` };
                        dispatch(openSnackbar(snackBarPayload))
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
    }

    const handleChat = () => {
        const userId = methods.getValues("id");

        navigate(`/chat/${userId}`);
    }

    if (isLoad) {
        return (
            <>
                <Title titleString="Cá nhân" />

                <NavBar namePage='Thông tin cá nhân' />

                {userProfile && (
                    <>
                        <NavBar namePage='Thông tin cá nhân' />

                        <div className='container__center'>
                            <Card sx={{ margin: '5rem 1rem 1rem 1rem', display: 'flex', justifyContent: 'center' }} >
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
                                                <>
                                                    <Button variant="outlined" sx={{ margin: '5px' }} onClick={handleClickOpen}><Edit /> Chỉnh sửa hồ sơ</Button>
                                                    <Button variant="contained" sx={{ margin: '5px' }} onClick={handleSignOut}><Logout /> Đăng xuất</Button>
                                                </>
                                            ) : (
                                                <>
                                                    {follow === true ? (
                                                        <>
                                                            <Button variant="contained" sx={{ margin: '5px' }} onClick={handleUnFollow}>Hủy theo dõi</Button>
                                                            {isBothAreFriend && (
                                                                <Button variant="outlined" sx={{ margin: '5px' }} onClick={handleChat}>Nhắn tin</Button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button variant="contained" sx={{ width: '15em', margin: '5px' }} onClick={handleFollow}>Theo dõi</Button>
                                                        </>
                                                    )}
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
                                    </Box>
                                </CardContent>
                            </Card>

                            <Box sx={{ margin: '1rem 1rem 1rem 1rem' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    {user.id == methods.getValues("id") ? (
                                        <Tabs value={tabMenu} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Video của bạn" {...a11yProps(0)} />
                                            <Tab label="Riêng tư" {...a11yProps(1)} />
                                            <Tab label="Yêu thích" {...a11yProps(2)} />
                                        </Tabs>
                                    ) : (
                                        <Tabs value={tabMenu} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Tất video được chia sẻ" {...a11yProps(0)} />
                                        </Tabs>
                                    )}

                                </Box>
                                <TabPanel value={tabMenu} index={0}>
                                    <ListVideo index={0} userAlias={userAlias} userId={methods.getValues("id")} />
                                </TabPanel>
                                <TabPanel value={tabMenu} index={1}>
                                    <ListVideo index={1} userAlias={userAlias} userId={methods.getValues("id")} />
                                </TabPanel>
                                <TabPanel value={tabMenu} index={2}>
                                    <ListVideo index={2} userAlias={userAlias} userId={methods.getValues("id")} />
                                </TabPanel>
                            </Box>
                        </div>
                    </>
                )}

                <Dialog open={openDialogUpdate} fullWidth>
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
                                // title={methods.getValues("fullName")}
                                // subheader={methods.getValues("alias")}
                                />

                                <RHFTextField name="fullName" label="Tên của bạn" />
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
                    {btnSubmitLoading && (
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
