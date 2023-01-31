import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ThemeProvider from './theme';
import Snackbar from '~/components/customizedSnackbars';

import { publicRoutes, privateRoutes, loginRoutes } from './router';
import { DefaultLayout } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import { ProtectedPrivate, ProtectedLogin } from './Proteced';

// import '@fontsource/roboto/300.css';
import Home from './page/Home';
import { SocketContextProvider } from './context/SocketContext';
import ListenerNotification from './components/listenerNotification';


function App() {
    return (
        <ThemeProvider>
            <AuthContextProvider>
                <SocketContextProvider>
                    <Home />
                    <ListenerNotification />
                    <Routes>
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

                        {loginRoutes.map((route, index) => {
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
                                        <ProtectedLogin>
                                            <Layout>
                                                <Page key={index} />
                                            </Layout>
                                        </ProtectedLogin>
                                    }
                                />
                            );
                        })}

                        {privateRoutes.map((route, index) => {
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
                                        <ProtectedPrivate>
                                            <Layout>
                                                <Page key={index} />
                                            </Layout>
                                        </ProtectedPrivate>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <Snackbar />
                </SocketContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
