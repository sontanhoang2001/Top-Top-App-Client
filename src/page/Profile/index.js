
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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import propTypes from 'prop-types';
import { EmailOutlined, ArticleOutlined, Edit, Save } from '@mui/icons-material';

import { red } from '@mui/material/colors';


// component
import NavBar from '~/components/Layout/NavBarHeader'
import { FormProvider, RHFTextField } from '~/components/hook-form';

// api
import profileApi from '~/api/profile'


// redux
import { useSelector } from 'react-redux';
import { selectEmail } from "~/context/authSlice";

// auth provider
import { UserAuth } from '~/context/AuthContext';

import useResponsive from '~/hooks/useResponsive';

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
    const { userAlias } = useParams();
    const { user, loginStatus, logOut } = UserAuth();

    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const [userProfile, setUserProfile] = useState();
    const [isLoad, setIsLoad] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);


    const profileSchema = Yup.object().shape({
        fullName: Yup.string()
            .max(80, 'Tên tối đa 80 ký tự!')
            .required('Bạn chưa nhập tên!'),
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

    const onSubmit = async (data) => {
        console.log("submit profile: ", data);
        // uploadVideo(data);
    }


    useEffect(() => {
        if (userAlias) {
            profileApi.getProfileByAlias(userAlias)
                .then(res => {
                    setUserProfile(res.data);
                    setIsLoad(true);

                    methods.setValue("id", res.data.id);
                    methods.setValue("fullName", res.data.fullName);
                    methods.setValue("avatar", res.data.avatar);
                    methods.setValue("history", res.data.history);
                    methods.setValue("alias", res.data.alias);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                            <Button onClick={handleClose}>Hủy bỏ</Button>
                            <Button type='submit'>Cập nhật</Button>
                        </DialogActions>
                    </FormProvider>
                </Dialog>
            </ >
        );
    } else {
        <Loading />
    }
}




// import { useEffect } from 'react';
// import { UserAuth } from '~/context/AuthContext';

// function Profile() {
//     const { user, logOut } = UserAuth();

//     const handleSignOut = async () => {
//         try {
//             await logOut();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         console.log("get profile")
//     }, [])

//     return (
//         <>
//             <h1>Account</h1>
//             <p>Welcome, {user?.displayName}</p>
//             <button onClick={handleSignOut}>Logout</button>
//         </>
//     );
// }

// export default Profile;
