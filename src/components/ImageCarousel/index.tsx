import React, {useState, useEffect} from 'react';

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
          setCurrentTab(Number(getInterval(e?.nativeEvent?.contentOffset?.x)));
        }}
        decelerationRate="fast"
        pagingEnabled>
        {data &&
          data.map(
            (item, index) =>
              typeof item.file !== 'number' && (
                <ImageItem
                  key={index}
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
