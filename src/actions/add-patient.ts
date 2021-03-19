import { ADD_PATIENT, ALTER_PATIENT } from '../constants/add-patient';

export const addPatient = (isAdded) => {
  return {
    type: ADD_PATIENT,
    isAdded,
  };
};

export const alterPatient = (isAlter) => ({
  type: ALTER_PATIENT,
  isAlter
})