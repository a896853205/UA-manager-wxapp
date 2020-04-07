import { CHANGE_MEASURE_TYPE } from '../constants/counter';

export const changeMeasureType = (measureType) => {
  return {
    type: CHANGE_MEASURE_TYPE,
    measureType,
  };
};

// 异步的action
// export function asyncAdd() {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(add());
//     }, 2000);
//   };
// }
