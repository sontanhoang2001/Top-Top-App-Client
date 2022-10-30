
import { useEffect, useState } from 'react';

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
} from '@mui/material';
import { EmailOutlined, ArticleOutlined, Edit } from '@mui/icons-material';

import { red } from '@mui/material/colors';

// component
import NavBar from '~/components/Layout/NavBarHeader'

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
import { Link } from 'react-router-dom';
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
export default function Profile() {
    const { user, loginStatus, logOut } = UserAuth();

    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');

    // const email = userInfo(userInfo.email);
    // const alias = userInfo(userInfo.alias);
    // const avatar = userInfo(userInfo.avatar);
    // const fullName = userInfo(userInfo.fullName);
    // const history = userInfo(userInfo.history);
    // const createdDate = userInfo(userInfo.createdDate);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    // const [avatar, setAvatar] = useState();
    // const [fullName, setFullName] = useState();
    // const [alias, setAlias] = useState();
    // const [email, setEmail] = useState();
    // const [history, setHistory] = useState();
    // const [createdDate, setCreatedDate] = useState();


    const [imageListCol, setImageListCol] = useState();

    useEffect(() => {
        if (smUp) {
            setImageListCol(3);
        } else {
            setImageListCol(2);
        }
    })

    const [value, setValue] = useState('one');

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

    return (
        <Container>
            <NavBar namePage='Thông tin cá nhân' />

            <Stack direction="column" alignItems="center" justifyContent="space-between" mt={10} mb={2}>
                {user && (
                    <>
                        <Card>
                            <CardContent>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500], width: 66, height: 66 }} aria-label="recipe" src={user.avatar} >
                                            {user.fullName[0]}
                                        </Avatar>
                                    }
                                    title={user.fullName}
                                    subheader={'@' + user.alias}
                                />

                                <Box sx={{ m: 3 }}>
                                    <Box mb={2}>
                                        <Button variant="contained">Theo dõi</Button>
                                        <Button variant="outlined">Nhắn tin</Button>
                                        <Button variant="outlined" onClick={handleClickOpen}><Edit /> Chỉnh sửa hồ sơ</Button>
                                    </Box>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        marginBottom: '0.6rem',
                                        marginRight: '1rem'
                                    }}>
                                        <EmailOutlined sx={{ mr: 1 }} /> <Typography>Email: </Typography>
                                        <Typography sx={{ ml: 1 }} color="text.secondary">{user.email}</Typography>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        marginBottom: '0.6rem',
                                        marginRight: '1rem'
                                    }}>
                                        <Typography color="text.secondary">Đang follow: </Typography>
                                        <Typography sx={{ mr: 3, m: 1 }}>4523</Typography>
                                        <Typography color="text.secondary">follower: </Typography>
                                        <Typography sx={{ mr: 3, m: 1 }}>234</Typography>
                                        <Typography color="text.secondary">Thích: </Typography>
                                        <Typography sx={{ mr: 3, m: 1 }} >453</Typography>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        marginBottom: '0.6rem',
                                        marginRight: '1rem'
                                    }}>
                                        <ArticleOutlined sx={{ mr: 1 }} /> <Typography>Tiểu sử: </Typography>
                                        <Typography sx={{ ml: 1 }} color="text.secondary">{user.history === null ? 'Chưa có tiểu sử' : user.history}</Typography>
                                    </div>
                                    <Stack spacing={2} direction="column" alignItems='center' >
                                        <Typography onClick={handleSignOut}>Đăng xuất</Typography>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>


                        <Box sx={{ width: '100%' }} mt={2}>
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
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                                <ImageList sx={{ width: '100%', minHeight: 350 }} cols={imageListCol} gap={10}>
                                    {itemData.map((item) => (
                                        <ImageListItem key={item.img}>
                                            <img
                                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid>
                        </Grid>
                    </>
                )}

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


            </Stack>
            <Dialog open={open}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
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
