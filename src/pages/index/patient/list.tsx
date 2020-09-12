import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import PersonItem from './item';

interface Iperson {
  key: string;
  uuid: string;
  name: string;
  phone: number;
}

interface Props {
  personList: Iperson[];
  onLeftSideClick: Function;
  onRightSideClick: Function;
}

export default ({
  personList,
  onRightSideClick,
  onLeftSideClick
}: Props) => {
  return (
    <View>
      {personList ? personList.map((item) => {
        return (
          <PersonItem
            key={item.uuid}
            uuid={item.uuid}
            name={item.name}
            phone={item.phone}
            onRightSideClick={onRightSideClick}
            onLeftSideClick={onLeftSideClick}
          />
        );
      }) : null}
    </View>
  )
};