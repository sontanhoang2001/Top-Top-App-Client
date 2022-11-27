// material
import {
    Card,
    Avatar,
    Box,
    CardHeader,
    CardContent,
    Button,
} from '@mui/material';

import { red } from '@mui/material/colors';


// component
import NavBar from '~/components/Layout/NavBarHeader'

// image
import userDefaultImg from '~/assets/image/user-profile-default.png'
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function StartProfile() {
    return (
        <>
            <NavBar namePage='Thông tin cá nhân' />

            <Box className='container__center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500], width: 66, height: 66 }} aria-label="recipe" src={userDefaultImg} ></Avatar>
                        }
                        title='Bạn chưa đăng nhập'
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button component={Link} to="/login" variant="contained" size='large' sx={{ width: '100%' }}>Đăng nhập</Button>
                    </Box>
                </CardContent>
            </Box>
        </ >
    );
}
