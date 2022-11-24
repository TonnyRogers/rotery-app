import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const ConversationList = styled.FlatList`
  margin-top: 1rem;
  padding: 0.5rem;
`;

export const Message = styled.View<{isReply: boolean}>`
  background-color: ${(props) =>
    props.isReply ? theme.colors.green : theme.colors.blue};
  padding: 0.8rem;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  ${(props) =>
    props.isReply
      ? 'border-bottom-right-radius: 1rem'
      : 'border-top-left-radius: 1rem'};
  margin: 0.5rem 0;
`;
