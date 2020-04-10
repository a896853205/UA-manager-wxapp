import Taro, { memo } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { AtInput, AtCheckbox, AtButton } from 'taro-ui';
const SaveRemind = () => {
  return (
    <View>
      <View className="page-section">
        <Text>时间选择器</Text>
        <View>
          <Picker mode="time" onChange={() => {}} value={'0'}>
            <View className="picker">当前选择：</View>
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
                value: 'list1',
                label: 'iPhone X',
              },
              {
                value: 'list2',
                label: 'HUAWEI P20',
              },
              {
                value: 'list3',
                label: 'OPPO Find X',
              },
              {
                value: 'list4',
                label: 'vivo NEX',
              },
            ]}
            selectedList={[]}
            onChange={() => {}}
          />
        </View>
      </View>
      <AtButton full onClick={() => {}} type="primary">
        保存
      </AtButton>
    </View>
  );
};

export default memo(SaveRemind);
