import React, { createContext, useState, useMemo } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import AddPost from './pages/AddPost';
import Redirect from './pages/Redirect';
import AddPostBtn from './components/AddPostBtn';

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
        <AddPostBtn />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/addpost" element={<AddPost />} />
          {/* <Route  path="*" component={<404_page/>} /> */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default Routers;
