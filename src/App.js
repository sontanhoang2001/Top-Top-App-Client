import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ThemeProvider from './theme';
import Snackbar from '~/components/customizedSnackbars';

import { publicRoutes, privateRoutes } from './router';
import { DefaultLayout } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './Proteced';

// import '@fontsource/roboto/300.css';
import Home from './page/Home';

function App() {
    return (
        <ThemeProvider>
            <AuthContextProvider>
                <Home />
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
                                    <Protected>
                                        <Layout>
                                            <Page key={index} />
                                        </Layout>
                                    </Protected>
                                }
                            />
                        );
                    })}
                </Routes>
                <Snackbar />
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
