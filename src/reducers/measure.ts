import { CHANGE_MEASURE_TYPE } from '../constants/measure';

const INITIAL_STATE = {
  measureType: 'single',
  measureText: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MEASURE_TYPE:
      return {
        ...state,
        measureType: action.measureType,
        measureText: action.measureText,
      };
    default:
      return state;
  }
};
