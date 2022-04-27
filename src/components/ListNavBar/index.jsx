import React from 'react';
import Api from '../../Api';
import './index.css';

const NavBar = () => {
  const handleSignin = () => {
    Api.signin().then((res) => {
      if (res) window.location.href = res.response;
      //TODO : handle login
    });
  };

  return (
    <header className="l-list-navbar-root">
      <div className="l-list-navbar-logo-container">
        <span className="ec ec-zap l-list-navbar-logo" />
        <h1 className="l-list-navbar-title title-1">소마</h1>
        <h1 className="l-list-navbar-title title-2">번</h1>
        <h1 className="l-list-navbar-title title-3">개</h1>
        <span className="cursor-pointer" onClick={handleSignin}>
          로그인 버튼
        </span>
      </div>
    </header>
  );
};

export default NavBar;
