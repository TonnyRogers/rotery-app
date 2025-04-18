import React, {forwardRef} from 'react';

import {Container, Field, Label} from './styles';
import {TextInputProps} from 'react-native';
import Text from '../Text';

interface TextAreaProps extends TextInputProps {
  error?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  onChange: any;
}

const TextArea = (
  {label, placeholder, onChange, error, ...props}: TextAreaProps,
  ref,
) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Field
        placeholder={placeholder}
        onChangeText={onChange}
        multiline
        numberOfLines={3}
        placeholderTextColor="#808080"
        ref={ref}
        hasError={!!error}
        {...props}
      />
      {error && (
        <Text textColor="red" textWeight="light">
          {error}
        </Text>
      )}
    </Container>
  );
};

export default forwardRef(TextArea);
