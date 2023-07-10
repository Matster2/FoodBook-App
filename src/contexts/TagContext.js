import PropTypes from 'prop-types';
import React, { createContext, createElement, useMemo, useReducer } from 'react';

import { actions, initialState, reducer } from 'reducers/tagReducer';

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTags = (data) => {
    dispatch({
      type: actions.UPDATE,
      payload: [...data],
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setTags,
    }),
    [state]
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

TagProvider.propTypes = {
  children: PropTypes.node,
};

TagProvider.defaultProps = {
  children: createElement('div'),
};

export const TagConsumer = TagContext.Consumer;
