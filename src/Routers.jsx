/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useState,
  useMemo,
} from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';
import Redirect from './pages/Redirect';

export const UserContext = createContext({
  token: '',
  setToken: () => {},
});

const Routers = () => {
  const [token, setToken] = useState('');

  const value = useMemo(() => ({ token, setToken }), [token, setToken]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/redirect" element={<Redirect />} />
          {/* <Route  path="/about" component={About} />
          <Route  path="/login" component={Login} />
          <Route  path="/register" component={Register} />
          <Route  path="/profile" component={Profile} />
          <Route  path="/add-post" component={AddPost} />
          <Route  path="/edit-post/:id" component={EditPost} />
          <Route  path="/post/:id" component={Post} />
          <Route  path="/posts" component={Posts} />
          <Route  path="/users" component={Users} />
          <Route  path="/user/:id" component={User} />
          <Route  path="/search" component={Search} /> */}
          {/* <Route  path="*" component={404_page} /> */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default Routers;
