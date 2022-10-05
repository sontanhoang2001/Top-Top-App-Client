import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutesAdmin, publicRoutes, privateRoutes } from './router';
import { DefaultLayout } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './Proteced';

import '@fontsource/roboto/300.css';
import Home from './page/Home';

import { useDispatch } from 'react-redux';
import { currentPath } from '~/components/Layout/DefaultLayout/Footer/routerPathSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const pathName = window.location.pathname.split('/')[1];
        dispatch(currentPath(pathName))
    })
    return (
        <AuthContextProvider>
            <Home />
            <Routes>
                {publicRoutesAdmin.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page key={index} />
                                </Layout>
                            }
                        />
                    );
                })}
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page key={index} />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page key={index} />
                                </Layout>
                            }
                        />
                    );
                })} */}
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
