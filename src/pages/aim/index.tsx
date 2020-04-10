import Taro, { memo, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInputNumber, AtButton } from 'taro-ui';
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
        <AtInputNumber
          type="number"
          min={0}
          max={1500}
          step={1}
          width={200}
          value={0}
          onChange={() => {}}
        />
      ) : null}
      {measureType === 'joint' ? (
        <View>
          <AtInputNumber
            type="number"
            min={0}
            max={1500}
            step={1}
            width={200}
            value={0}
            onChange={() => {}}
          />
          <AtInputNumber
            type="number"
            min={0}
            max={1500}
            step={1}
            width={200}
            value={0}
            onChange={() => {}}
          />
          <AtInputNumber
            type="number"
            min={0}
            max={1500}
            step={1}
            width={200}
            value={0}
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
