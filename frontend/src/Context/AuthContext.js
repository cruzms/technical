import React from 'react';

const AuthContext = React.createContext();

const initialState = {
  userToken: localStorage.getItem("access_token"),
  ghAccessToken: localStorage.getItem("gh_access_token")
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'GH_LOGIN':
      return {
        ...prevState,
        ghAccessToken: action.payload.token,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.payload.token,
      };
    case 'SIGN_OUT':
      return {
        userToken: null,
        ghAccessToken: null
      };
    default:
      return initialState;
  }
};

/**
 * Custom provider component
 * @returns AuthProvider
 */
function AuthProvider({ children }) {
  const [authState, dispatch] = React.useReducer(loginReducer, initialState);
  const authActions = React.useMemo(() => ({
    signIn: async (data) => {
      localStorage.setItem("access_token", data.token);
      dispatch({ type: 'SIGN_IN', payload: { token: data.token } });
    },
    ghLogIn: (data) => {
      localStorage.setItem("gh_access_token", data.access_token);
      dispatch({ type: 'GH_LOGIN', payload: { token: data.access_token } });
    },
    signOut: async () => {
      window.localStorage.clear();
      dispatch({ type: 'SIGN_OUT' });
    },
  }), []);
  const value = { authState, authActions };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the actions of context
 * @returns {object} context
 */
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
