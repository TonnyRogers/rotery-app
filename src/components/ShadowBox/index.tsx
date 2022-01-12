/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Shadow} from 'react-native-shadow-2';

const ShadowBox: React.FC = ({children}) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        marginVertical: 6,
      }}
      contentViewStyle={{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
      }}
      radius={12}
      startColor="#00000007"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={7}>
      {children}
    </Shadow>
  );
};

export default ShadowBox;
