import React, {forwardRef} from 'react';

import {Container, Content, Label, SPickerInput} from './styles';

interface OptionProps {
  id: number;
  name: string;
}

interface PickerInputProps {
  ref: number | any;
  options: OptionProps[];
  label: string;
  value: string | number;
  onChange(returnValue: any): any;
}

const PickerInput: React.FC<PickerInputProps> = (
  {options, label, value, onChange},
  ref,
) => {
  return (
    <Container>
      <Content>
        <Label>{label}</Label>
        <SPickerInput
          selectedValue={value}
          onValueChange={(itemValue, intemIndex) => onChange(itemValue)}
          ref={ref}
          mode="dropdown">
          <SPickerInput.Item label="Selecione" value="" />
          {options &&
            options.map((option) => (
              <SPickerInput.Item
                key={option.id}
                label={option.name}
                value={option.id}
              />
            ))}
        </SPickerInput>
      </Content>
    </Container>
  );
};

export default forwardRef(PickerInput);
