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
      return { userInfo: action.payload, ...state };
    }

    case 'LOG_IN': {
      return { accessToken: action.payload, ...state };
    }
    case 'LOG_OUT': {
      return { userInfo: null, accessToken: null, ...state };
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
    dispatchUserAction({ type: 'GET_USER_INFO', payload: userInfo });
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
