/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {Shadow} from 'react-native-shadow-2';

import {CardContent} from './styles';
import {ViewStyle} from 'react-native';

interface CardProps {
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  children: ReactNode;
}

const Card = ({children, contentStyle, containerStyle}: CardProps) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        margin: 12,
        ...containerStyle,
      }}
      contentViewStyle={{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
        ...contentStyle,
      }}
      radius={12}
      startColor="#00000009"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={5}>
      <CardContent>{children}</CardContent>
    </Shadow>
  );
};

export default Card;
