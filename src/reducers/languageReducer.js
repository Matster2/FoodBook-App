export const actions = {
  SET_CURRENT_LANGUAGE: 'SET_CURRENT_LANGUAGE',
  SET_SUPPORTED_LANGUAGES: 'SET_SUPPORTED_LANGUAGES'
};

export const reducer = (state, action) => {
  const { payload } = action;
    
  switch (action.type) {
    // Current Language
    case actions.SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: payload.language,
      };

    // Supported Languages
    case actions.SET_SUPPORTED_LANGUAGES:
      return {
        ...state,
        supportedLanguages: payload.languages,
      };

    default:
      return state;
  }
};
