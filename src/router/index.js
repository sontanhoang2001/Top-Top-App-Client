import { Fragment } from 'react';
import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import FooterOnly from '~/components/Layout/FooterOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';
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
    { path: '/counter', component: Counter },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
