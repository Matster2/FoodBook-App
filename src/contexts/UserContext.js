import React, { createElement, createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { reducer, initialState, actions } from '../reducers/userReducer';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (data) => {
    dispatch({
      type: actions.UPDATE,
      payload: {
        ...data,
      },
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setUser,
    }),
    [state]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

UserProvider.defaultProps = {
  children: createElement('div'),
};

export const UserConsumer = UserContext.Consumer;
