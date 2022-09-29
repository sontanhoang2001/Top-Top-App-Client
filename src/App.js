import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './router';
import { DefaultLayout } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './Proteced';

import '@fontsource/roboto/300.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Home from './page/Home';

function App() {
    return (
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
                                <Layout>
                                    <Page key={index} />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
