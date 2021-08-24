/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {FlatList, TouchableOpacityProps} from 'react-native';

import {Container, ListItem, LocationButton, TextLimitter} from './styles';
import Text from '../Text';
import Input from '../Input';
import tomtomApi from '../../services/tomtomApi';
import {TomTomResult, PlacesSearchGeo} from '../../utils/types';
import DismissKeyboad from '../DismissKeyboad';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../utils/theme';
import BottomSheet from '../BottomSheet';

interface LocationPickerInputProps {
  placeholder: string;
  visible: boolean;
  onCloseRequest: () => void;
  onSelectItem: (value: any) => void;
  setLocationJson: (json: any) => void;
}

interface LocationPickerButtonProps extends TouchableOpacityProps {
  value?: string;
  title: string;
  error: string;
}

const LocationPickerInput = ({
  visible,
  placeholder,
  onCloseRequest,
  onSelectItem,
  setLocationJson,
}: LocationPickerInputProps) => {
  const [list, setList] = useState<any>(null);

  const handleSearchPlace = useCallback(async (value: string) => {
    if (value.length > 3) {
      const response = await tomtomApi.get<TomTomResult<PlacesSearchGeo>>(
        `${value}.json`,
        {
          params: {
            key: 'xA6NMpC44OEmVh7sAVimkWd08NTU7ACs',
            limit: '5',
            language: 'pt-BR',
            idxSet: 'Geo',
          },
        },
      );

      const formated = response.data.results.map((item, index) => ({
        id: index,
        name: `${item.address?.municipality}, ${
          item.address?.countrySubdivision || ''
        } - ${item.address?.country} `,
        value: item,
      }));

      if (formated) {
        setList(formated);
      }
    }
  }, []);

  const handleSelectItem = (item: any) => {
    onSelectItem(item.name);
    setLocationJson(item);
    onCloseRequest();
  };

  if (!visible) {
    return null;
  }

  return (
    <BottomSheet
      visible={visible}
      title="Localização"
      onRequestClose={onCloseRequest}>
      <DismissKeyboad>
        <>
          <Input
            placeholder={placeholder}
            onChange={(value: string) => handleSearchPlace(value)}
          />
          <FlatList
            data={list}
            style={{flex: 1}}
            contentContainerStyle={{padding: 5}}
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({item}) => (
              <ListItem onPress={() => handleSelectItem(item)}>
                <Icon
                  name="map-marker-outline"
                  color={theme.colors.green}
                  size={24}
                />
                <Text.Paragraph
                  textWeight="light"
                  textColor="primary"
                  alignment="start">
                  {item.name}
                </Text.Paragraph>
              </ListItem>
            )}
            ListEmptyComponent={() => <Text alignment="center">Vazio</Text>}
          />
        </>
      </DismissKeyboad>
    </BottomSheet>
  );
};

const LocationPickerButton = ({
  value,
  title,
  error,
  ...rest
}: LocationPickerButtonProps) => {
  return (
    <Container>
      <Text.Paragraph textWeight="light">{title}</Text.Paragraph>
      <LocationButton hasError={!!error} {...rest}>
        <TextLimitter>
          <Text maxLines={1} textWeight="light">
            {value || 'Pressione para buscar...'}
          </Text>
        </TextLimitter>
        <Icon name="map-marker-outline" color="#808080" size={24} />
      </LocationButton>
      {error && (
        <Text textWeight="light" textColor="red">
          {error}
        </Text>
      )}
    </Container>
  );
};

LocationPickerInput.Button = LocationPickerButton;

export default LocationPickerInput;
