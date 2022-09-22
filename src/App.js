import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './router';
import { DefaultLayout } from './components/Layout';
import Login from './page/Login';
// import './firebase/config.js';

function App() {
    return (
        <div className="App">
            <Login />
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
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
