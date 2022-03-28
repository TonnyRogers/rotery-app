import styled from 'styled-native-components';
import {KeyboardAvoidingView as RNKAvoidingView, Platform} from 'react-native';

const metricH = Platform.OS === 'ios' ? 'vh' : '%';
const metricW = Platform.OS === 'ios' ? 'vw' : '%';

export const Modal = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: ${'100' + metricH};
  width: ${'100' + metricW}:;
`;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 50rem;
  border-radius: 0.8rem;
  padding: 1rem;
  margin: 7rem 1rem 0 1rem;
  z-index: 101;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const ModalContent = styled.ScrollView`
  flex: 1;
  margin-bottom: 1rem;
`;

export const Actions = styled.View``;

export const FilterButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 4rem;
  width: 12rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

export const FilterButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;

export const ActivityList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 1rem 0;
`;

export const Activity = styled.TouchableOpacity`
  height: 6rem;
  width: 6rem;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  border-radius: 1.5rem;
  margin: 0 1rem 0 0;
`;

export const ActivityName = styled.Text`
  font-family: 'Roboto';
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;
