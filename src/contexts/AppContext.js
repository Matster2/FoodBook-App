import React, { useMemo, createElement, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { reducer, initialState, actions } from '../reducers/appReducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialized = (isInitialized) => {
    dispatch({
      type: actions.SET_INITIALIZED,
      payload: {
        initialized: isInitialized,
      },
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setInitialized,
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  children: createElement('div'),
};

export const AppConsumer = AppContext.Consumer;
