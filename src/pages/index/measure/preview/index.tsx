import Taro, { memo } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

// 样式
import { AtGrid } from 'taro-ui';
import './preview.css';

// icon
import refresh from '../../../../assets/icon/refresh.png';
import aim from '../../../../assets/icon/aim.png';
import bar from '../../../../assets/icon/bar.png';
import clock from '../../../../assets/icon/clock.png';
import config from '../../../../assets/icon/config.png';
import newspaper from '../../../../assets/icon/newspaper.png';

const Preview = () => {
  return (
    <View className="page">
      <View className="value-preview-box">
        <View className="measure-preview">
          351<Text className="measure-unit">mmol/L</Text>
        </View>
        <View className="measure-description">
          连续<Text className="day">10</Text>天高于目标值
        </View>
      </View>

      <AtGrid
        columnNum={3}
        onClick={(_item, index) => {
          console.log(_item, index);
          switch (index) {
            case 0:
              Taro.navigateTo({ url: '/pages/sync-data/index' });
              break;
            case 1:
              Taro.navigateTo({ url: '/pages/data-detail/index' });
              break;
            case 2:
              Taro.navigateTo({ url: '/pages/remind/index' });
              break;
            case 3:
              Taro.navigateTo({ url: '/pages/aim/index' });
              break;
            default:
          }
        }}
        data={[
          {
            image: refresh,
            value: '同步数据',
          },

          {
            image: bar,
            value: '数据详情',
          },
          {
            image: clock,
            value: '提醒设置',
          },
          {
            image: aim,
            value: '目标设置',
          },
          {
            image: newspaper,
            value: '最新新闻',
          },
          {
            image: config,
            value: '设备设置',
          },
        ]}
      />
    </View>
  );
};

export default memo(Preview);
