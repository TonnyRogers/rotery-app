import React, {forwardRef} from 'react';
import {Picker} from '@react-native-community/picker';

import {Container, Content, Label} from './styles';

interface OptionProps {
  id: number;
  name: string;
  value: string;
}

interface PickerInputProps {
  ref: number | any;
  options: OptionProps[];
  label: string;
  value: string | number;
  onChange(returnValue: any): any;
  byValue?: boolean;
}

const PickerInput: React.FC<PickerInputProps> = (
  {options, label, value, onChange, byValue},
  ref,
) => {
  return (
    <Container>
      <Content>
        <Label>{label}</Label>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, intemIndex) => onChange(itemValue)}
          ref={ref}
          mode="dropdown"
          style={{color: '#808080'}}>
          <Picker.Item label="Selecione" value="" />
          {options &&
            options.map((option) => (
              <Picker.Item
                key={option.id}
                label={option.name}
                value={byValue ? option.value : option.id}
              />
            ))}
        </Picker>
      </Content>
    </Container>
  );
};

export default forwardRef(PickerInput);
