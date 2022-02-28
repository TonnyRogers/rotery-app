import React, {useState} from 'react';

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
  id: number;
  url: string;
  withInfo?: boolean;
  title?: string;
  message?: string;
}

interface HighlightCarouselProps {
  data: dataProps[];
}

const HighlightCarousel: React.FC<HighlightCarouselProps> = ({data}) => {
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
          setInterval(Number(getInterval(e.nativeEvent.contentOffset.x)));
        }}
        decelerationRate="fast"
        pagingEnabled>
        {data &&
          data.map((item) => (
            <Highlight key={item.id} background={item.url}>
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
