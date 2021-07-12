/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

import {Container, Background, Info} from './styles';

interface HighlightProps {
  background: string;
}

const Highlight: React.FC<HighlightProps> = ({background, children}) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        margin: 8,
      }}
      contentViewStyle={{
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 12,
      }}
      radius={12}
      startColor="#00000009"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={5}>
      <Background
        source={{
          uri: background || undefined,
        }}
        resizeMode="cover"
      />
      <Info>{children}</Info>
    </Shadow>
  );
};

export default Highlight;
