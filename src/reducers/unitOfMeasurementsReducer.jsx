export const actions = {
  UPDATE: 'UPDATE',
};

export const initialState = {
  unitOfMeasurements: [],
};

export const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        unitOfMeasurements: payload,
      };

    default:
      return state;
  }
};
