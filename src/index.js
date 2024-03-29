import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/Global';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <Provider store={store}>
                <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
                    <App />
                </BrowserRouter>
            </Provider>
        </GlobalStyles>
    </React.StrictMode>,
);

// ReactDOM.render(
//     <React.StrictMode>
//         <GlobalStyles>
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </Provider>
//         </GlobalStyles>    </React.StrictMode>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
