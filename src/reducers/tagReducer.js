export const actions = {
  UPDATE: 'UPDATE',
};

export const initialState = {
  tags: [],
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        tags: payload,
      };

    default:
      return state;
  }
};
