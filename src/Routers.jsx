import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import AddPost from './pages/AddPost';
import AddPostBtn from './components/AddPostBtn';
import GitHubOAuthRedirect from './pages/GitHubOAuthRedirect';

const Routers = () => {
  return (
    <Router>
      <AddPostBtn />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/redirect" element={<GitHubOAuthRedirect />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </Router>
  );
};

export default Routers;
