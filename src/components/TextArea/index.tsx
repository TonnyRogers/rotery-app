import React, {forwardRef} from 'react';

import {Container, Field, Label} from './styles';
import {TextInputProps} from 'react-native';

interface TextAreaProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: any;
  icon?: string;
  onChange: any;
  onSubmitEditing?(): void;
}

const TextArea = (
  {label, value, placeholder, onChange, ...props}: TextAreaProps,
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
        numberOfLines={3}
        placeholderTextColor="#808080"
        ref={ref}
        {...props}
      />
    </Container>
  );
};

export default forwardRef(TextArea);
