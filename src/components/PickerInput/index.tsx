/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {Label} from './styles';

interface OptionProps {
  id: number;
  name: string;
  value: string;
}

interface PickerInputProps {
  ref: number | any;
  options?: OptionProps[];
  label: string;
  value: string | number;
  onChange(returnValue: any): any;
  byValue?: boolean;
}

const PickerInput: React.FC<PickerInputProps> = (
  {options, label, value, onChange, byValue},
  ref,
) => {
  const optionList = options?.map((option) => ({
    label: option.name,
    value: byValue ? option.value : option.id,
  }));

  return (
    <>
      <Label>{label}</Label>
      <DropDownPicker
        items={optionList}
        onChangeItem={(item) => onChange(item.value)}
        containerStyle={{height: 56}}
        style={{
          backgroundColor: '#FFF',
          marginBottom: 10,
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        globalTextStyle={{color: '#808080', fontSize: 16}}
        defaultValue={value}
        arrowSize={24}
        arrowColor="#808080"
        placeholder="Selecione"
      />
    </>
  );
};

export default forwardRef(PickerInput);
