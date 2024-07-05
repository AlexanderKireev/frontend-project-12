import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
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
  </Provider>,
  // </React.StrictMode>,
);
