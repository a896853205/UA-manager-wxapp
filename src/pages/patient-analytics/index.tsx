// TODO: 上面时间段选择,饼图分析(几次偏高,几次正常),总次数,连续高位次数,最高mmol/L,最长高位天数
// TODO: 将data-detail的折线组件抽象到这里
import Taro, { memo, useState, useEffect } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui';

import './patient-analytics.css';

const TIME_RANGE = ['过去一周', '过去一个月'];

const PatientAnalysis = () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '患者统计',
    });
  }, []);

  return (
    <View className="patient-analytics-box">
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
        <AtCard extra="额外信息" title="患者统计">
          在一周内: 一共3个患者
        </AtCard>
      </View>

      <AtList>
        <AtListItem title="钱程" arrow="right" note="电话: 15998133472" />
        <AtListItem title="张三" arrow="right" note="电话: -" />
        <AtListItem title="李四" arrow="right" note="电话: 1599816589" />
      </AtList>
    </View>
  );
};

export default memo(PatientAnalysis);
