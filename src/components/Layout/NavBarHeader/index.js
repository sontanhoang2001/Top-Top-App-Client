import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header({ back, namePage }) {
    const naviagate = useNavigate();

    return (<>
        {back && (
            <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} >
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            size="large"
                            sx={{
                                mr: 2,
                                color: 'black'
                            }}
                            onClick={() => naviagate(-1)}
                        >
                            <ArrowBackIcon sx={{ color: '#fff' }} />
                        </IconButton>
                        <Typography variant="h5" sx={{ color: 'black' }} component="div">
                            {namePage}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        )}

        {back || (
            <AppBar position="fixed" sx={{ backgroundColor: 'white' }} >
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h5" sx={{ color: 'black' }} component="div">
                            {namePage}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar >
        )}
    </>);
}

export default Header;