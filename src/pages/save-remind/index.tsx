import Taro, { memo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { AtInput, AtCheckbox, AtButton, AtList, AtListItem } from 'taro-ui';
const SaveRemind = () => {
  return (
    <View>
      <Picker mode="time" onChange={() => {}} value={''}>
        <AtList>
          <AtListItem title="时间选择：" extraText={'19:00'} arrow="right" />
        </AtList>
      </Picker>
      <AtInput
        name="value"
        title="标签"
        type="text"
        placeholder="标签"
        value={''}
        onChange={() => {}}
      />
      <AtInput
        name="value"
        title="闹铃名称"
        type="text"
        placeholder="闹铃名称"
        value={'1'}
        onChange={() => {}}
      />
      <AtCheckbox
        options={[
          {
            value: '每周日',
            label: '每周日',
          },
          {
            value: '每周一',
            label: '每周一',
          },
          {
            value: '每周二',
            label: '每周二',
          },
          {
            value: '每周三',
            label: '每周三',
          },
          {
            value: '每周四',
            label: '每周四',
          },
          {
            value: '每周五',
            label: '每周五',
          },
          {
            value: '每周六',
            label: '每周六',
          },
        ]}
        selectedList={[]}
        onChange={() => {}}
      />
      <AtButton full onClick={() => {}} type="primary">
        保存
      </AtButton>
    </View>
  );
};

export default memo(SaveRemind);
