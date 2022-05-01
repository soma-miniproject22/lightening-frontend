import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './Routers';
import UserProvider from './store/user-context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <Routers />
    </UserProvider>
  </React.StrictMode>,
);
