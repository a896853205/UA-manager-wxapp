import Taro from '@tarojs/taro';

import { View } from '@tarojs/components';
import {
  AtIcon,
} from 'taro-ui';
import './item.css';

interface Props {
  uuid: string;
  name: string;
  phone: number;
  onLeftSideClick: Function;
  onRightSideClick: Function;
}

export default ({
  uuid, name, phone, onLeftSideClick, onRightSideClick
}: Props) => {
  return (
    <View className='person-item-box'>
      <View className='person-select-box'>
        {uuid === Taro.getStorageSync('activePatient') ?
          <AtIcon value="check-circle" size="35" color="#E93B3D" />
          : null
        }
      </View>
      <View className='person-left-box' onClick={() => { onLeftSideClick(uuid) }}>
        <View className='person-name'>{name}</View>
        <View className='person-phone'>{`电话：${phone}`}</View>
      </View>
      <View className='person-right-box' onClick={() => { onRightSideClick(uuid) }}>
        <AtIcon value="edit" size="30" color="#E93B3D" />
      </View>
    </View>
  );
};