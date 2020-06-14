import Taro, { memo, useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import {
  inArray,
  onBluetoothDeviceFound,
  openBluetoothAdapter,
  hex2buffer,
  buf2hex,
  stopBluetoothDevicesDiscovery
} from './util/blue-tooth';
import { UXSingleData } from './util/data2UXData';
import http from '../../util/http';
import { MEASURE_UPDATE } from '../../constants/api-constants';

const SERVICE_ID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
// 写入
const TXD = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
// 读取
const RXD = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

const START = '7b00FF7d0011';

const Device = () => {
  const [discoveryStarted, setDiscoveryStarted] = useState(false);
  const [devices, setDevices] = useState<
    Taro.onBluetoothDeviceFound.CallbackResultBlueToothDevice[]
  >([]);

  const [deviceId, setDeviceId] = useState('');
  const [name, setName] = useState('');
  const [uploadTimes, setUploadTimes] = useState(0);
  const [uploadType, setUploadType] = useState(1);
  '1为一条,5为5条';

  const submit = (uploadData: string) => {
    http({
      url: MEASURE_UPDATE,
      method: 'POST',
      data: {
        uuid: Taro.getStorageSync('activePatient'),
        datas: [UXSingleData(uploadData)],
      },
    }).then((res) => {
      console.log(res);
      if (res.statusCode === 500) {
        console.log('数据提交失败');
      } else if (res.statusCode === 200) {
        setUploadTimes(uploadTimes + 1);
        if (uploadTimes === uploadType) {
          console.log('数据提交成功');
          setUploadTimes(0);
        }
      }
    });
  };

  // 开始查找蓝牙设备
  const startBluetoothDevicesDiscovery = () => {
    if (discoveryStarted) {
      return;
    }
    setDiscoveryStarted(true);
    // 搜索蓝牙设备
    Taro.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: async () => {
        const res = await onBluetoothDeviceFound();
        res.devices.forEach((device) => {
          if (!device.name && !device.localName) {
            return;
          }

          const idx = inArray(devices, 'deviceId', device.deviceId);

          if (idx === -1) {
            devices[devices.length] = device;
          } else {
            devices[idx] = device;
          }
          setDevices([...devices]);
        });
      },
    });
  };

  // 写数据
  const writeBLECharacteristicValue = (hex: string) => {
    // 16进制转buffer
    const buffer = hex2buffer(hex);

    console.log(
      `向设备: ${deviceId}的服务: ${SERVICE_ID}的TXD特征值: ${TXD}写入: ${hex}`
    );

    Taro.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: SERVICE_ID,
      characteristicId: TXD,
      value: buffer,
      success() {
        console.log('写数据成功');
      },
      fail(err) {
        console.log('fail', err);
      },
    });
  };

  const getBLEDeviceCharacteristics = async (_deviceId, serviceId) => {
    console.log(_deviceId, serviceId);
    await Taro.getBLEDeviceCharacteristics({
      deviceId: _deviceId,
      serviceId: serviceId,
    });

    // 监听RXD
    Taro.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: _deviceId,
      serviceId: serviceId,
      characteristicId: RXD,
      success() {
        console.log(`已监听服务: ${serviceId}的RXD: ${RXD}`);

        // 操作之前先监听，保证第一时间获取数据
        Taro.onBLECharacteristicValueChange((characteristic) => {
          console.log(
            `设备的: ${_deviceId}的服务: ${SERVICE_ID}的RXD特征值: ${RXD}读取到: ${buf2hex(
              characteristic.value
            )}`
          );

          const hex = buf2hex(characteristic.value);

          if (hex.length === 30) {
            submit(hex);
          }
        });
      },
      fail(_res) {
        console.log('noteFail', _res);
      },
    });
  };

  // 获取指定蓝牙设备的服务
  const getBLEDeviceServices = (_deviceId) => {
    Taro.getBLEDeviceServices({
      deviceId: _deviceId,
      success: (res) => {
        console.log(res.services);
        for (let i = 0; i < res.services.length; i++) {
          // 如果有指定服务就读取特征值信息
          if (res.services[i].uuid === SERVICE_ID) {
            getBLEDeviceCharacteristics(_deviceId, SERVICE_ID);
            return;
          }
        }
      },
    });
  };

  // 与蓝牙设备链接
  const createBLEConnection = (_deviceId: string, _name: string) => {
    console.log('createBLEConnection', _deviceId);

    Taro.createBLEConnection({
      deviceId: _deviceId,
      success: () => {
        setDeviceId(_deviceId);
        setName(_name);
        getBLEDeviceServices(_deviceId);
      },
    });

    stopBluetoothDevicesDiscovery();
  };

  const closeBLEConnection = () => {
    Taro.closeBLEConnection({
      deviceId: deviceId,
    });
  };

  const closeBluetoothAdapter = () => {
    Taro.closeBluetoothAdapter();
    setDiscoveryStarted(false);
  };

  useEffect(() => {
    return () => {
      closeBluetoothAdapter();
    };
  }, []);

  return (
    <View>
      <AtButton
        onClick={async () => {
          await openBluetoothAdapter();
          startBluetoothDevicesDiscovery();
        }}
      >
        开始扫描
      </AtButton>
      <AtButton onClick={stopBluetoothDevicesDiscovery}>停止扫描</AtButton>
      <View>已发现 {devices.length} 个外围设备：</View>
      {devices.map((item) => {
        return (
          <AtButton
            key={item.deviceId}
            onClick={() => createBLEConnection(item.deviceId, item.name)}
          >
            <Text style="font-size: 16px; color: #333;">{item.name}</Text>
            <Text style="font-size: 10px">
              信号强度: {item.RSSI}dBm ({Math.max(0, item.RSSI + 100)}%)
            </Text>
            <Text style="font-size: 10px">UUID: {item.deviceId}</Text>
            <Text style="font-size: 10px">
              Service数量: {item.advertisServiceUUIDs.length}
            </Text>
          </AtButton>
        );
      })}
      <View>
        <Text>已连接到 {name}</Text>
        <View>
          <AtButton
            onClick={() => {
              writeBLECharacteristicValue(START);
            }}
          >
            开始连接
          </AtButton>
          <AtButton
            onClick={() => {
              writeBLECharacteristicValue('7b00A0017d');
              setUploadType(1);
            }}
          >
            获取1条数据
          </AtButton>
          <AtButton
            onClick={() => {
              writeBLECharacteristicValue('7b00A0057d');
              setUploadType(5);
            }}
          >
            获取5条数据
          </AtButton>
          <AtButton onClick={closeBLEConnection}>断开连接</AtButton>
        </View>
      </View>
    </View>
  );
};

export default memo(Device);
