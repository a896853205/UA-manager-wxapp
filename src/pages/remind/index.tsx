import Taro, { memo, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSwipeAction, AtButton } from 'taro-ui';
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
    <View>
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
        <View
          style={{
            height: '160rpx',
          }}
        >
          闹钟1 16:38
        </View>
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
        <View
          style={{
            height: '160rpx',
          }}
        >
          闹钟1 16:38
        </View>
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
        <View
          style={{
            height: '160rpx',
          }}
        >
          闹钟1 16:38
        </View>
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
    </View>
  );
};

export default memo(Remind);
