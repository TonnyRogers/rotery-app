import styled from 'styled-native-components';
import {ColorsType, theme} from '../../utils/theme';

export const ContainerView = styled.View<{bgColor?: ColorsType}>`
  background-color: ${(props) =>
    props.bgColor ? theme.colors[props.bgColor] : theme.colors.transparent};
  flex: 1;
  padding: 1rem;
`;

export const ContainerScrollView = styled.ScrollView<{bgColor?: ColorsType}>`
  flex: 1;
  padding: 1rem;
`;
