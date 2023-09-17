export const actions = {
  SET_INITIALIZED: 'SET_INITIALIZED',
  SET_MAINTENANCE: 'SET_MAINTENANCE'
};

export const initialState = {
  initialized: false,
  maintenance: false,
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.SET_INITIALIZED:
      return {
        ...state,
        initialized: payload.initialized,
      };
    case actions.SET_MAINTENANCE:
      return {
        ...state,
        maintenance: payload.maintenance,
      };

    default:
      return state;
  }
};
