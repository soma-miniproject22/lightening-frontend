import React, { useReducer } from 'react';

const initialState = {
  userInfo: {},
  accessToken: '',
  getUserInfo: () => {},
  login: () => {},
  logout: () => {},
};

export const UserContext = React.createContext(initialState);

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_INFO': {
      return { ...state, userInfo: action.payload };
    }
    case 'LOG_IN': {
      localStorage.setItem('tkn', action.payload);
      return { ...state, accessToken: action.payload };
    }
    case 'LOG_OUT': {
      localStorage.removeItem('tkn');
      return { ...state, userInfo: {}, accessToken: '' };
    }
    default:
      return { ...state };
  }
}

const UserProvider = (props) => {
  // State Hook
  const [userState, dispatchUserAction] = useReducer(userReducer, initialState);

  // Action Creator 정의
  const setUserInfo = (userInfo) => {
    dispatchUserAction({ type: 'SET_USER_INFO', payload: userInfo });
  };

  const login = (accessToken) => {
    dispatchUserAction({ type: 'LOG_IN', payload: accessToken });
  };

  const logout = () => {
    dispatchUserAction({ type: 'LOG_OUT' });
  };

  return (
    <UserContext.Provider
      value={{
        userInfo: userState.userInfo,
        accessToken: userState.accessToken,
        setUserInfo,
        login,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
