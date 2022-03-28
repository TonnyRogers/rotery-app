import React, {useState, useCallback, useEffect} from 'react';

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
  const [currentTab, setCurrentTab] = useState(1);
  const [tabSize, setTabSize] = useState(1);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (data.length) {
      setTabSize(data.length);
    }
  }, [data.length]);

  const init = (itemWidth: number) => {
    setWidth(itemWidth);
    const totalItems = data && data.length;
    setTabSize(Math.ceil(totalItems / 1));
  };

  const getInterval = (offset: any) => {
    for (let i = 1; i <= tabSize; i++) {
      if (offset + 1 < (width / tabSize) * i) {
        return i;
      }
      if (i === tabSize) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let counter = 1; counter <= tabSize; counter++) {
    bullets.push(
      <Bullet
        style={{
          backgroundColor: `${counter === currentTab ? '#3dc77b' : '#e6e6e6'}`,
        }}
        key={counter}
      />,
    );
  }

  const renderItems = useCallback(
    () =>
      data.map((item, index) => (
        <GuideItem
          key={index}
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
      currentTab === tabSize && (
        <CloseButton onPress={onClose}>
          <CloseButtonText>Fechar</CloseButtonText>
        </CloseButton>
      ),
    [currentTab, tabSize, onClose],
  );

  return (
    <Container>
      <ImageList
        horizontal
        contentContainerStyle={{
          width: `${100 * tabSize}%`,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        onContentSizeChange={(w, _) => init(w)}
        onScroll={(e) => {
          setWidth(e.nativeEvent.contentSize.width);
          setCurrentTab(getInterval(e.nativeEvent.contentOffset.x) || 0);
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
