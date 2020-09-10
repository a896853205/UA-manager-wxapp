import { ADD_PATIENT } from '../constants/add-patient';

export const addPatient = (isAdded) => {
  return {
    type: ADD_PATIENT,
    isAdded,
  };
};