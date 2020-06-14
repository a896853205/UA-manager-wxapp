import Taro, { memo, useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtSwipeAction, AtListItem, AtButton, AtToast } from 'taro-ui';

import http from '../../../util/http';
import { PATIENT_LIST } from '../../../constants/api-constants';

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
  const [patientList, setPatientList] = useState<any>([]);
  const [getDataLoading, setGetDataLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setGetDataLoading(true);

      const res = await http({
        url: PATIENT_LIST,
        method: 'GET',
      });

      if (res.statusCode === 500) {
        console.log('获取列表失败');
      } else if (res.statusCode === 200) {
        setPatientList(res.data.data);

        if (res.data.data[0]) {
          Taro.setStorageSync('activePatient', res.data.data[0].uuid);
        }
      }

      setGetDataLoading(false);
    })();
  }, []);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '患者管理',
    });
  }, []);

  return (
    <View>
      <AtToast
        isOpened={getDataLoading}
        hasMask
        status="loading"
        text="患者信息加载中..."
      />
      <AtList>
        {patientList.map((patientItem) => (
          <AtSwipeAction
            key={patientItem.uuid}
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
              title={patientItem.name}
              arrow="right"
              note={`电话: ${patientItem.phone}`}
              iconInfo={{ value: 'check-circle', color: '#999' }}
            />
          </AtSwipeAction>
        ))}
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
