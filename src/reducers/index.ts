import { combineReducers } from 'redux';

import doctor from './doctor';
import addPatient from './add-patient';
import preview from './preview';
import measure from './measure';

export default combineReducers({
  measure,
  doctor,
  addPatient,
  preview,
});
