import PropTypes from 'prop-types';
import React, { createContext, createElement, useMemo, useReducer } from 'react';

import { actions, initialState, reducer } from 'reducers/userReducer';

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
