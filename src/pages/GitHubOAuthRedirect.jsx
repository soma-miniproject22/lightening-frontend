/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../store/user-context';
import Api from '../api';

function GitHubOAuthRedirect() {
  const [searchParams] = useSearchParams();
  const { setUserInfo, login } = useContext(UserContext);
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');

  console.log('accessToken:', accessToken);
  if (accessToken) {
    Api.getUser(accessToken).then((res) => {
      if (res) {
        setUserInfo(res);
        login(accessToken);
        navigate('/');
      }
    });
  }

  return <div>Welcome! You're logged in. Returning to home!</div>;
}

export default GitHubOAuthRedirect;
