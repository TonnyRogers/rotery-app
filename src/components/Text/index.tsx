import React, {ReactNode} from 'react';

import {
  SimpleText,
  TitleText,
  ParagraphText,
  CustomStyledProps,
  Limiter,
} from './styles';

interface TextProps extends CustomStyledProps {
  children: ReactNode;
  withLineBreak?: boolean;
  limitter?: number;
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
  limitter,
}: TextProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <SimpleText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </SimpleText>
    </Limiter>
  );
};

const Title = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: TitleProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <TitleText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </TitleText>
    </Limiter>
  );
};

const Paragraph = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: ParagraphProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <ParagraphText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </ParagraphText>
    </Limiter>
  );
};

Text.Title = Title;
Text.Paragraph = Paragraph;

export default Text;
