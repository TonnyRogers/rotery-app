/* eslint-disable react-native/no-inline-styles */
import React, {SetStateAction, Dispatch} from 'react';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';

import {Label} from './styles';
import {theme} from '../../utils/theme';
import Text from '../Text';

interface OptionProps {
  id?: number;
  name: string;
  value: any;
  parent?: string;
}

interface PickerInputProps extends Partial<DropDownPickerProps> {
  error?: string;
  options: OptionProps[];
  label: string;
  value: string | number;
  onChange(returnValue: any): any;
  byValue?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PickerInput: React.FC<PickerInputProps> = ({
  options,
  label,
  value,
  onChange,
  error,
  byValue,
  ...props
}) => {
  const optionList = options?.map(({id, ...rest}) => ({
    label: rest.name,
    ...rest,
    value: byValue ? rest.value : String(id),
  }));

  return (
    <>
      <Label>{label}</Label>
      <DropDownPicker
        value={value}
        containerStyle={{height: 56}}
        style={{
          backgroundColor: '#FFF',
          marginBottom: 10,
          flex: 1,
          borderRadius: 0,
          borderColor: '#FFF',
          borderBottomColor: error ? theme.colors.red : '#cfcfcf',
        }}
        dropDownContainerStyle={{
          backgroundColor: '#fafafa',
          borderColor: '#cfcfcf',
        }}
        searchContainerStyle={{
          borderBottomColor: '#dfdfdf',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        searchTextInputStyle={{
          borderColor: '#cfcfcf',
        }}
        closeIconStyle={{
          width: 24,
          height: 24,
        }}
        modalContentContainerStyle={{
          backgroundColor: '#fafafa',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        modalProps={{
          animationType: 'slide',
        }}
        itemSeparator
        itemSeparatorStyle={{
          backgroundColor: '#dfdfdf',
        }}
        textStyle={{color: '#808080', fontSize: 16}}
        placeholder="Selecione"
        searchPlaceholder="Escreva algo..."
        {...props}
        items={optionList}
        setValue={(item) => {
          console.tron.log('Item: ', item());
          return onChange(item());
        }}
      />
      {error && <Text textColor="red">{error}</Text>}
    </>
  );
};

export default PickerInput;
