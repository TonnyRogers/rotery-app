/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container} from './styles';
import Text from '../Text';
import {Shadow} from 'react-native-shadow-2';
import {theme, ColorsType} from '../../utils/theme';
import {TouchableOpacityProps, FlexAlignType} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  bgColor: ColorsType;
  textColor?: ColorsType;
  isEnabled?: boolean;
  sizeHeight?: number;
  sizeWidth?: number;
  sizeBorderRadius?: number;
  sizePadding?: number | string;
  sizeMargin?: string;
  hasShadow?: boolean;
  isFlex?: boolean;
  customContent?: boolean;
  containerAlignSelf?: FlexAlignType;
  cornerRadius?: {
    topL: number;
    topR: number;
    bottomL: number;
    bottomR: number;
  };
}

const Button: React.FC<ButtonProps> = ({
  bgColor,
  children,
  isEnabled = true,
  textColor = 'white',
  customContent = false,
  sizeHeight = 5,
  sizeWidth,
  sizeBorderRadius = 12,
  sizePadding = 12,
  sizeMargin,
  containerAlignSelf,
  isFlex,
  hasShadow = true,
  cornerRadius,
  ...props
}) => {
  return (
    <Container
      {...props}
      height={sizeHeight}
      isFlex={isFlex}
      margin={sizeMargin}
      disabled={!isEnabled}>
      <Shadow
        containerViewStyle={{
          flex: sizeHeight ? undefined : 1,
          alignSelf: containerAlignSelf,
        }}
        contentViewStyle={{
          flex: sizeHeight ? undefined : 1,
          backgroundColor: isEnabled
            ? theme.colors[bgColor]
            : theme.colors.disabled,
          padding: sizePadding,
          borderRadius: cornerRadius?.bottomL ? undefined : sizeBorderRadius,
          alignItems: 'center',
          justifyContent: 'center',
          height: sizeHeight * 10,
          width: sizeWidth ? sizeWidth * 10 : undefined,
          borderBottomLeftRadius: cornerRadius?.bottomL,
          borderBottomRightRadius: cornerRadius?.bottomR,
          borderTopLeftRadius: cornerRadius?.topL,
          borderTopRightRadius: cornerRadius?.topR,
        }}
        radius={{
          default: cornerRadius?.bottomL ? undefined : sizeBorderRadius,
          bottomLeft: cornerRadius?.bottomL,
          bottomRight: cornerRadius?.bottomR,
          topLeft: cornerRadius?.topL,
          topRight: cornerRadius?.topR,
        }}
        startColor={hasShadow ? '#00000007' : 'transparent'}
        finalColor={'transparent'}
        offset={[0, 0, 0, 0]}
        distance={hasShadow ? 7 : 0}>
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
