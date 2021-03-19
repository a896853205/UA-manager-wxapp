import { ADD_PATIENT, ALTER_PATIENT } from '../constants/add-patient';

const INITIAL_STATE = {
  isAdded: false,
  isAlter: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PATIENT:
      return {
        ...state,
        isAdded: action.isAdded,
      };
    case ALTER_PATIENT:
      return {
        ...state,
        isAlter: action.isAlter,
      };
    default:
      return state;
  }
};
