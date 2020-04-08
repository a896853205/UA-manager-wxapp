import Taro, { useState } from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import Chart from 'taro-echarts';

// 样式
import './data-detail.css';

const TIME_RANGE = ['过去一周', '过去一个月'];

export default () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);
  return (
    <AtTabs
      current={0}
      tabList={[{ title: '折线' }, { title: '统计' }]}
      onClick={() => {}}
    >
      <AtTabsPane current={0} index={0}>
        <View>
          <Picker
            mode="selector"
            range={TIME_RANGE}
            onChange={(e) => {
              setTimeSpanIndex(+e.detail.value);
            }}
            value={timeSpanIndex}
          >
            <View className="picker">
              <Text>时间段选择：</Text>
              <Text className="picker-value">{TIME_RANGE[timeSpanIndex]}</Text>
            </View>
          </Picker>
          <Chart
            chartId={'1'}
            option={{
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                },
              ],
            }}
          />
        </View>
      </AtTabsPane>
      <AtTabsPane current={1} index={1}>
        <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
          标签页二的内容
        </View>
      </AtTabsPane>
    </AtTabs>
  );
};
