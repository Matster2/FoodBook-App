import PropTypes from 'prop-types';
import React, { createContext, createElement, useEffect, useMemo, useReducer } from 'react';

import { getClaims, reducer } from 'reducers/authReducer';

import localStorageKeys from 'config/localStorageKeys';
import { isUndefined } from 'utils/utils';

export const AuthContext = createContext();

const initialState = {
  authenticated: false,
  authenticating: false,
  rememberMe: false,
  claims: {
    userId: undefined,
  },
  tokens: {
    accessToken: undefined,
    refreshToken: undefined,
  },
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const newState = initialState;

    const rememberMe = localStorage.getItem(localStorageKeys.auth.rememberMe);
    newState.rememberMe = rememberMe ? JSON.parse(rememberMe) : initialState.rememberMe;

    const tokens = localStorage.getItem(localStorageKeys.auth.tokens);
    newState.tokens = tokens ? JSON.parse(tokens) : initialState.tokens;

    if (!isUndefined(newState.tokens.accessToken)) {
      newState.authenticated = true;
      newState.claims = getClaims(newState.tokens.accessToken);
    }

    return newState;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKeys.auth.rememberMe, JSON.stringify(state.rememberMe));
  }, [state.rememberMe]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.auth.tokens,
      JSON.stringify({
        accessToken: state.tokens.accessToken,
        refreshToken: state.tokens.refreshToken,
      })
    );
  }, [state.tokens]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: createElement('div'),
};

export const AuthConsumer = AuthContext.Consumer;
