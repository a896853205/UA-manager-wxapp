import Taro, { memo, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtMessage } from 'taro-ui';

import { PATIENT_SAVE } from '../../constants/api-constants';
import http from '../../util/http';

const AddPatient = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [identity, setIdentity] = useState('');
  const [address, setAddress] = useState('');
  const [RelativeName, setRelativeName] = useState('');
  const [relativeRelation, setRelativeRelation] = useState('');
  const [RelativePhone, setRelativePhone] = useState('');
  const [saveDataLoading, setSaveDataLoading] = useState(false);

  const submit = async () => {
    if (!saveDataLoading) {
      setSaveDataLoading(true);

      const res = await http({
        url: PATIENT_SAVE,
        method: 'POST',
        data: {
          name: name,
          gender: 1,
          identify: identity,
          phone: phone,
          address: address,
          relative_name: RelativeName,
          relative_relation: relativeRelation,
          relative_phone: RelativePhone,
        },
      });

      if (res.statusCode === 500) {
        Taro.atMessage({
          message: '增加失败',
          type: 'error',
        });
      } else if (res.statusCode === 200) {
        Taro.redirectTo({
          url: '../../pages/index/index',
        });
      }

      setSaveDataLoading(false);
    }
  };
  // name
  // gender
  // identify
  // phone
  // address
  // relative_name
  // relative_relation
  // relative_phone

  return (
    <View>
      <AtMessage />
      <AtInput
        name="name"
        title="姓名"
        type="text"
        placeholder="患者姓名"
        value=""
        onChange={(e) => {
          setName(`${e}`);
        }}
      />
      <AtInput
        name="phone"
        title="手机号"
        type="number"
        placeholder="患者本人手机号"
        value=""
        onChange={(e) => {
          setPhone(`${e}`);
        }}
      />
      <AtInput
        name="identity"
        title="身份证号"
        type="text"
        placeholder="患者本人身份证号"
        value=""
        onChange={(e) => {
          setIdentity(`${e}`);
        }}
      />
      <AtInput
        name="address"
        title="家庭住址"
        type="text"
        placeholder="患者本人家庭住址"
        value=""
        onChange={(e) => {
          setAddress(`${e}`);
        }}
      />
      <AtInput
        name="address"
        title="亲属姓名"
        type="text"
        placeholder="患者的亲属姓名"
        value=""
        onChange={(e) => {
          setRelativeName(`${e}`);
        }}
      />
      <AtInput
        name="address"
        title="亲属与患者关系"
        type="text"
        placeholder="亲属与患者关系"
        value=""
        onChange={(e) => {
          setRelativeRelation(`${e}`);
        }}
      />
      <AtInput
        name="address"
        title="亲属手机号"
        type="number"
        placeholder="亲属手机号"
        value=""
        onChange={(e) => {
          setRelativePhone(`${e}`);
        }}
      />

      <AtButton full type="primary" onClick={submit} loading={saveDataLoading}>
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
