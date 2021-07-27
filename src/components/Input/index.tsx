import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Label, Field, Content, ButtonIcon} from './styles';
import {TextInputProps, TextInput} from 'react-native';
import Text from '../Text';

interface InputProps extends TextInputProps {
  error?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  onChange: any;
  secureTextEntry?: boolean;
  buttonIcon?: boolean;
  onClickButtonIcon?(): void;
}

const Input: ForwardRefRenderFunction<TextInput, InputProps> = (
  {
    error,
    label,
    placeholder,
    icon,
    onChange,
    buttonIcon,
    secureTextEntry,
    onClickButtonIcon,
    ...props
  }: InputProps,
  ref,
) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Content hasError={!!error}>
        <Field
          placeholder={placeholder}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#808080"
          ref={ref}
          {...props}
        />
        {icon && <Icon name={icon} color="#808080" size={24} />}
        {buttonIcon && (
          <ButtonIcon onPress={onClickButtonIcon}>
            {secureTextEntry ? (
              <Icon name="eye-off-outline" color="#808080" size={24} />
            ) : (
              <Icon name="eye-outline" color="#808080" size={24} />
            )}
          </ButtonIcon>
        )}
      </Content>
      {error && <Text textColor="red">{error}</Text>}
    </Container>
  );
};

export default forwardRef(Input);
