import PropTypes from 'prop-types';
import { createContext, createElement, useMemo, useReducer } from 'react';

import { actions, initialState, reducer } from 'src/reducers/appReducer';

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

  const setMaintenance = (maintenance) => {
    dispatch({
      type: actions.SET_MAINTENANCE,
      payload: {
        maintenance: maintenance,
      },
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setInitialized,
      setMaintenance,
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
