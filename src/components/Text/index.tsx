import React, {ReactNode} from 'react';

import {
  SimpleText,
  TitleText,
  ParagraphText,
  CustomStyledProps,
} from './styles';

interface TextProps extends CustomStyledProps {
  children: ReactNode;
}

interface TitleProps extends TextProps {}

interface ParagraphProps extends TextProps {}

const Text = ({children, textColor, textWeight, maxLines}: TextProps) => {
  return (
    <SimpleText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}>
      {children}
    </SimpleText>
  );
};

const Title = ({children, textColor, textWeight, maxLines}: TitleProps) => {
  return (
    <TitleText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}>
      {children}
    </TitleText>
  );
};

const Paragraph = ({
  children,
  textColor,
  textWeight,
  maxLines,
}: ParagraphProps) => {
  return (
    <ParagraphText
      textColor={textColor}
      textWeight={textWeight}
      maxLines={maxLines}>
      {children}
    </ParagraphText>
  );
};

Text.Title = Title;
Text.Paragraph = Paragraph;

export default Text;
