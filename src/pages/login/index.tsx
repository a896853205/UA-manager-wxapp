import Taro, { memo, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtMessage } from 'taro-ui';
import md5 from 'md5';

import { AUTHORIZE } from '../../constants/api-constants';
import http from '../../util/http';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const authorize = () => {
    if (!loginLoading) {
      setLoginLoading(true);

      http({
        url: AUTHORIZE,
        method: 'POST',
        data: {
          username,
          password: md5(password),
        },
      }).then((res) => {
        if (res.statusCode === 500) {
          Taro.atMessage({
            message: '密码错误',
            type: 'error',
          });
        } else if (res.statusCode === 200) {
          Taro.setStorageSync('token', res.data.data.token);

          Taro.redirectTo({
            url: '../../pages/index/index',
          });
        }

        setLoginLoading(false);
      });
    }
  };

  return (
    <View>
      <AtMessage />
      <AtForm>
        <AtInput
          name="value2"
          title="账号"
          type="text"
          placeholder="请输入社区志愿者账号"
          value=""
          onChange={(e) => {
            setUsername(`${e}`);
          }}
        />
        <AtInput
          name="value3"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value=""
          onChange={(e) => {
            setPassword(`${e}`);
          }}
        />
        <AtButton
          full
          type="primary"
          loading={loginLoading}
          onClick={() => {
            authorize();
          }}
        >
          登录
        </AtButton>
      </AtForm>
    </View>
  );
};

export default memo(Login);
