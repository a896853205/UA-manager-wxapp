import Taro, { memo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';

import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui';
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
          <AtInput
            name="UA"
            title="尿酸值"
            type="number"
            placeholder="请输入尿酸值"
            value={'352'}
            onChange={() => {}}
          />

          <Picker mode="date" onChange={() => {}} value={''}>
            <AtList>
              <AtListItem
                title="日期选择："
                extraText={'2019年6月12日'}
                arrow="right"
              />
            </AtList>
          </Picker>

          <Picker mode="time" onChange={() => {}} value={''}>
            <AtList>
              <AtListItem
                title="时间选择："
                extraText={'19:00'}
                arrow="right"
              />
            </AtList>
          </Picker>

          <AtButton type="primary" full={true}>
            保存
          </AtButton>
        </View>
      ) : null}
      {measureType === 'joint' ? (
        <View>
          <AtInput
            name="UA"
            title="尿酸值"
            type="number"
            placeholder="请输入尿酸值"
            value={'352'}
            onChange={() => {}}
          />
          <AtInput
            name="UA"
            title="血脂值"
            type="number"
            placeholder="请输入血脂值"
            value={'352'}
            onChange={() => {}}
          />
          <AtInput
            name="UA"
            title="血糖值"
            type="number"
            placeholder="请输入血糖值"
            value={'352'}
            onChange={() => {}}
          />

          <Picker mode="date" onChange={() => {}} value={''}>
            <AtList>
              <AtListItem
                title="日期选择："
                extraText={'2019年6月12日'}
                arrow="right"
              />
            </AtList>
          </Picker>

          <Picker mode="time" onChange={() => {}} value={''}>
            <AtList>
              <AtListItem
                title="时间选择："
                extraText={'19:00'}
                arrow="right"
              />
            </AtList>
          </Picker>

          <AtButton type="primary" full={true}>
            保存
          </AtButton>
        </View>
      ) : null}
    </View>
  );
};

export default memo(SaveData);
