import Taro, { memo } from '@tarojs/taro';
import { View } from '@tarojs/components';

import PersonItem from './item';

export class Person {
  key: string;
  uuid: string;
  name: string;
  phone: number | undefined;
  isSelected = false;

  constructor(uuid: string, name: string, phone: number | undefined) {
    this.key = uuid;
    this.uuid = uuid;
    this.name = name;
    this.phone = phone;
  }
}

export class PersonListData {
  personList: Person[];

  constructor(personList: Person[]) {
    this.personList = personList;
  }

  static comparePersonList(firstPersonList, secondPersonList) {
    if (!firstPersonList && !secondPersonList) return true;
    if (firstPersonList !== secondPersonList) return false;
    if (firstPersonList.length !== secondPersonList.length) return false;

    for (let i = 0; i < firstPersonList.length; i++) {
      if (
        !(
          firstPersonList[i].key === secondPersonList.key &&
          firstPersonList[i].uuid === secondPersonList.uuid &&
          firstPersonList[i].name === secondPersonList.name &&
          firstPersonList[i].phone === secondPersonList.phone &&
          firstPersonList[i].isSelected === secondPersonList.isSelected
        )
      )
        return false;
    }

    return true;
  }

  setIsSelectPerson(uuid: string) {
    this.personList.forEach((person) => {
      if (person.uuid === uuid) {
        person.isSelected = true;
      } else {
        person.isSelected = false;
      }
    });

    return this.getActivePersonUuid();
  }

  isLastSelectPerson() {
    this.personList.forEach((person) => {
      person.isSelected = false;
    });

    this.personList[0].isSelected = true;

    return this.getActivePersonUuid();
  }

  getActivePersonUuid() {
    const foundPerson = this.personList.find(
      (person) => person.isSelected === true
    );

    return foundPerson ? foundPerson.uuid : '';
  }
}

interface Props {
  personList: Person[];
  onLeftSideClick: Function;
  onRightSideClick: Function;
}

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    PersonListData.comparePersonList(
      prevProps.personList,
      nextProps.personList
    ) && prevProps === nextProps
  );
};

const PersonList = ({
  personList,
  onRightSideClick,
  onLeftSideClick,
}: Props) => {
  return (
    <View>
      {personList
        ? personList.map((person) => {
            return (
              <PersonItem
                isSelected={person.isSelected}
                key={person.key}
                uuid={person.uuid}
                name={person.name}
                phone={person.phone}
                onRightSideClick={onRightSideClick}
                onLeftSideClick={onLeftSideClick}
              />
            );
          })
        : null}
    </View>
  );
};

export default memo(PersonList, arePropsEqual);
