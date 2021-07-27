import React, {ReactNode} from 'react';

import {
  SimpleText,
  TitleText,
  ParagraphText,
  CustomStyledProps,
} from './styles';

interface TextProps extends CustomStyledProps {
  children: ReactNode;
  withLineBreak?: boolean;
}

interface TitleProps extends TextProps {}

interface ParagraphProps extends TextProps {}

const Text = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
}: TextProps) => {
  return (
    <SimpleText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}
      alignment={alignment}>
      {children}
      {withLineBreak && '\n'}
    </SimpleText>
  );
};

const Title = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
}: TitleProps) => {
  return (
    <TitleText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}
      alignment={alignment}>
      {children}
      {withLineBreak && '\n'}
    </TitleText>
  );
};

const Paragraph = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
}: ParagraphProps) => {
  return (
    <ParagraphText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}
      alignment={alignment}>
      {children}
      {withLineBreak && '\n'}
    </ParagraphText>
  );
};

Text.Title = Title;
Text.Paragraph = Paragraph;

export default Text;
