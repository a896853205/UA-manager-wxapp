import { CHANGE_MEASURE_TYPE } from '../constants/measure';

const INITIAL_STATE = {
  measureType: 'single',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MEASURE_TYPE:
      return {
        ...state,
        measureType: action.measureType,
      };
    default:
      return state;
  }
};
