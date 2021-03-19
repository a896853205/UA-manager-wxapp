// TODO: 上面时间段选择,饼图分析(几次偏高,几次正常),总次数,连续高位次数,最高mmol/L,最长高位天数
// TODO: 将data-detail的折线组件抽象到这里
import Taro, { memo, useState, useEffect } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtToast, AtMessage } from 'taro-ui';

import { PATIENT_STAT } from '../../constants/api-constants';
import http from '../../util/http';

import './patient-analytics.css';

const TIME_RANGE = ['过去一周', '过去一个月'];

const PatientAnalysis = () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);
  const [patientList, setPatientList] = useState<any>([]);
  const [getDataLoading, setGetDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setGetDataLoading(true);

      const res = await http({
        url: PATIENT_STAT,
        method: 'GET',
        data: {
          days: timeSpanIndex ? 30 : 7,
        },
      });

      if (res.statusCode === 500) {
        Taro.atMessage({
          message: '获取列表失败',
          type: 'error',
        });
      } else if (res.statusCode === 200) {
        setPatientList(res.data.data);
      }

      setGetDataLoading(false);
    })();
  }, [timeSpanIndex]);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '患者统计',
    });
  }, []);

  return (
    <View className="patient-analytics-box">
      <AtToast
        isOpened={getDataLoading}
        hasMask
        status="loading"
        text="患者信息加载中..."
      />
      <AtMessage />
      <Picker
        mode="selector"
        range={TIME_RANGE}
        onChange={(e) => {
          setTimeSpanIndex(+e.detail.value);
        }}
        value={timeSpanIndex}
      >
        <AtList>
          <AtListItem
            title="时间段选择："
            extraText={TIME_RANGE[timeSpanIndex]}
            arrow="right"
          />
        </AtList>
      </Picker>
      <View className="card-box">
        <AtCard title="患者统计">
          {`在${TIME_RANGE[timeSpanIndex]}内: 一共${patientList.length}个患者`}
        </AtCard>
      </View>

      <AtList>
        {patientList.map((patientItem) => (
          <AtListItem
            key={patientItem.uuid}
            onClick={(e) => {
              console.log(e);
            }}
            title={patientItem.name}
            note={`电话: ${patientItem.phone}`}
          />
        ))}
      </AtList>
    </View>
  );
};

export default memo(PatientAnalysis);
