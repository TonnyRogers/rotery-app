import React, {useState, useCallback} from 'react';

import {
  Container,
  ImageList,
  Bullets,
  Bullet,
  HighlightContent,
  ActionContent,
  CloseButton,
  CloseButtonText,
} from './styles';
import GuideItem from '../GuideItem';
import Text from '../Text';

interface dataProps {
  id: number;
  url: string;
  withInfo?: boolean;
  title?: string;
  message?: string;
  isAnimation: boolean;
}

interface GuideCarouselProps {
  data: dataProps[];
  onClose(): void;
}

const GuideCarousel: React.FC<GuideCarouselProps> = ({data, onClose}) => {
  const [interval, setInterval] = useState(1);
  const [intervals, setIntervals] = useState(1);
  const [width, setWidth] = useState(0);

  const init = (itemWidth: number) => {
    setWidth(itemWidth);
    const totalItems = data && data.length;
    setIntervals(Math.ceil(totalItems / 1));
  };

  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i === intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let counter = 1; counter <= intervals; counter++) {
    bullets.push(
      <Bullet
        style={{
          backgroundColor: `${counter === interval ? '#3dc77b' : '#e6e6e6'}`,
        }}
        key={counter}
      />,
    );
  }

  const renderItems = useCallback(
    () =>
      data.map((item) => (
        <GuideItem
          key={item.id}
          background={item.url}
          animation={item.isAnimation}>
          {item.withInfo && (
            <HighlightContent>
              <Text.Paragraph
                textColor="primaryText"
                textWeight="bold"
                alignment="center"
                maxLines={1}>
                {item.title}
              </Text.Paragraph>
              <Text alignment="center" textWeight="light" maxLines={5}>
                {item.message}
              </Text>
            </HighlightContent>
          )}
        </GuideItem>
      )),
    [data],
  );

  const renderButton = useCallback(
    () =>
      interval === intervals && (
        <CloseButton onPress={onClose}>
          <CloseButtonText>Fechar</CloseButtonText>
        </CloseButton>
      ),
    [interval, intervals, onClose],
  );

  return (
    <Container>
      <ImageList
        horizontal
        contentContainerStyle={{width: `${100 * intervals}%`}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        onContentSizeChange={(w, _) => init(w)}
        onScroll={(e) => {
          setWidth(e.nativeEvent.contentSize.width);
          setInterval(getInterval(e.nativeEvent.contentOffset.x) || 0);
        }}
        decelerationRate="fast"
        pagingEnabled>
        {renderItems()}
      </ImageList>
      <Bullets>{bullets}</Bullets>
      <ActionContent>{renderButton()}</ActionContent>
    </Container>
  );
};

export default GuideCarousel;
