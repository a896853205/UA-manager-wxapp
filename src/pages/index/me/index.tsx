import Taro, { memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import './me.css';
import meTopBackground from '../../../assets/image/me-top-background.png';
type PageStateProps = {};

type IProps = PageStateProps;

interface Me {
  props: IProps;
}

const Me = () => {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  return (
    <View className="me-box">
      <Image src={meTopBackground} className="me-background" mode="widthFix" />
      <View className="me-list">
        <View className="me-item me-profile">
          <Image
            src="https://img2.woyaogexing.com/2020/04/14/fa870d305ba64868a585b8ccbd270a5b!400x400.jpeg"
            className="me-head-profile"
          />
          <View className="me-describe">
            <Text>用户名</Text>
            <Text className="me-position">哈尔滨</Text>
          </View>
        </View>
        <View className="me-item">
          <View className="item-title">健康档案</View>
          <View className="item-list">
            <View className="item-cell">
              <AtIcon value="bookmark" size="40" color="#E93B3D" />
              <View className="item-name">我的档案</View>
            </View>
          </View>
        </View>
        <View className="me-item">
          <View className="item-title">我的亲友</View>
          <View className="item-list">
            <View className="item-cell">
              <AtIcon value="list" size="40" color="#E93B3D" />
              <View className="item-name">亲友列表</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default memo(Me);
