import styled from 'styled-native-components';
import {Platform} from 'react-native';
import {theme} from '../../utils/theme';

const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  flex-direction: column;
  background: ${theme.colors.appBackground};
  height: ${'100' + metric};
`;

export const Header = styled.View`
  flex: 1;
  padding: 1rem;
  justify-content: center;
`;

export const ItemsContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;

export const ItemsDetailContent = styled.View`
  flex: 1;
  background: ${theme.colors.appBackground};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.5rem 1.5rem;
`;

export const IconHolder = styled.View`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  background: #4885fd;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const CardHeader = styled.View``;

export const FlexContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
