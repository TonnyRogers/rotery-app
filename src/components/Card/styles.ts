import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  elevation: 3,
})`
  background: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text``;

export const CardContent = styled.View``;
