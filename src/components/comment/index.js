import './comment.css'

// mui
import { createTheme, ThemeProvider, styled, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    maxWidth: "none !important"
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                avatar: {
                    marginBottom: "24px"
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(244, 67, 54)",
                },
            },
        }
    }
})

function Comment() {
    return (<>
        <ThemeProvider theme={theme}>
            <div className='commentBox'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={(
                            <>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hiệp Định</Typography>
                                <Typography variant="subtitle2">Em đẹp lắm em ơi 🥰</Typography>
                            </>)}
                        subheader={(
                            <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                <Typography variant="subtitle2" align='left' marginRight='1.5rem'>04/11</Typography>
                                <Typography variant="subtitle2" align='right'>Trả lời</Typography>
                            </Box>
                        )}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        width='auto'
                        image="https://s3.cloud.cmctelecom.vn/tinhte1/2017/09/4127716_21370996_757732914433829_7941595007667006352_n.jpg"
                        alt="Paella dish"
                    />
                </Card>

                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={(
                            <>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hiệp Định</Typography>
                                <Typography variant="subtitle1">Em đẹp lắm em ơi 🥰</Typography>
                            </>)}
                        subheader={(
                            <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                <Typography variant="subtitle2" align='left' marginRight='1.5rem'>04/11</Typography>
                                <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }}>Trả lời</Typography>
                                <Typography variant="subtitle2" align='right' sx={{ cursor: "pointer" }}><FavoriteBorderIcon /></Typography>
                            </Box>
                        )}
                    />
                    
                    <div className="reply__container">
                        <div className="reply__actionContainer">
                            <p className="reply__ActionText">Xem thêm câu trả lời khác (1)
                                <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                            </p>
                        </div>
                    </div>

                    <div className='children__comment'>
                        <CardHeader sx={{ padding: "5px 16px 5px 16px" }}
                            avatar={
                                <Avatar aria-label="recipe" sx={{ width: '2rem', height: '2rem' }}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={(
                                <>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hiệp Định</Typography>
                                    <Typography variant="subtitle1">Em đẹp lắm em ơi 🥰</Typography>
                                </>)}
                            subheader={(
                                <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                    <Typography variant="subtitle2" align='left' marginRight='1.5rem'>04/11</Typography>
                                    <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }}>Trả lời</Typography>
                                    <Typography variant="subtitle2" align='right' sx={{ cursor: "pointer" }}><FavoriteBorderIcon /></Typography>
                                </Box>
                            )}
                        />
                    </div>

                    <div className='children__comment'>
                        <CardHeader sx={{ padding: "5px 16px 5px 16px" }}
                            avatar={
                                <Avatar aria-label="recipe" sx={{ width: '2rem', height: '2rem' }}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={(
                                <>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hiệp Định</Typography>
                                    <Typography variant="subtitle1">Em đẹp lắm em ơi 🥰</Typography>
                                </>)}
                            subheader={(
                                <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                    <Typography variant="subtitle2" align='left' marginRight='1.5rem'>04/11</Typography>
                                    <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }}>Trả lời</Typography>
                                    <Typography variant="subtitle2" align='right' sx={{ cursor: "pointer" }}>Tim</Typography>
                                </Box>
                            )}
                        />
                        <div className="reply__container">
                            <div className="reply__actionContainer">
                                <p className="reply__ActionText">Xem thêm
                                    <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        </ThemeProvider>
    </>);
}

export default Comment;