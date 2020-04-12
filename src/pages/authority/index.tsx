import Taro, { memo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './authority.css';

import authority from '../../assets/image/authority.png';

const Authority = () => {
  return (
    <View>
      <Image
        src={authority}
        style={{
          width: '100%',
        }}
      />
      <View className="button-group">
        <View
          className="btn primary"
          onClick={() => {
            Taro.redirectTo({
              url: '../../pages/index/index',
            });
          }}
        >
          我是患者
        </View>
        <View
          className="btn secondary"
          onClick={() => {
            Taro.redirectTo({
              url: '../../pages/login/index',
            });
          }}
        >
          我是医生
        </View>
      </View>
    </View>
  );
};

export default memo(Authority);
