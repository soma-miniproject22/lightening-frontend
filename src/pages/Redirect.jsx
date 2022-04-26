/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../Routers';

function Redirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { token, setToken } = useContext(UserContext);

  if (searchParams.get('access_token'))
    setToken(searchParams.get('access_token'));

  return <div />;
}

export default Redirect;
