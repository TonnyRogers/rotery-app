import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Label, Field, Content} from './styles';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: number | string;
  icon?: string;
  onChange: any;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  keyboardType?: string;
  onSubmitEditing?(): void;
}

const Input: React.FC<InputProps> = (
  {label, value, placeholder, icon, onChange, ...props},
  ref,
) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <Field
          value={String(value)}
          placeholder={placeholder}
          onChangeText={onChange}
          ref={ref}
          {...props}
        />
        {icon && <Icon name={icon} color="#808080" size={24} />}
      </Content>
    </Container>
  );
};

export default forwardRef(Input);
