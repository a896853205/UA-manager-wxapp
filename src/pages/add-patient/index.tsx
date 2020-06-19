import Taro, { memo, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtMessage, AtForm } from 'taro-ui';

import {
  PATIENT_DETAIL,
  PATIENT_SAVE,
  PATIENT_UPDATE,
} from '../../constants/api-constants';
import http from '../../util/http';

const AddPatient = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [identify, setIdentify] = useState('');
  const [address, setAddress] = useState('');
  const [relativeName, setRelativeName] = useState('');
  const [relativeRelation, setRelativeRelation] = useState('');
  const [relativePhone, setRelativePhone] = useState('');
  const [saveDataLoading, setSaveDataLoading] = useState(false);
  const patientUuid = Taro.getStorageSync('modifyPatient');

  useEffect(() => {
    (async () => {
      if (patientUuid) {
        const res = await http({
          url: PATIENT_DETAIL,
          method: 'GET',
          data: {
            uuid: Taro.getStorageSync('modifyPatient'),
          },
        });

        if (res) {
          setName(res.data.data.name);
          setPhone(res.data.data.phone);
          setIdentify(res.data.data.identify);
          setAddress(res.data.data.address);
          setRelativeName(res.data.data.relative_name);
          setRelativeRelation(res.data.data.relative_relation);
          setRelativePhone(res.data.data.relative_phone);
        }
      }
    })();
  }, [patientUuid]);

  const submit = async () => {
    if (!saveDataLoading) {
      setSaveDataLoading(true);

      let res;
      const params = {
        name: name,
        gender: 1,
        identify: identify,
        phone: phone,
        address: address,
        relative_name: relativeName,
        relative_relation: relativeRelation,
        relative_phone: relativePhone,
      };

      if (patientUuid) {
        res = await http({
          url: PATIENT_UPDATE,
          method: 'POST',
          data: {
            uuid: patientUuid,
            ...params,
          },
        });
      } else {
        res = await http({
          url: PATIENT_SAVE,
          method: 'POST',
          data: {
            ...params,
          },
        });
      }

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
      <AtForm onSubmit={submit}>
        <AtInput
          name="name"
          title="姓名"
          type="text"
          placeholder="患者姓名"
          value={name}
          onChange={(e) => {
            setName(`${e}`);
          }}
        />
        <AtMessage />
        <AtInput
          name="phone"
          title="手机号"
          type="number"
          placeholder="患者本人手机号"
          value={phone}
          onChange={(e) => {
            setPhone(`${e}`);
          }}
        />
        <AtInput
          name="identity"
          title="身份证号"
          type="text"
          placeholder="患者本人身份证号"
          value={identify}
          onChange={(e) => {
            setIdentify(`${e}`);
          }}
        />
        <AtInput
          name="address"
          title="家庭住址"
          type="text"
          placeholder="患者本人家庭住址"
          value={address}
          onChange={(e) => {
            setAddress(`${e}`);
          }}
        />
        <AtInput
          name="address"
          title="亲属姓名"
          type="text"
          placeholder="患者的亲属姓名"
          value={relativeName}
          onChange={(e) => {
            setRelativeName(`${e}`);
          }}
        />
        <AtInput
          name="address"
          title="亲属与患者关系"
          type="text"
          placeholder="亲属与患者关系"
          value={relativeRelation}
          onChange={(e) => {
            setRelativeRelation(`${e}`);
          }}
        />
        <AtInput
          name="address"
          title="亲属手机号"
          type="number"
          placeholder="亲属手机号"
          value={relativePhone}
          onChange={(e) => {
            setRelativePhone(`${e}`);
          }}
        />

        <AtButton
          full
          formType="submit"
          type="primary"
          loading={saveDataLoading}
        >
          保存
        </AtButton>
      </AtForm>
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
