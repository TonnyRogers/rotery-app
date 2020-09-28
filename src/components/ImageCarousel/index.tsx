import React, {useState} from 'react';

import {Container, ImageItem, ImageList, Bullets, Bullet} from './styles';

interface dataProps {
  id: number;
  url: string;
}

interface ImageCarouselProps {
  data: dataProps[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({data}) => {
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
    bullets.push(<Bullet current={counter === interval} key={counter} />);
  }

  return (
    <Container>
      <ImageList
        horizontal
        contentContainerStyle={{width: `${100 * intervals}%`}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(e) => {
          setWidth(e.nativeEvent.contentSize.width);
          setInterval(getInterval(e.nativeEvent.contentOffset.x));
        }}
        decelerationRate="fast"
        pagingEnabled>
        {data &&
          data.map((item) => (
            <ImageItem
              key={item.id}
              source={{
                uri: item.url,
              }}
              resizeMode="cover"
            />
          ))}
      </ImageList>
      <Bullets>{bullets}</Bullets>
    </Container>
  );
};

export default ImageCarousel;
