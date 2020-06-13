import Taro, { memo, useEffect, useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useSelector } from '@tarojs/redux';
import { AtGrid } from 'taro-ui';

import { MEASURE_LATEST } from '../../../../constants/api-constants';
import http from '../../../../util/http';

// icon
import './preview.css';
import refresh from '../../../../assets/icon/refresh.png';
import config from '../../../../assets/icon/config.png';
import doctor from '../../../../assets/icon/doctor.png';

interface Imeasure {
  measureType: string;
}
interface Istatus {
  measure: Imeasure;
}

const Preview = () => {
  const { measureType } = useSelector<Istatus, Imeasure>(
    (state) => state.measure
  );
  const activePatientUuid = Taro.getStorageSync('activePatient');
  const [uric, setUric] = useState(0);

  const [TUric, setTUric] = useState(0);
  const [fat, setFat] = useState(0);
  const [sugar, setSugar] = useState(0);

  useEffect(() => {
    http({
      url: MEASURE_LATEST,
      method: 'GET',
      data: {
        uuid: Taro.getStorageSync('activePatient'),
        type: measureType,
      },
    }).then((res) => {
      if (res.statusCode === 500) {
        console.log('获取基本数据失败');
      } else if (res.statusCode === 200) {
        if (measureType === 'single') {
          setUric(res.data.data.uric);
        } else if (measureType === 'triple') {
          setTUric(res.data.data.uric);
          setFat(res.data.data.fat);
          setSugar(res.data.data.sugar);
        }
      }
    });
  }, [activePatientUuid, measureType]);

  return (
    <View className="page">
      {measureType === 'single' ? (
        <View className="value-preview-box">
          <View className="measure-preview">
            {uric}
            <Text className="measure-unit">umol/L</Text>
          </View>
          <View className="measure-description">
            连续<Text className="day">10</Text>天高于目标值
          </View>
        </View>
      ) : null}
      {measureType === 'triple' ? (
        <View className="value-preview-box measure-triple-preview">
          <View className="row">连续高位</View>
          <View className="row">
            <Text className="measure-project">尿酸</Text>
            <Text className="measure-value">
              <Text className="value-num">{TUric}</Text>
              <Text className="measure-unit">umol/L</Text>
            </Text>
            <Text>
              <Text className="day">10</Text>天
            </Text>
          </View>
          <View className="row">
            <Text className="measure-project">血脂</Text>
            <Text className="measure-value">
              <Text className="value-num">{fat}</Text>
              <Text className="measure-unit">mmol/L</Text>
            </Text>
            <Text>
              <Text className="day">10</Text>天
            </Text>
          </View>
          <View className="row">
            <Text className="measure-project">血糖</Text>
            <Text className="measure-value">
              <Text className="value-num">{sugar}</Text>
              <Text className="measure-unit">mmol/L</Text>
            </Text>
            <Text>
              <Text className="day">10</Text>天
            </Text>
          </View>
        </View>
      ) : null}
      <AtGrid
        columnNum={3}
        onClick={(_item, index) => {
          switch (index) {
            case 0:
              Taro.navigateTo({ url: '/pages/sync-data/index' });
              break;
            case 1:
              Taro.navigateTo({ url: '/pages/device/index' });
              break;
            case 3:
              // Taro.navigateTo({ url: '/pages/data-detail/index' });
              break;
            case 2:
              Taro.navigateTo({ url: '/pages/doctor/index' });
              break;
            default:
          }
        }}
        data={[
          {
            image: refresh,
            value: '同步数据',
          },

          // {
          //   image: bar,
          //   value: '数据详情',
          // },
          {
            image: config,
            value: '设备设置',
          },
          {
            image: doctor,
            value: '医生选择',
          },
        ]}
      />
    </View>
  );
};

export default memo(Preview);
