import styled from 'styled-native-components';
import {theme, ColorsType} from '../../utils/theme';

const alignment = {
  center: 'align-self: center; text-align: center;',
  start: 'align-self: flex-start;',
  end: 'align-self: flex-end;',
  stretch: 'text-align: justify;',
};

export interface CustomStyledProps {
  textColor?: ColorsType;
  textWeight?: 'bold' | 'regular' | 'light';
  maxLines?: number;
  alignment?: 'center' | 'start' | 'end' | 'stretch';
}

export const SmallText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 0.9rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const SemiSmallText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const SimpleText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const ParagraphText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
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
  color: ${(props) =>
    props.textColor ? theme.colors[props.textColor] : theme.colors.primaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.bold};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const SubtitleText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) =>
    props.textColor ? theme.colors[props.textColor] : theme.colors.primaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.bold};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const BigText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 4rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
  ${(props) =>
    props.textWeight
      ? theme.textWeight[props.textWeight]
      : theme.textWeight.regular};
  ${(props) => (props.alignment ? alignment[props.alignment] : alignment.start)}
  ${(props) => (props.maxLines ? (props.numberOfLines = props.maxLines) : '')}
`;

export const BiggestText = styled.Text<CustomStyledProps>`
  font-family: 'Roboto';
  font-size: 6rem;
  color: ${(props) =>
    props.textColor
      ? theme.colors[props.textColor]
      : theme.colors.secondaryText};
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
