import Taro, { memo } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {};

type IProps = PageStateProps;

interface Recommend {
  props: IProps;
}

const Recommend = () => {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  return (
    <View>
      <View>精选专题</View>
      <Swiper
        className="swiper"
        indicatorColor="#ddd"
        indicatorActiveColor="#6190e8"
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className="swiper-item">
            <Image
              className="img"
              mode="aspectFit"
              src="https://s1.ax1x.com/2020/04/13/GjQAN4.jpg"
            />
            <View>为您提供一站式服务</View>
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className="swiper-item">
            <Image
              className="img"
              mode="aspectFit"
              src="https://s1.ax1x.com/2020/04/13/GjQkEF.jpg"
            />
            <View>您的健康安心掌握</View>
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className="swiper-item">
            <Image
              className="img"
              mode="aspectFit"
              src="https://s1.ax1x.com/2020/04/13/GjQiHU.jpg"
            />
            <View>时刻关注您的健康</View>
          </View>
        </SwiperItem>
      </Swiper>
      <View>
        <View>
          <View>
            <Text></Text>
            <Text>
              <Text></Text>
              <Text></Text>
            </Text>
          </View>
          <Image src="" />
        </View>
        <View>
          <View>
            <Text></Text>
            <Text>
              <Text></Text>
              <Text></Text>
            </Text>
          </View>
          <Image src="" />
        </View>
        <View>
          <View>
            <Text></Text>
            <Text>
              <Text></Text>
              <Text></Text>
            </Text>
          </View>
          <Image src="" />
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

export default memo(Recommend);
