import styled from 'styled-native-components';
// import {Dimensions} from 'react-native';

// const {width} = Dimensions.get('screen');

export const Container = styled.View.attrs({})`
  flex: 1;
`;

export const Background = styled.Image`
  flex: 1;
  width: 100%;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
`;

export const Info = styled.View.attrs({})`
  height: 10rem;
`;
