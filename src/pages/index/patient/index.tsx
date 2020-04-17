import Taro, { memo, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtSwipeAction, AtListItem, AtButton } from 'taro-ui';

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

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '患者管理',
    });
  }, []);

  return (
    <View>
      <AtList>
        <AtSwipeAction
          options={[
            {
              text: '选择',
              style: {
                backgroundColor: '#6190E8',
              },
            },
            {
              text: '修改',
              style: {
                backgroundColor: '#FF4949',
              },
            },
          ]}
        >
          <AtListItem
            title="钱程"
            arrow="right"
            note="电话: 15998133472"
            iconInfo={{ value: 'check-circle', color: '#999' }}
          />
        </AtSwipeAction>
        <AtSwipeAction
          options={[
            {
              text: '选择',
              style: {
                backgroundColor: '#6190E8',
              },
            },
            {
              text: '修改',
              style: {
                backgroundColor: '#FF4949',
              },
            },
          ]}
        >
          <AtListItem title="张三" arrow="right" note="电话: -" />
        </AtSwipeAction>
        <AtSwipeAction
          options={[
            {
              text: '选择',
              style: {
                backgroundColor: '#6190E8',
              },
            },
            {
              text: '修改',
              style: {
                backgroundColor: '#FF4949',
              },
            },
          ]}
        >
          <AtListItem title="李四" arrow="right" note="电话: 1599816589" />
        </AtSwipeAction>
      </AtList>
      <AtButton
        full
        type="primary"
        onClick={() => Taro.navigateTo({ url: '/pages/add-patient/index' })}
      >
        添加患者
      </AtButton>
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
