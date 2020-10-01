import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Modal = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 300px;
  border-radius: 8px;
  padding: 10px;
  margin: 20px 10px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity``;

export const ModalContent = styled.View``;

export const Actions = styled.View``;

export const FilterButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 40px;
  width: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const FilterButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
