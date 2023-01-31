import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import error404_Img from '~/assets/image/erorr_404.jpg';
import { Link } from 'react-router-dom';
import Title from '~/components/title';
export default function NotFoundPage() {
    return (
        <>
            <Title titleString="404" />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Typography variant="h1">
                                404
                            </Typography>
                            <Typography variant="h6">
                                Không tìm thấy trang nào như vậy cả!
                            </Typography>

                            <Button component={Link} to="/home" variant="contained" color="primary">
                                Trở về
                            </Button>
                        </Grid>
                        <Grid xs={6}>
                            <img
                                src={error404_Img}
                                alt="error 404"
                                width={500} height={250}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
