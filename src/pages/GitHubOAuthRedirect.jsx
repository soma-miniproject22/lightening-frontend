/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../store/user-context';
import Api from '../api';

function GitHubOAuthRedirect() {
  const [searchParams] = useSearchParams();
  const { setUserInfo, login } = useContext(UserContext);
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    console.log('accessToken:', accessToken);
    if (accessToken) {
      Api.getUser(accessToken).then((res) => {
        if (res) {
          console.log(res);
          login(accessToken);
          setUserInfo(res);
          navigate('/');
        }
      });
    }
  }, [accessToken, login, navigate, setUserInfo]);

  return <div>Welcome! You're logged in. Returning to home!</div>;
}

export default GitHubOAuthRedirect;
