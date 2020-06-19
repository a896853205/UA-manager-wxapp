import Taro, { memo, useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtToast, AtMessage } from 'taro-ui';

import './doctor.css';

import doctorDefault from '../../assets/image/doctor-default.jpg';
import selected from '../../assets/icon/selected.png';

import http from '../../util/http';
import { DOCTOR_LIST } from '../../constants/api-constants';

const DOCTOR_LIST_SIZE = 5;

const Doctor = () => {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  const [doctorList, setDoctorList] = useState<any>([]);
  const [getDataLoading, setGetDataLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setGetDataLoading(true);

      const res = await http({
        url: DOCTOR_LIST,
        method: 'GET',
        data: {
          page: 0,
          limit: DOCTOR_LIST_SIZE,
        },
      });

      if (res.statusCode === 500) {
        Taro.atMessage({
          message: '获取列表失败',
          type: 'error',
        });
      } else if (res.statusCode === 200) {
        setDoctorList(res.data.data.rows);
      }

      setGetDataLoading(false);
    })();
  }, []);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '选择医生',
    });
  }, []);

  return (
    <View className="doctor-box">
      <AtToast
        isOpened={getDataLoading}
        hasMask
        status="loading"
        text="医生信息加载中..."
      />
      <AtMessage />
      <View className="current-doctor-box">
        <AtCard thumb={selected} title="当前医生选择">
          <AtList hasBorder={false}>
            <AtListItem
              title="钱医生"
              arrow="right"
              note="电话: 15998133472"
              thumb={doctorDefault}
            />
          </AtList>
        </AtCard>
      </View>
      <AtList>
        {doctorList.map((doctorItem) => (
          <AtListItem
            key={doctorItem.uuid}
            title={doctorItem.name}
            arrow="right"
            note={`电话: ${doctorItem.phone}`}
            thumb={doctorItem.avartar}
            extraText="查看详情"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/doctor-detail/index',
              });
            }}
          />
        ))}
      </AtList>
    </View>
  );
};

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default memo(Doctor);
