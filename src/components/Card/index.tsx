/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {Shadow} from 'react-native-shadow-2';

import {CardContent} from './styles';
import {ViewStyle} from 'react-native';

interface CardProps {
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  children: ReactNode;
  marginHorizontal?: number;
  marginVertical?: number;
}

const Card = ({
  children,
  contentStyle,
  containerStyle,
  marginVertical = 12,
  marginHorizontal = 12,
}: CardProps) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        marginHorizontal,
        marginVertical,
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
      startColor="#00000007"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={7}>
      <CardContent>{children}</CardContent>
    </Shadow>
  );
};

export default Card;
