import Taro, { useState, memo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';

import Measure from './measure';
import Patient from './patient';

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

interface Index {
  props: IProps;
}

const Index = () => {
  const [tabCur, setTabCur] = useState(1);

  return (
    <View>
      <View className="page">
        {tabCur === 0 ? <Measure /> : null}
        {tabCur === 1 ? <Patient /> : null}
      </View>
      <AtTabBar
        className="tab-bar"
        backgroundColor="rgb(250,250,250)"
        tabList={[
          { title: '测量', iconType: 'equalizer' },
          { title: '患者', iconType: 'streaming' },
        ]}
        onClick={(e) => {
          setTabCur(e);
        }}
        current={tabCur}
        fixed
      />
    </View>
  );
};

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

Index.config = {};

export default memo(Index);
