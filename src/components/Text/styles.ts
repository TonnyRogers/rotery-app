import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

const colors = {
  primary: `color: ${theme.colors.primaryText};`,
  secondary: `color: ${theme.colors.secondaryText};`,
  blue: `color: ${theme.colors.blue};`,
  red: `color: ${theme.colors.red};`,
  green: `color: ${theme.colors.green};`,
  white: `color: ${theme.colors.white};`,
};

const alignment = {
  center: 'align-self: center; text-align: center;',
  start: 'align-self: flex-start;',
  end: 'align-self: flex-end;',
  stretch: 'text-align: justify;',
};

export interface CustomStyledProps {
  textColor?: 'primary' | 'secondary' | 'blue' | 'red' | 'green' | 'white';
  textWeight?: 'bold' | 'regular' | 'light';
  maxLines?: number;
  alignment?: 'center' | 'start' | 'end' | 'stretch';
}

export const SimpleText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1.4rem;
  ${(props) => (props.textColor ? colors[props.textColor] : colors.secondary)};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
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
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
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
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const Limiter = styled.View<{maxWidth?: number}>`
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}rem` : '')}
`;
