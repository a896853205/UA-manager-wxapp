import Taro, { memo, useEffect, useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtGrid, AtToast, AtMessage } from 'taro-ui';
import { changeSelectedPreview } from '../../../../actions/preview';

import {
  MEASURE_LATEST,
  DOCTOR_ACTIVE,
  PATIENT_DETAIL,
} from '../../../../constants/api-constants';
import http from '../../../../util/http';

// icon
import './preview.css';
// import refresh from '../../../../assets/icon/refresh.png';
import config from '../../../../assets/icon/config.png';
import doctor from '../../../../assets/icon/doctor.png';

interface Imeasure {
  measureType: string;
}

interface Ipreview {
  isChanged: boolean;
}
interface Istatus {
  measure: Imeasure;
  preview: Ipreview;
}

const Preview = () => {
  const { measureType } = useSelector<Istatus, Imeasure>(
    (state) => state.measure
  );
  const activePatientUuid = Taro.getStorageSync('activePatient');
  const { isChanged } = useSelector<Istatus, Ipreview>(
    (state) => state.preview
  );
  const [uric, setUric] = useState(0);

  const [TUric, setTUric] = useState(0);
  const [fat, setFat] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [getDataLoading, setGetDataLoading] = useState(true);
  const [activeDoctorLoading, setActiveDoctorLoading] = useState(true);
  const [activeDoctorList, setActiveDoctorList] = useState<any>([]);
  const activePatient = Taro.getStorageSync('activePatient');
  const [isNeedRefresh, setIsNeedRefresh] = useState(true);
  const [patient, setPatient] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setGetDataLoading(true);
      const res = await http({
        url: MEASURE_LATEST,
        method: 'GET',
        data: {
          uuid: Taro.getStorageSync('activePatient'),
          type: measureType,
        },
      });

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

      const patientInfo = await http({
        url: PATIENT_DETAIL,
        method: 'GET',
        data: {
          uuid: Taro.getStorageSync('activePatient'),
        },
      });

      if (patientInfo.statusCode === 500) {
        console.log('获取患者姓名失败');
      }

      if (patientInfo) {
        setPatient(patientInfo.data.data.name);
      };
      
      setGetDataLoading(false);
    })();
  }, [activePatientUuid, measureType]);

  useEffect(() => {
    if (isNeedRefresh) {
      (async () => {
        setActiveDoctorLoading(true);

        const res = await http({
          url: DOCTOR_ACTIVE,
          method: 'GET',
          data: {
            uuid: activePatient,
          },
        });

        if (res.statusCode === 500) {
          Taro.atMessage({
            message: '获取选择列表失败',
            type: 'error',
          });
        } else if (res.statusCode === 200) {
          setActiveDoctorList(res.data.data);
        }

        setActiveDoctorLoading(false);
        setIsNeedRefresh(false);
      })();
    }
  }, [activePatient, isNeedRefresh]);

  useEffect(() => {
    if (isChanged) {
      setIsNeedRefresh(true);
      dispatch(changeSelectedPreview(false));
    }
  }, [isChanged, dispatch]);

  return (
    <View className="page">
      <AtMessage />
      <AtToast
        isOpened={getDataLoading}
        hasMask
        status="loading"
        text="测量数据加载中..."
      />
      <AtToast
        isOpened={activeDoctorLoading}
        hasMask
        status="loading"
        text="信息加载中..."
      />
      {measureType === 'single' ? (
        <View className="value-preview-box">
          <View className="measure-title">
            <Text className="patient-name">{patient}</Text>
          </View>
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
          <View className="row">
            <Text className="patient-name">{patient}</Text>
            <Text className="high-continue">连续高位</Text>
          </View>
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
            // case 0:
            //   Taro.navigateTo({ url: '/pages/sync-data/index' });
            //   break;
            case 0:
              if (activeDoctorList.length !== 0) {
                Taro.navigateTo({ url: '/pages/device/index' });
              } else {
                Taro.atMessage({
                  message: '请先选择医生再同步数据',
                  type: 'error',
                });
              }

              break;
            case 3:
              // Taro.navigateTo({ url: '/pages/data-detail/index' });
              break;
            case 1:
              Taro.navigateTo({ url: '/pages/doctor/index' });
              break;
            default:
          }
        }}
        data={[
          // {
          //   image: refresh,
          //   value: '同步数据',
          // },

          // {
          //   image: bar,
          //   value: '数据详情',
          // },
          {
            image: config,
            value: '同步数据',
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
