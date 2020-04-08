import { CHANGE_MEASURE_TYPE } from '../constants/measure';

export const changeMeasureType = (measureType) => {
  let measureText = '';
  switch (measureType) {
    case 'single':
      measureText = '尿频单项';
      break;
    case 'bloodFatJoint':
      measureText = '血脂三联';
      break;
    case 'UAJoint':
      measureText = '尿频三联';
      break;
    default:
      measureText = '';
  }
  return {
    type: CHANGE_MEASURE_TYPE,
    measureType,
    measureText,
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
