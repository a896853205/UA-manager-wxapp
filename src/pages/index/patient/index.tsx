import Taro, { memo, useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {
  // AtList,
  // AtSwipeAction,
  // AtListItem,
  AtButton,
  AtToast,
  AtMessage,
  AtSearchBar,
} from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';

import './patient.css';
import http from '../../../util/http';
import { PATIENT_LIST } from '../../../constants/api-constants';
import { addPatient, alterPatient } from '../../../actions/add-patient';
import PersonList, { Person, PersonListData } from './components/list';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

const PATIENT_LIST_SIZE = 99999;

type PageStateProps = {};

type IProps = PageStateProps;

interface Recommend {
  props: IProps;
}

interface IAdd {
  isAdded: boolean;
  isAlter: boolean;
}
interface Istatus {
  addPatient: IAdd;
}

const Recommend = () => {
  const [personList, setPersonList] = useState<PersonListData>();
  const [getDataLoading, setGetDataLoading] = useState(true);
  // const [patientUuid, setPatientUuid] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isSearch, setIsSearch] = useState(true);
  const { isAdded, isAlter } = useSelector<Istatus, IAdd>(
    (state) => state.addPatient
  );
  const dispatch = useDispatch();

  console.log(isAdded);

  useEffect(() => {
    (async () => {
      if (isSearch || isAdded || isAlter) {
        setGetDataLoading(true);

        let data;
        if (patientName) {
          data = {
            page: 0,
            limit: PATIENT_LIST_SIZE,
            like: patientName,
          };
        } else {
          data = {
            page: 0,
            limit: PATIENT_LIST_SIZE,
          };
        }

        const res = await http({
          url: PATIENT_LIST,
          method: 'GET',
          data,
        });

        if (res.statusCode === 500) {
          Taro.atMessage({
            message: '获取列表失败',
            type: 'error',
          });
        } else if (res.statusCode === 200) {
          const paientListData = res.data.data.map(
            (patient) => new Person(patient.uuid, patient.name, patient.phone)
          );

          const paientList = new PersonListData(paientListData);

          if (isAdded && paientList) {
            Taro.setStorageSync(
              'activePatient',
              paientList.isLastSelectPerson()
            );
            dispatch(addPatient(false));
          } else if (isAlter && paientList) {
            paientList.setIsSelectPerson(Taro.getStorageSync('activePatient'));
            dispatch(alterPatient(false));
          } else if (
            res.data.data[0] &&
            res.data.data.findIndex(
              (item) => item.uuid === Taro.getStorageSync('activePatient')
            ) === -1
          ) {
            // 边界情况 未找到选定医生，首次进入医生列表
            Taro.setStorageSync(
              'activePatient',
              paientList.isLastSelectPerson()
            );
          } else {
            paientList.setIsSelectPerson(Taro.getStorageSync('activePatient'));
          }
          setPersonList(new PersonListData(paientList.personList));
        }

        setIsSearch(false);
        setGetDataLoading(false);
      }
    })();
  }, [isSearch, isAdded, isAlter]);

  // useEffect(() => {
  //   if (patientUuid) {
  //     Taro.setStorageSync('activePatient', patientUuid);
  //   }
  // }, [patientUuid]);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '患者管理',
    });
  }, []);

  return (
    <View className="patient-box">
      <AtToast
        isOpened={getDataLoading}
        hasMask
        status="loading"
        text="患者信息加载中..."
      />
      <AtMessage />
      <AtButton
        full
        type="primary"
        onClick={() => {
          Taro.removeStorageSync('modifyPatient');
          Taro.navigateTo({ url: '/pages/add-patient/index' });
        }}
      >
        添加患者
      </AtButton>
      <View className="doctor-search-box">
        <AtSearchBar
          value={patientName}
          onChange={(e) => {
            setPatientName(e);
          }}
          onActionClick={() => {
            setIsSearch(true);
          }}
          onClear={() => {
            setPatientName('');
            setIsSearch(true);
          }}
        />
      </View>
      <PersonList
        personList={personList ? personList.personList : []}
        onRightSideClick={(modifyPatient: string) => {
          Taro.setStorageSync('modifyPatient', modifyPatient);
          Taro.navigateTo({
            url: '/pages/add-patient/index',
          });
        }}
        onLeftSideClick={(activePatient: string) => {
          Taro.setStorageSync('activePatient', activePatient);
          if (personList) {
            personList.setIsSelectPerson(activePatient);
            setPersonList(new PersonListData(personList.personList));
          }
        }}
      />
      {/* {patientList.map((patientItem) => {
        return (
          <PatientItem
            // key={patientItem.uuid}
            uuid={patientItem.uuid}
            name={patientItem.name}
            phone={patientItem.phone}
          />)
      })} */}
      {/* <AtList>
        {patientList.map((patientItem) => (
          <AtSwipeAction
            key={patientItem.uuid}
            onClick={(e) => {
              if (e.text === '选择') {
                Taro.setStorageSync('activePatient', patientItem.uuid);
                setPatientUuid(patientItem.uuid);
              } else {
                Taro.setStorageSync('modifyPatient', patientItem.uuid);
                Taro.navigateTo({
                  url: '/pages/add-patient/index',
                });
              }
            }}
            options={[
              {
                text: '选择',
                style: {
                  backgroundColor: '#6190E8',
                },
              },
              {
                text: '修改',
                style: {
                  backgroundColor: '#FF4949',
                },
              },
            ]}
          >
            <AtListItem
              onClick={(e) => {
                console.log(e);
              }}
              title={patientItem.name}
              arrow="right"
              note={`电话: ${patientItem.phone}`}
              iconInfo={{
                value: patientItem.uuid === patientUuid ? 'check-circle' : '',
                color: '#999',
              }}
            />
          </AtSwipeAction>
        ))}
      </AtList> */}
    </View>
  );
};

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default memo(Recommend);
