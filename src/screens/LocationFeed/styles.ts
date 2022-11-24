import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const A = styled.View``;

export const ActivityList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  max-height: 6.5rem;
  padding: 0.2rem;
  margin: 1rem 0;
`;

export const Activity = styled.TouchableOpacity<{selected: boolean}>`
  height: 6rem;
  width: 6rem;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.selected ? theme.colors.blue : theme.colors.green};
  border-radius: 1.5rem;
  margin: 0 1rem 0 0;
`;
