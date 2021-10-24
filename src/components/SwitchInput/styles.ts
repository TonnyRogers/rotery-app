import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 2rem;
`;

export const TrueOptionsButton = styled.TouchableOpacity<{selected: boolean}>`
  background: ${(props) => (props.selected ? '#3dc77b' : 'transparent')};
  border-color: #3dc77b;
  border-width: 0.3rem;
  border-radius: 1rem;
  height: 4rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

export const TrueOptionsButtonText = styled.Text<{selected: boolean}>`
  font-family: 'Roboto';
  font-weight: bold;
  color: ${(props) => (props.selected ? '#FFF' : '#3dc77b')};
  font-size: 1.5rem;
`;

export const FalseOptionsButton = styled.TouchableOpacity<{selected: boolean}>`
  background: ${(props) => (props.selected ? 'transparent' : '#3dc77b')};
  border-color: #3dc77b;
  border-width: 0.3rem;
  border-radius: 1rem;
  height: 4rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

export const FalseOptionsButtonText = styled.Text<{selected: boolean}>`
  font-family: 'Roboto';
  font-weight: bold;
  color: ${(props) => (props.selected ? '#3dc77b' : '#FFF')};
  font-size: 1.5rem;
`;

export const ButtonCointainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #808080;
  margin: 0 0 1rem 0;
`;
