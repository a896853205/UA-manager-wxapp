import Taro, { memo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';

import { AtButton, AtInputNumber } from 'taro-ui';
interface IMeasure {
  measureType: string;
}
interface IStatus {
  measure: IMeasure;
}
const SaveData = () => {
  const { measureType } = useSelector<IStatus, IMeasure>(
    (state) => state.measure
  );
  return (
    <View>
      {/* TODO: 表单,数据input(1-3),时间选择,保存按钮 */}
      {measureType === 'single' ? (
        <View>
          <View>手动添加尿酸信息</View>
          <View>
            <Text>尿酸数值(mmol/L)</Text>
            <AtInputNumber
              type="number"
              min={0}
              max={1500}
              step={1}
              value={356}
              onChange={() => {}}
            />
          </View>
          <View className="page-section">
            <Text>日期选择器</Text>
            <View>
              <Picker mode="date" onChange={() => {}} value={''}>
                <View className="picker">当前选择：</View>
              </Picker>
            </View>
          </View>
          <View className="page-section">
            <Text>时间选择器</Text>
            <View>
              <Picker mode="time" onChange={() => {}} value={''}>
                <View className="picker">当前选择：</View>
              </Picker>
            </View>
          </View>

          <AtButton type="primary" full={true}>
            保存
          </AtButton>
        </View>
      ) : null}
      {measureType === 'joint' ? <View></View> : null}
    </View>
  );
};

export default memo(SaveData);
