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
import Search from '~/page/Search';

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
];

export { publicRoutes, privateRoutes };
