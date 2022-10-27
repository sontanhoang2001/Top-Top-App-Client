import { Fragment } from 'react';
import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import FooterOnly from '~/components/Layout/FooterOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';
import Search from '~/page/Search';
import Login from '~/page/Login';
import Register from '~/page/Register';
import Otp from '~/page/Otp';
import ForgotPassword from '~/page/ForgotPassword';
import ResetPassword from '~/page/ResetPassword';


// Public routes
const publicRoutes = [
    { path: '*', component: NotFoundPage },
    { path: '/', component: Fragment },
    { path: '/home', component: Fragment },
    { path: '/search', component: Search },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: FooterOnly },
    { path: '/@', component: Profile },
    { path: '/login', component: Login, layout: FooterOnly },
    { path: '/register', component: Register, layout: FooterOnly },
    { path: '/counter', component: Counter },
];

const privateRoutes = [
    { path: '/login', component: Login, layout: FooterOnly },
    { path: '/register', component: Register, layout: FooterOnly },
    { path: '/otp', component: Otp, layout: FooterOnly },
    { path: '/forgotpassword', component: ForgotPassword, layout: FooterOnly },
    { path: '/resetpassword', component: ResetPassword, layout: FooterOnly },
];

export { publicRoutes, privateRoutes };
