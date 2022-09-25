import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import HeaderOnly from '~/components/Layout/HeaderOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '*', component: NotFoundPage },

    { path: '/home', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/@', component: Profile },
    { path: '/counter', component: Counter },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
