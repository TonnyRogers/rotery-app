import styled from 'styled-native-components';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
export const Container = styled.View.attrs({})`
  border-radius: 8px;
  width: 20%;
  padding: 10px;
`;

export const Background = styled.Image`
  height: 320px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #fff;
`;

export const ImageContent = styled.View``;

export const Info = styled.View.attrs({})`
  background: #fff;
  height: 170px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 8px;
`;

export const LottieViewCustom = styled(LottieView)`
  background: #956;
  position: relative;
`;
