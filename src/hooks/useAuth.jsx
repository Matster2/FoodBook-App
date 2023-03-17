import { useContext, useCallback } from 'react';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    dispatch({ type: 'login_requested' });

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      dispatch({
        type: 'login_successful',
        payload: {
          tokens: data,
        },
      });
      return data;
    } catch (e) {
      dispatch({ type: 'login_failed' });
      throw e;
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  const refreshTokens = async () => {
    dispatch({ type: 'refreshing_tokens_requested' });

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/tokens/refresh`, {
        accessToken: state.tokens.accessToken,
        refreshToken: state.tokens.refreshToken,
      });

      dispatch({
        type: 'refreshing_tokens_successful',
        payload: {
          tokens: data,
        },
      });

      return data;
    } catch (e) {
      dispatch({ type: 'refreshing_tokens_failed' });
      throw e;
    }
  };

  return {
    ...state,
    login: useCallback(login, [dispatch]),
    logout: useCallback(logout, [dispatch]),
    refreshTokens: useCallback(refreshTokens, [dispatch, state.tokens]),
  };
};

export default useAuth;
