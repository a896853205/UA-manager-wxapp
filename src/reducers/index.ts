import { combineReducers } from 'redux';

import doctor from './doctor';
import preview from './preview';
import measure from './measure';

export default combineReducers({
  measure,
  doctor,
  preview,
});
