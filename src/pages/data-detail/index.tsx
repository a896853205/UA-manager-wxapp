import Taro, { useState, useEffect, memo } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { useSelector } from '@tarojs/redux';

// 样式
import './data-detail.css';

// 组件
import Line from './line';
import Analysis from './analysis';

interface IMeasure {
  measureText: string;
  measureType: string;
}
interface IStatus {
  measure: IMeasure;
}

const TAB_LIST = [{ title: '折线' }, { title: '统计' }];

const DataDetail = () => {
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
        <Line />
      </AtTabsPane>
      <AtTabsPane current={1} index={1}>
        <Analysis />
      </AtTabsPane>
    </AtTabs>
  );
};

export default memo(DataDetail);
