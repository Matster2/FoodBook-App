import PropTypes from 'prop-types';
import React, { createContext, createElement, useMemo, useReducer } from 'react';

import { actions, initialState, reducer } from 'reducers/unitOfMeasurementsReducer';

export const UnitOfMeasurementContext = createContext();

export const UnitOfMeasurementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUnitOfMeasurements = (data) => {
    dispatch({
      type: actions.UPDATE,
      payload: [...data],
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setUnitOfMeasurements,
    }),
    [state]
  );

  return <UnitOfMeasurementContext.Provider value={value}>{children}</UnitOfMeasurementContext.Provider>;
};

UnitOfMeasurementProvider.propTypes = {
  children: PropTypes.node,
};

UnitOfMeasurementProvider.defaultProps = {
  children: createElement('div'),
};

export const UnitOfMeasurementConsumer = UnitOfMeasurementContext.Consumer;
