import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import store from './store/index';

// const newSocket = io();

// const newMessage = { body: 'new message', channelId: '1', username: 'admin' };

// await axios.post('/api/v1/messages', newMessage, {
//   headers: {
//     Authorization: 'Bearer ',
//   },
// }).then((response) => {
//   console.log(response.data);
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  // </React.StrictMode>,
);
