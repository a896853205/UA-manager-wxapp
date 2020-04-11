import Taro, { useState, useEffect, memo } from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtButton, AtIcon } from 'taro-ui';
import { useSelector } from '@tarojs/redux';
import Chart from 'taro-echarts';

// 样式
import './data-detail.css';

interface IMeasure {
  measureText: string;
  measureType: string;
}
interface IStatus {
  measure: IMeasure;
}

const TIME_RANGE = ['过去一周', '过去一个月'];
const TAB_LIST = [{ title: '折线' }, { title: '统计' }];

const DataDetail = () => {
  const [timeSpanIndex, setTimeSpanIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const { measureText, measureType } = useSelector<IStatus, IMeasure>(
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
          {/* FIXME: 需要将图表组件提出 */}
          {measureType === 'single' ? (
            <View className='line-box'>
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
          ) : null}
          {measureType === 'joint' ? (
            <View className='line-box'>
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
          ) : null}
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
        <View>
          {measureType === 'single' ? (
            <View className="analysis-box">
              <View className="analysis-title">尿酸</View>
              <Chart
                chartId={'1'}
                option={{
                  series: [
                    {
                      data: [
                        {
                          // 数据项的名称
                          name: '偏高',
                          // 数据项值8
                          value: 10,
                        },
                        {
                          name: '正常',
                          value: 20,
                        },
                      ],
                      type: 'pie',
                    },
                  ],
                  color: ['rgb(255, 107, 132)', 'rgb(147, 206, 84)'],
                }}
              />
              <View className="analysis-describe">
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(255, 107, 132)"
                    className="tag"
                  />
                  偏高<Text className="red-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(147, 206, 84)"
                    className="tag"
                  />
                  正常<Text className="green-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  总共<Text className="blue-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  连续高位<Text className="blue-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最高<Text className="blue-num">652</Text>mmol/L
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最长高位<Text className="blue-num">6</Text>天
                </View>
              </View>
            </View>
          ) : null}
          {measureType === 'joint' ? (
            <View className="analysis-box">
              <View className="analysis-title">尿酸</View>
              <Chart
                chartId={'1'}
                option={{
                  series: [
                    {
                      data: [
                        {
                          // 数据项的名称
                          name: '偏高',
                          // 数据项值8
                          value: 10,
                        },
                        {
                          name: '正常',
                          value: 20,
                        },
                      ],
                      type: 'pie',
                    },
                  ],
                  color: ['rgb(255, 107, 132)', 'rgb(147, 206, 84)'],
                }}
              />
              <View className="analysis-describe">
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(255, 107, 132)"
                    className="tag"
                  />
                  偏高<Text className="red-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(147, 206, 84)"
                    className="tag"
                  />
                  正常<Text className="green-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  总共<Text className="blue-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  连续高位<Text className="blue-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最高<Text className="blue-num">652</Text>mmol/L
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最长高位<Text className="blue-num">6</Text>天
                </View>
              </View>
              <View className="analysis-title">血脂</View>
              <Chart
                chartId={'1'}
                option={{
                  series: [
                    {
                      data: [
                        {
                          // 数据项的名称
                          name: '偏高',
                          // 数据项值8
                          value: 10,
                        },
                        {
                          name: '正常',
                          value: 20,
                        },
                      ],
                      type: 'pie',
                    },
                  ],
                  color: ['rgb(255, 107, 132)', 'rgb(147, 206, 84)'],
                }}
              />
              <View className="analysis-describe">
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(255, 107, 132)"
                    className="tag"
                  />
                  偏高<Text className="red-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(147, 206, 84)"
                    className="tag"
                  />
                  正常<Text className="green-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  总共<Text className="blue-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  连续高位<Text className="blue-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最高<Text className="blue-num">652</Text>mmol/L
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最长高位<Text className="blue-num">6</Text>天
                </View>
              </View>
              <View className="analysis-title">血糖</View>
              <Chart
                chartId={'1'}
                option={{
                  series: [
                    {
                      data: [
                        {
                          // 数据项的名称
                          name: '偏高',
                          // 数据项值8
                          value: 10,
                        },
                        {
                          name: '正常',
                          value: 20,
                        },
                      ],
                      type: 'pie',
                    },
                  ],
                  color: ['rgb(255, 107, 132)', 'rgb(147, 206, 84)'],
                }}
              />
              <View className="analysis-describe">
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(255, 107, 132)"
                    className="tag"
                  />
                  偏高<Text className="red-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon
                    value="tag"
                    color="rgb(147, 206, 84)"
                    className="tag"
                  />
                  正常<Text className="green-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  总共<Text className="blue-num">20</Text>次
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  连续高位<Text className="blue-num">6</Text>次
                </View>

                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最高<Text className="blue-num">652</Text>mmol/L
                </View>
                <View className="analysis-describe-item">
                  <AtIcon value="tag" color="#6190e8" className="tag" />
                  最长高位<Text className="blue-num">6</Text>天
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </AtTabsPane>
    </AtTabs>
  );
};

export default memo(DataDetail);
