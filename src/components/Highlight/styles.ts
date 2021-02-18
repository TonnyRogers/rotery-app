import styled from 'styled-native-components';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const Container = styled.View.attrs({})`
  border-radius: 0.8rem;
  width: ${width / 10}rem;
  padding: 1rem;
`;

export const Background = styled.Image`
  height: 30rem;
  width: 100%;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  background: #fff;
`;

export const Info = styled.View.attrs({})`
  background: #fff;
  height: 10rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  padding: 0.8rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;
