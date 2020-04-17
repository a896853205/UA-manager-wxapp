import Taro, { memo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';

const AddPatient = () => {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  return (
    <View>
      <AtInput
        name="name"
        title="姓名"
        type="text"
        placeholder="患者姓名"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="phone"
        title="手机号"
        type="number"
        placeholder="患者本人手机号"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="identity"
        title="身份证号"
        type="text"
        placeholder="患者本人身份证号"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="address"
        title="家庭住址"
        type="text"
        placeholder="患者本人家庭住址"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="address"
        title="亲属姓名"
        type="text"
        placeholder="患者的亲属姓名"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="address"
        title="亲属与患者关系"
        type="text"
        placeholder="亲属与患者关系"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtInput
        name="address"
        title="亲属手机号"
        type="number"
        placeholder="亲属手机号"
        value=""
        onChange={(e) => {
          console.log(e);
        }}
      />
      <AtButton full type="primary">
        保存
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

export default memo(AddPatient);
