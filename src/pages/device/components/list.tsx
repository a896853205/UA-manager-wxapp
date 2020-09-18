import Taro, { memo } from '@tarojs/taro';
import { View } from '@tarojs/components';

import DeviceDataItem from './item';
import { UXSingleData, UXThreeData } from '../util/data2UXData';

interface Props {
  deviceDataList: string[];
}

const DeviceDataList = ({
  deviceDataList
}: Props) => {
  return (
    <View>
      {deviceDataList && deviceDataList.length
        ? deviceDataList.map((deviceData) => {
          return (
            deviceData.length == 30 ?
              <DeviceDataItem
                type='single'
                uric={new UXSingleData(deviceData).uric}
                triglyceride={0}
                fat={0}
                date={new UXSingleData(deviceData).getTimeString()}
              />
              : deviceData.length == 38 ?
                <DeviceDataItem
                  type='joint'
                  uric={new UXThreeData(deviceData).uric}
                  triglyceride={new UXThreeData(deviceData).triglyceride}
                  fat={new UXThreeData(deviceData).fat}
                  date={new UXThreeData(deviceData).getTimeString()}
                />
                : null
          );
        }) : null
      }
    </View>);
}

export default memo(DeviceDataList);