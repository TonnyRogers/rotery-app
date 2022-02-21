/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container} from './styles';
import Text from '../Text';
import {Shadow} from 'react-native-shadow-2';
import {theme, ColorsType} from '../../utils/theme';
import {TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  bgColor: ColorsType;
  textColor?: ColorsType;
  isEnabled?: boolean;
  sizeHeight?: number;
  sizeWidth?: number;
  sizeBorderRadius?: number;
  sizePadding?: number;
  sizeMargin?: string;
  isFlex?: boolean;
  customContent?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  bgColor,
  children,
  isEnabled = true,
  textColor = 'white',
  customContent = false,
  sizeHeight,
  sizeWidth,
  sizeBorderRadius = 12,
  sizePadding = 12,
  sizeMargin,
  isFlex,
  ...props
}) => {
  return (
    <Container
      {...props}
      isFlex={isFlex}
      margin={sizeMargin}
      disabled={!isEnabled}>
      <Shadow
        containerViewStyle={{
          flex: sizeHeight ? undefined : 1,
        }}
        contentViewStyle={{
          flex: sizeHeight ? undefined : 1,
          backgroundColor: isEnabled
            ? theme.colors[bgColor]
            : theme.colors.disabled,
          padding: sizePadding,
          borderRadius: sizeBorderRadius,
          alignItems: 'center',
          justifyContent: 'center',
          height: sizeHeight,
          width: sizeWidth,
        }}
        radius={12}
        startColor="#00000007"
        finalColor="transparent"
        offset={[0, 0, 0, 0]}
        distance={7}>
        {customContent ? (
          children
        ) : (
          <Text.Title
            alignment="center"
            textColor={isEnabled ? textColor : 'disabledText'}>
            {children}
          </Text.Title>
        )}
      </Shadow>
    </Container>
  );
};

export default Button;
