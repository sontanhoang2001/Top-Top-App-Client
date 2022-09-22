import Following from '~/page/Following';
import Home from '~/page/Home';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import HeaderOnly from '~/components/Layout/HeaderOnly'

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
