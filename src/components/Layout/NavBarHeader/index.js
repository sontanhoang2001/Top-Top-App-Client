import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header({ back, namePage }) {

    return (<>
        <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    {back && (
                        <IconButton
                            edge="start"
                            size="large"
                            sx={{
                                mr: 2,
                                color: 'black'
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Typography variant="h5" sx={{ color: 'black' }} component="div">
                        {namePage}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    </>);
}

export default Header;