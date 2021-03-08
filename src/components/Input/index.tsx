import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Label, Field, Content, ButtonIcon} from './styles';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: number | string;
  icon?: string;
  onChange: any;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  keyboardType?: string;
  buttonIcon?: boolean;
  onClickButtonIcon?(): void;
  onSubmitEditing?(): void;
}

const Input: React.FC<InputProps> = (
  {
    label,
    value,
    placeholder,
    icon,
    onChange,
    buttonIcon,
    secureTextEntry,
    onClickButtonIcon,
    ...props
  },
  ref,
) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Content>
        <Field
          value={String(value)}
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
    </Container>
  );
};

export default forwardRef(Input);
