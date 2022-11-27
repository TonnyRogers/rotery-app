import React, {useState, useEffect} from 'react';

import {
  Container,
  ImageList,
  Bullets,
  Bullet,
  HighlightContent,
} from './styles';
import Highlight from '../Highlight';
import Text from '../Text';
interface dataProps {
  id?: number;
  url: string;
  withInfo?: boolean;
  title?: string;
  message?: string;
}

interface HighlightCarouselProps {
  data: dataProps[];
}

const HighlightCarousel: React.FC<HighlightCarouselProps> = ({data}) => {
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

  if (!data.length) {
    return null;
  }

  return (
    <Container>
      <ImageList
        horizontal
        contentContainerStyle={{width: `${100 * tabSize}%`}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        onContentSizeChange={(w, _) => init(w)}
        onScroll={(e) => {
          setWidth(e.nativeEvent.contentSize.width);
          setCurrentTab(Number(getInterval(e.nativeEvent.contentOffset.x)));
        }}
        decelerationRate="fast"
        pagingEnabled>
        {data &&
          data.map((item, index) => (
            <Highlight key={index} background={item.url}>
              {item.withInfo && (
                <HighlightContent>
                  <Text.Paragraph textWeight="bold" alignment="center">
                    {item.title}
                  </Text.Paragraph>
                  <Text textWeight="light" alignment="center">
                    {item.message}
                  </Text>
                </HighlightContent>
              )}
            </Highlight>
          ))}
      </ImageList>
      <Bullets>{bullets}</Bullets>
    </Container>
  );
};

export default HighlightCarousel;
