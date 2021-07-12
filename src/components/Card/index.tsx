/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

import {CardContent} from './styles';

const Card: React.FC = ({children}) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        margin: 12,
      }}
      contentViewStyle={{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
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
