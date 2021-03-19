import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import './item.css';

export interface Props {
  isSelected: boolean;
  uuid: string;
  name: string;
  phone?: number;
  onLeftSideClick: Function;
  onRightSideClick: Function;
}

export default ({
  isSelected,
  uuid,
  name,
  phone,
  onLeftSideClick,
  onRightSideClick,
}: Props) => {
  return (
    <View className="person-item-box" onClick={() => onLeftSideClick(uuid)}>
      <View className="person-select-box">
        {isSelected ? (
          <AtIcon value="check-circle" size="35" color="#52c41a" />
        ) : null}
      </View>
      <View className="person-left-box">
        <View className="person-name">{name}</View>
        <View className="person-phone">电话：{phone}</View>
      </View>
      <View className="person-right-box"
        onClick={(e) => {
          e.stopPropagation();
          onRightSideClick(uuid);
        }}>
        <AtIcon value="edit" size="30" color="#52c41a" />
      </View>
    </View>
  );
};
