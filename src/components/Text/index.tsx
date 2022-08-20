import React, {ReactNode} from 'react';

import {
  SimpleText,
  TitleText,
  SubtitleText,
  ParagraphText,
  SmallText,
  CustomStyledProps,
  Limiter,
  BigText,
  BiggestText,
  SemiSmallText,
} from './styles';

interface TextProps extends CustomStyledProps {
  children: ReactNode;
  withLineBreak?: boolean;
  limitter?: number;
}

interface TitleProps extends TextProps {}

interface ParagraphProps extends TextProps {}

interface SmallProps extends TextProps {}

interface BigProps extends TextProps {}

interface BiggestProps extends TextProps {}

const Text = ({
  children,
  textColor,
  textWeight = 'light',
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

const Subtitle = ({
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
      <SubtitleText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </SubtitleText>
    </Limiter>
  );
};

const Paragraph = ({
  children,
  textColor,
  textWeight = 'light',
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

const SemiSmall = ({
  children,
  textColor,
  textWeight = 'light',
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: SmallProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <SemiSmallText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </SemiSmallText>
    </Limiter>
  );
};

const Small = ({
  children,
  textColor,
  textWeight = 'light',
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: SmallProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <SmallText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </SmallText>
    </Limiter>
  );
};

const Big = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: BigProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <BigText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </BigText>
    </Limiter>
  );
};

const Biggest = ({
  children,
  textColor,
  textWeight,
  maxLines,
  alignment,
  withLineBreak,
  limitter,
}: BiggestProps) => {
  return (
    <Limiter maxWidth={limitter}>
      <BiggestText
        textColor={textColor}
        textWeight={textWeight}
        maxLines={maxLines}
        alignment={alignment}>
        {children}
        {withLineBreak && '\n'}
      </BiggestText>
    </Limiter>
  );
};

Text.Title = Title;
Text.Subtitle = Subtitle;
Text.Paragraph = Paragraph;
Text.SemiSmall = SemiSmall;
Text.Small = Small;
Text.Big = Big;
Text.Biggest = Biggest;

export default Text;
