// TODO: 将data-detail的折线组件抽象到这里
import Taro, { useState, memo } from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { useSelector } from '@tarojs/redux';
import Chart from 'taro-echarts';

import './line.css';

interface IMeasure {
  measureText: string;
  measureType: string;
}
interface IStatus {
  measure: IMeasure;
}

const TIME_RANGE = ['过去一周', '过去一个月'];

const Line = () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);
  const { measureType } = useSelector<IStatus, IMeasure>(
    (state) => state.measure
  );

  return (
    <View>
      {/* FIXME: 多一个自定义时间,点到自定义时间时就多出一个Picker */}
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
      {/* FIXME: 需要将图表组件提出 */}
      {measureType === 'single' ? (
        <View className="line-box">
          <View className="line-title">尿酸</View>
          <Chart
            chartId={'1'}
            option={{
              grid: {
                left: '50px',
                right: '50px',
              },
              xAxis: {
                type: 'category',
                data: ['一', '二', '三', '四', '五', '六', '日'],
                name: '星期',
              },
              yAxis: {
                type: 'value',
                name: 'mmol/L',
              },
              series: [
                {
                  data: [160, 351, 652, 352, 849, 352, 849],
                  type: 'line',
                },
              ],
              animation: false,
            }}
          />
        </View>
      ) : null}
      {measureType === 'joint' ? (
        <View className="line-box">
          <View className="line-title">尿酸</View>
          <Chart
            chartId={'1'}
            option={{
              grid: {
                left: '50px',
                right: '50px',
              },
              xAxis: {
                type: 'category',
                data: ['一', '二', '三', '四', '五', '六', '日'],
                name: '星期',
              },
              yAxis: {
                type: 'value',
                name: 'mmol/L',
              },
              series: [
                {
                  data: [160, 351, 652, 352, 849, 352, 849],
                  type: 'line',
                },
              ],
              animation: false,
            }}
          />
          <View className="line-title">血脂</View>
          <Chart
            chartId={'1'}
            option={{
              grid: {
                left: '50px',
                right: '50px',
              },
              xAxis: {
                type: 'category',
                data: ['一', '二', '三', '四', '五', '六', '日'],
                name: '星期',
              },
              yAxis: {
                type: 'value',
                name: 'mmol/L',
              },
              series: [
                {
                  data: [160, 351, 652, 352, 849, 352, 849],
                  type: 'line',
                },
              ],
              animation: false,
            }}
          />
          <View className="line-title">血糖</View>
          <Chart
            chartId={'1'}
            option={{
              grid: {
                left: '50px',
                right: '50px',
              },
              xAxis: {
                type: 'category',
                data: ['一', '二', '三', '四', '五', '六', '日'],
                name: '星期',
              },
              yAxis: {
                type: 'value',
                name: 'mmol/L',
              },
              series: [
                {
                  data: [160, 351, 652, 352, 849, 352, 849],
                  type: 'line',
                },
              ],
              animation: false,
            }}
          />
        </View>
      ) : null}
      <AtButton
        type="primary"
        size="normal"
        full={true}
        onClick={() => {
          Taro.navigateTo({ url: '/pages/save-data/index' });
        }}
      >
        手动添加数据
      </AtButton>
    </View>
  );
};

export default memo(Line);
