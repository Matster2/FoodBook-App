import React, { createElement, createContext, useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { reducer, actions } from '../reducers/languageReducer';

import localStorageKeys from '../config/localStorageKeys';

export const LanguageContext = createContext();

const initialState = {
  supportedLanguages: [ 'en' ],
  currentLanguage: 'en',
};

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const newState = initialState;

    const supportedLanguages = localStorage.getItem(localStorageKeys.language.supportedLanguages);
    newState.supportedLanguages = supportedLanguages ? JSON.parse(supportedLanguages) : initialState.supportedLanguages;

    const currentLanguage = localStorage.getItem(localStorageKeys.language.current);
    newState.currentLanguage = currentLanguage ? JSON.parse(currentLanguage) : initialState.currentLanguage;

    return newState;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKeys.language.current, JSON.stringify(state.currentLanguage));
  }, [state.currentLanguage]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.language.supportedLanguages, JSON.stringify(state.supportedLanguages));
  }, [state.supportedLanguages]);

  const setCurrentLanguage = (language) => {
    dispatch({
      type: actions.SET_CURRENT_LANGUAGE,
      payload: {
        language
      },
    });
  };
  
  const setSupportedLanguages = (languages) => {
    dispatch({
      type: actions.SET_SUPPORTED_LANGUAGES,
      payload: {
        languages
      },
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setCurrentLanguage,
      setSupportedLanguages,
    }),
    [state]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.node,
};

LanguageProvider.defaultProps = {
  children: createElement('div'),
};

export const LanguageConsumer = LanguageContext.Consumer;
