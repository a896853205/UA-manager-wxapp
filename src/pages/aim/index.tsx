import Taro, { memo, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';
import { useSelector } from '@tarojs/redux';

interface IMeasure {
  measureText: string;
  measureType: string;
}
interface IStatus {
  measure: IMeasure;
}

const Aim = () => {
  const { measureText, measureType } = useSelector<IStatus, IMeasure>(
    (state) => state.measure
  );

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: `${measureText}目标`,
    });
  }, [measureText]);

  return (
    <View>
      {measureType === 'single' ? (
        <AtInput
          name="UA"
          title="尿酸值"
          type="number"
          placeholder="请输入尿酸值的目标"
          value={'352'}
          onChange={() => {}}
        />
      ) : null}
      {measureType === 'joint' ? (
        <View>
          <AtInput
            name="UA"
            title="尿酸值"
            type="number"
            placeholder="请输入尿酸值的目标"
            value={'352'}
            onChange={() => {}}
          />
          <AtInput
            name="UA"
            title="血糖值"
            type="number"
            placeholder="请输入血糖值的目标"
            value={'352'}
            onChange={() => {}}
          />
          <AtInput
            name="UA"
            title="血脂值"
            type="number"
            placeholder="请输入血脂值的目标"
            value={'352'}
            onChange={() => {}}
          />
        </View>
      ) : null}
      <AtButton full onClick={() => {}} type="primary">
        保存
      </AtButton>
    </View>
  );
};

export default memo(Aim);
