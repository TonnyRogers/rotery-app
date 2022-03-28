import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RowGroup} from '../../screens/Home/styles';

interface StarRateProps {
  rate: number;
  size?: 'small' | 'regular' | 'big';
}

const StarRate = ({rate, size}: StarRateProps) => {
  const renderStars = useCallback(() => {
    const starsComponent: Element[] = [];
    let starSize = 0;

    switch (size) {
      case 'small':
        starSize = 20;
        break;
      case 'regular':
        starSize = 24;
        break;
      case 'big':
        starSize = 28;
        break;

      default:
        starSize = 24;
        break;
    }

    for (let index = 1; index <= 5; index++) {
      starsComponent.push(
        rate >= index ? (
          <Icon
            key={Math.random()}
            name="star"
            size={starSize}
            color="#3dc77b"
          />
        ) : (
          <Icon
            key={Math.random()}
            name="star-outline"
            size={starSize}
            color="#000"
          />
        ),
      );
    }

    return starsComponent;
  }, [rate, size]);

  return <RowGroup>{renderStars()}</RowGroup>;
};

export default StarRate;
