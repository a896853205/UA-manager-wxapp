import { ADD_PATIENT } from '../constants/add-patient';

const INITIAL_STATE = {
  isAdded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PATIENT:
      return {
        ...state,
        isAdded: action.isAdded,
      };
    default:
      return state;
  }
};