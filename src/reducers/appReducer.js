export const actions = {
  SET_INITIALIZED: 'SET_INITIALIZED',
};

export const initialState = {
  initialized: false,
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.SET_INITIALIZED:
      return {
        ...state,
        initialized: payload.initialized,
      };

    default:
      return state;
  }
};
