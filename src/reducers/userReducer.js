export const actions = {
  UPDATE: 'UPDATE',
};

export const initialState = {
  user: undefined,
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        account: payload,
      };

    default:
      return state;
  }
};
