import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Authority from './pages/authority/index';

import configStore from './store';

import './custom-variables.scss';
import './app.css';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/authority/index',
      'pages/index/index',
      'pages/device/index',
      'pages/news-detail/index',
      'pages/sync-data/index',
      'pages/save-data/index',
      'pages/save-remind/index',
      'pages/add-patient/index',
      'pages/login/index',
      'pages/doctor/index',
      'pages/doctor-detail/index',
      'pages/patient-analytics/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2f74f3',
      navigationBarTitleText: '尿酸管理',
      navigationBarTextStyle: 'white',
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Authority />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
