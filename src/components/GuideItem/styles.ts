import styled from 'styled-native-components';
import LottieView from 'lottie-react-native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
export const Container = styled.View.attrs({})`
  border-radius: 0.8rem;
  flex: 1;
  width: 100%;
  padding: 1rem;
`;

export const Background = styled.Image`
  flex: 1;
  width: 100%;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  background: #fff;
`;

export const ImageContent = styled.View``;

export const Info = styled.View.attrs({})`
  background: #fff;
  height: 13rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  padding: 0.8rem;
`;

export const LottieViewCustom = styled(LottieView)`
  background: #956;
  position: relative;
`;
