import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Label, Field, Content} from './styles';

interface InputProps {
  label: string;
  placeholder: string;
  value: any;
  icon: string;
  onChange: any;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  onSubmitEditing?: Function;
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
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          ref={ref}
          {...props}
        />
        <Icon name={icon} color="#808080" size={24} />
      </Content>
    </Container>
  );
};

export default forwardRef(Input);
