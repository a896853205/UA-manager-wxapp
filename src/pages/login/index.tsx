import Taro, { memo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtForm, AtButton } from 'taro-ui';

const Login = () => {
  return (
    <View>
      <AtForm>
        <AtInput
          name="value2"
          title="账号"
          type="number"
          placeholder="请输入社区志愿者账号"
          value=""
          onChange={(e) => {
            console.log(e);
          }}
        />
        <AtInput
          name="value3"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value=""
          onChange={(e) => {
            console.log(e);
          }}
        />
        <AtButton
          full
          type="primary"
          onClick={() => {
            Taro.redirectTo({
              url: '../../pages/index/index',
            });
          }}
        >
          登录
        </AtButton>
      </AtForm>
    </View>
  );
};

export default memo(Login);
