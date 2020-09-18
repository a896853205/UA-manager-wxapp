import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

export interface Props {
  type: string;
  uric: number;
  date: string;
  triglyceride: number;
  fat: number;
}

export default ({
  type,
  uric,
  date,
  triglyceride,
  fat,
}: Props) => {
  return (
    <View className="data-item-box">
      <View className="data-up-box">
        {type == 'single' ?
          <View className="up-box">尿酸：{uric}</View>
          : null}
        {type == 'joint' ? <View>
          <View className="up-box">尿酸：{uric}</View>
          <View className="up-box">甘油三酯{triglyceride}</View>
          <View className="up-box">血脂：{fat}</View>
        </View>
          : null}
      </View>
      <View className="data-down-box">{date}</View>
    </View>
  );
};
