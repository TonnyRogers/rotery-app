import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

const colors = {
  primary: `color: ${theme.colors.primaryText};`,
  secondary: `color: ${theme.colors.secondaryText};`,
};

export interface CustomStyledProps {
  textColor?: 'primary' | 'secondary';
  textWeight?: 'bold' | 'regular' | 'light';
  maxLines?: number;
}

export const SimpleText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1.4rem;
  ${(props) => (props.textColor ? colors[props.textColor] : colors.secondary)};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const TitleText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  ${(props) => (props.textColor ? colors[props.textColor] : colors.primary)};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.bold};
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const ParagraphText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1.6rem;
  ${(props) => (props.textColor ? colors[props.textColor] : colors.secondary)};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;
