import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Content, Field, Label} from './styles';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value: any;
  icon?: string;
  onChange: any;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  onSubmitEditing?(): void;
}

const TextArea: React.FC<TextAreaProps> = (
  {label, value, placeholder, onChange, ...props},
  ref,
) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Field
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        multiline
        numberOfLines={5}
        ref={ref}
        {...props}
      />
    </Container>
  );
};

export default forwardRef(TextArea);
