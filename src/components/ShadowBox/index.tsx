/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {FlexAlignType} from 'react-native';

interface ShadowBoxProps {
  width?: number;
  height?: number;
  margin?: string | number;
  children: React.ReactNode;
  containerAlign?: FlexAlignType;
}

const ShadowBox = ({
  children,
  height,
  margin,
  width,
  containerAlign,
}: ShadowBoxProps) => {
  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        marginVertical: 0,
        alignSelf: containerAlign,
        padding: 4,
      }}
      contentViewStyle={{
        flex: width || height ? undefined : 1,
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
        margin,
        height,
        width,
      }}
      radius={12}
      startColor="#00000007"
      finalColor="transparent"
      offset={[4, 6, 10, 10]}
      distance={10}>
      {children}
    </Shadow>
  );
};

export default ShadowBox;
