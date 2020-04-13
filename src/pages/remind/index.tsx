import Taro, { memo, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSwipeAction, AtButton, AtList, AtListItem } from 'taro-ui';
import { useSelector } from '@tarojs/redux';

interface IMeasure {
  measureText: string;
}
interface IStatus {
  measure: IMeasure;
}

const Remind = () => {
  const { measureText } = useSelector<IStatus, IMeasure>(
    (state) => state.measure
  );

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: `${measureText}提醒`,
    });
  }, [measureText]);

  return (
    <AtList>
      <AtSwipeAction
        options={[
          {
            text: '设置',
            style: {
              backgroundColor: '#6190E8',
            },
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#FF4949',
            },
          },
        ]}
      >
        <AtListItem title="闹钟1" arrow="right" extraText="16:38" />
      </AtSwipeAction>
      <AtSwipeAction
        options={[
          {
            text: '设置',
            style: {
              backgroundColor: '#6190E8',
            },
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#FF4949',
            },
          },
        ]}
      >
        <AtListItem title="闹钟2" arrow="right" extraText="16:39" />
      </AtSwipeAction>
      <AtSwipeAction
        options={[
          {
            text: '设置',
            style: {
              backgroundColor: '#6190E8',
            },
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#FF4949',
            },
          },
        ]}
      >
        <AtListItem title="闹钟3" arrow="right" extraText="16:40" />
      </AtSwipeAction>
      <AtButton
        full
        onClick={() => {
          Taro.navigateTo({ url: '/pages/save-remind/index' });
        }}
        type="primary"
      >
        添加闹铃
      </AtButton>
    </AtList>
  );
};

export default memo(Remind);
