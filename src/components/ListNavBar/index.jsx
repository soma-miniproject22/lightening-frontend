import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/user-context';
import Api from '../../api';
import './index.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { accessToken, userInfo } = useContext(UserContext);

  const moveToIndexPage = () => {
    return navigate('/');
  };

  const handleSignin = () => {
    Api.signin().then((res) => {
      if (res) window.location.href = res.response; // redirection to requested url
    });
  };

  return (
    <header className="l-list-navbar-root">
      <div className="l-list-navbar-logo-container" onClick={moveToIndexPage}>
        <i className="fas fa-bolt l-list-navbar-logo"></i>
        <h1 className="l-list-navbar-title title-1">소마</h1>
        <h1 className="l-list-navbar-title title-2">번</h1>
        <h1 className="l-list-navbar-title title-3">개</h1>
      </div>
      <div className="b-list-navbar-menu-container">
        {accessToken === '' ? (
          <Button className="b-list-navbar-login-btn" onClick={handleSignin}>
            <img
              className="b-list-navbar-github-logo"
              src="https://icongr.am/fontawesome/github.svg?size=128&color=ffffff"
              alt="github logo"
            />
            Login With GitHub
          </Button>
        ) : (
          <div className="b-list-navbar-profile-container">
            <img
              src={userInfo.profileImage}
              className="b-list-item-thumb"
              alt="thumbnail"
            />
            <span className="b-list-navbar-nickname">{userInfo.nickname}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
