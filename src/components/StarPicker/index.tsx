import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container} from './styles';
import Text from '../Text';

interface StarPickerProps {
  onSelect: (rate: number) => void;
  value: number;
  error?: string;
}

export function StarPicker({onSelect, value, error}: StarPickerProps) {
  function renderItineraryRateStars(rate: number) {
    const starsComponent = [];

    for (let index = 1; index <= 5; index++) {
      starsComponent.push(
        rate >= index ? (
          <TouchableOpacity key={index} onPress={() => onSelect(index)}>
            <Icon name="star" size={35} color="#3dc77b" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={index} onPress={() => onSelect(index)}>
            <Icon name="star-outline" size={35} color="#000" />
          </TouchableOpacity>
        ),
      );
    }
    return starsComponent;
  }

  return (
    <>
      <Container>{renderItineraryRateStars(value)}</Container>
      {error && (
        <Text textColor="red" textWeight="light">
          {error}
        </Text>
      )}
    </>
  );
}
