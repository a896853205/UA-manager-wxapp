import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { useSelector } from '@tarojs/redux';
import Chart from 'taro-echarts';

// 样式
import './data-detail.css';

interface IMeasure {
  measureText: string;
}
interface IStatus {
  measure: IMeasure;
}

const TIME_RANGE = ['过去一周', '过去一个月'];
const TAB_LIST = [{ title: '折线' }, { title: '统计' }];

export default () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const { measureText } = useSelector<IStatus, IMeasure>(
    (state) => state.measure
  );

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: measureText,
    });
  }, [measureText]);

  return (
    <AtTabs
      current={tabIndex}
      tabList={TAB_LIST}
      onClick={(e) => {
        setTabIndex(e);
      }}
    >
      <AtTabsPane current={0} index={0}>
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
            <View className="picker">
              <Text>时间段选择：</Text>
              <Text className="picker-value">{TIME_RANGE[timeSpanIndex]}</Text>
            </View>
          </Picker>
          {/* FIXME: 这里根据redux中选择哪个chart Components */}
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
                name: '微摩尔',
              },
              series: [
                {
                  data: [160, 351, 652, 352, 849, 352, 849],
                  type: 'line',
                },
              ],
            }}
          />
        </View>
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
      </AtTabsPane>
      <AtTabsPane current={1} index={1}>
        <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
          标签页二的内容
        </View>
      </AtTabsPane>
    </AtTabs>
  );
};
