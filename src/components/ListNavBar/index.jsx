import React from 'react';
import './index.css';

const NavBar = () => {
  return (
    <header className="l-list-navbar-root">
      <div className="l-list-navbar-logo-container">
        <span className="ec ec-zap l-list-navbar-logo" />
        <h1 className="l-list-navbar-title title-1">소마</h1>
        <h1 className="l-list-navbar-title title-2">번</h1>
        <h1 className="l-list-navbar-title title-3">개</h1>
      </div>
    </header>
  );
};

export default NavBar;
