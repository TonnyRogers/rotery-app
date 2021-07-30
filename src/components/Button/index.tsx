/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Container} from './styles';
import Text from '../Text';
import {Shadow} from 'react-native-shadow-2';
import {theme} from '../../utils/theme';
import {TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  bgColor: 'green' | 'blue';
}

const Button: React.FC<ButtonProps> = ({bgColor, children, ...props}) => {
  return (
    <Container {...props}>
      <Shadow
        containerViewStyle={{
          flex: 1,
        }}
        contentViewStyle={{
          flex: 1,
          backgroundColor: theme.colors[bgColor],
          padding: 12,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        radius={12}
        startColor="#00000009"
        finalColor="transparent"
        offset={[0, 0, 0, 0]}
        distance={5}>
        <Text.Title alignment="center" textColor="white">
          {children}
        </Text.Title>
      </Shadow>
    </Container>
  );
};

export default Button;
