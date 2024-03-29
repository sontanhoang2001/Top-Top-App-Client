import { Fragment } from 'react';
import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import FooterOnly from '~/components/Layout/FooterOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';
import Login from '~/page/Login';
import Register from '~/page/Register';
import Notification from '~/page/Notification';
import Otp from '~/page/Otp';
import ForgotPassword from '~/page/ForgotPassword';
import ResetPassword from '~/page/ResetPassword';
import Chat from '~/page/Chat/index';
// import Test from '~/page/Test';
import StartProfile from '~/page/startProfile';
import VideoProfile from '~/page/VideoProfile';
import SessionError from '~/page/SessionError';



// Public routes
const publicRoutes = [
    { path: '*', component: NotFoundPage },
    { path: '/', component: Fragment },
    { path: '/:videoIdParam', component: Fragment },
    { path: '/:videoIdParam/comment/:commentIdParam', component: Fragment },
    { path: '/home', component: Fragment },
    { path: '/following', component: Following },
    { path: `/@:userAlias`, component: Profile },
    { path: '/register', component: Register, layout: FooterOnly },
    { path: '/@:userAlias/video/:videoId', component: VideoProfile },
    { path: '/counter', component: Counter },
    // { path: '/test', component: Test },
    { path: '/404', component: NotFoundPage },
    { path: '/sessionError', component: SessionError }
];

const privateRoutes = [
    { path: '/profile', component: StartProfile },
    { path: '/login', component: Login, layout: FooterOnly },
    { path: '/register', component: Register, layout: FooterOnly },
    { path: '/forgotpassword', component: ForgotPassword, layout: FooterOnly },
    { path: '/otp', component: Otp, layout: FooterOnly },
    { path: '/resetpassword', component: ResetPassword, layout: FooterOnly },
];

const loginRoutes = [
    { path: '/upload', component: Upload },
    { path: '/notification', component: Notification },
    { path: '/notification/:notificationType', component: Notification },
    { path: '/chat', component: Chat },
    { path: '/chat/:chatFriendId', component: Chat },
];

export { publicRoutes, privateRoutes, loginRoutes };
