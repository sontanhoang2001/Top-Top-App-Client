import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import FooterOnly from '~/components/Layout/FooterOnly';
import NotFoundPage from '~/page/404';
import { Counter } from '~/page/Counter';

// Public routes
const publicRoutes = [
    { path: '*', component: NotFoundPage },
    
    // { path: '/', component: Home },
    // { path: '/home', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: FooterOnly },
    { path: '/@', component: Profile },
    { path: '/counter', component: Counter },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
