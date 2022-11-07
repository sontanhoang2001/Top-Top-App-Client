import './ChatBox.scss'

import { SentimentVerySatisfied, MicNone, Send } from '@mui/icons-material';
import { styled, Avatar, Box, Card, CardHeader, TextField, Badge, Button, Chip } from '@mui/material';
import Message from '../Message';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


function ChatBox() {
    return (<>
        <Card>
            <CardHeader
                avatar={
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe" src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/292390027_1755321011483231_2634012541279686139_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=90sm5X0Bn54AX8_iz2n&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfAtFbJA6eqwNOWUkCyNkxfh6joDKI0pXPPEqlv-RwARBw&oe=636C6A80">
                            R
                        </Avatar>
                    </StyledBadge>
                }
                title="Hiệp Định"
                subheader="Đang hoạt động"
            />
            <Box className='chatBox'>
                <Box sx={{ margin: '1rem' }}>
                    <Message message="ngủ ngon nhé!" direction="left" />
                    <Message message="Cậu cũng vậy nhé." direction="right" />
                </Box>
            </Box>
            <Box className="footerChat">
                <SentimentVerySatisfied />
                <TextField hiddenLabel id="outlined-basic" variant="outlined" sx={{ width: '70%' }} placeholder="Aa" />
                <MicNone />
                <Button variant="contained" endIcon={<Send />} >
                    Gửi
                </Button>
            </Box>
        </Card>


        {/* 
        <div class="chat-box-tray">
            <input type="text" />
            <MicNone />
            <Send />
        </div> */}
    </>);
}

export default ChatBox;