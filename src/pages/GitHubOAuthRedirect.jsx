/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../store/user-context';

function GitHubOAuthRedirect() {
  // searchparams = ?
  const [searchParams] = useSearchParams();
  const { login } = useContext(UserContext);

  const accessToken = searchParams.get('access_token');

  console.log('accessToken:', accessToken);
  if (accessToken) login(accessToken);

  return <div>Welcome! You're logged in. Returning to home!</div>;
}

export default GitHubOAuthRedirect;
