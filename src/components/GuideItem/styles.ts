import styled from 'styled-native-components';
import LottieView from 'lottie-react-native';

export const Container = styled.View.attrs({})`
  border-radius: 0.8rem;
  flex: 1;
  width: 100%;
  padding: 1rem;
`;

export const Background = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  background: #fff;
`;

export const ImageContent = styled.View`
  flex: 1;
`;

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
