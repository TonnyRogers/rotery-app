import React, {useState} from 'react';

import {Container, ImageItem, ImageList, Bullets, Bullet} from './styles';
import {ItineraryPhotoProps} from '../../utils/types';

interface dataProps {
  id: number;
  url: string;
}

interface ImageCarouselProps {
  data: ItineraryPhotoProps[];
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
          setInterval(Number(getInterval(e?.nativeEvent?.contentOffset?.x)));
        }}
        decelerationRate="fast"
        pagingEnabled>
        {data &&
          data.map(
            (item) =>
              typeof item.file !== 'number' && (
                <ImageItem
                  key={item.file.id}
                  source={{
                    uri: item.file.url || undefined,
                  }}
                  resizeMode="cover"
                />
              ),
          )}
      </ImageList>
      <Bullets>{bullets}</Bullets>
    </Container>
  );
};

export default ImageCarousel;
