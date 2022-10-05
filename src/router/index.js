import { Fragment } from 'react';
import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import FooterOnly from '~/components/Layout/FooterOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';
import Dashboard from '~/admin/page/dashboard';

// Public routes
const publicRoutesAdmin = [
    { path: '*', component: NotFoundPage },
    { path: '/admin', component: Dashboard , layout: FooterOnly},
];

const publicRoutes = [
    { path: '*', component: NotFoundPage },
    
    { path: '/', component: Fragment },
    { path: '/home', component: Fragment },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: FooterOnly },
    { path: '/@', component: Profile },
    { path: '/counter', component: Counter },
];

const privateRoutes = [];

export { publicRoutesAdmin, publicRoutes, privateRoutes };
