/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {FlatList, TouchableOpacityProps, Keyboard, View} from 'react-native';

import {
  Container,
  ListItem,
  LocationButton,
  TextLimitter,
  RowGroup,
} from './styles';
import Text from '../Text';
import Input from '../Input';
import tomtomApi from '../../services/tomtomApi';
import {TomTomResult, PlacesSearchGeo} from '../../utils/types';
import DismissKeyboad from '../DismissKeyboad';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../utils/theme';
import BottomSheet from '../BottomSheet';
import Button from '../Button';
import Toast from 'react-native-toast-message';

type searchTypes = 'Addr' | 'Geo' | 'Str' | 'PAD' | 'POI';

type nameFormatTypesOptions = 'city' | 'general';
interface LocationPickerInputProps {
  placeholder: string;
  visible: boolean;
  responseLimit?: string;
  searchType?: searchTypes;
  nameFormatType: nameFormatTypesOptions;
  onCloseRequest: () => void;
  onSelectItem: (value: any) => void;
  setLocationJson: (json: any) => void;
}

interface LocationPickerButtonProps extends TouchableOpacityProps {
  value?: string;
  title: string;
  error?: string;
}

const formatLocationName = (item: any, type: nameFormatTypesOptions) => {
  if (type === 'city') {
    return `${item.address?.municipality}, ${
      item.address?.countrySubdivision || ''
    } - ${item.address?.country} `;
  } else {
    return `${'poi' in item ? `${item.poi.name}: ` : ''} ${
      item.address?.freeformAddress
    }, ${item.address?.countrySubdivision || ''} - ${item.address?.country} `;
  }
};

const LocationPickerInput = ({
  visible,
  placeholder,
  onCloseRequest,
  onSelectItem,
  setLocationJson,
  searchType,
  responseLimit,
  nameFormatType,
}: LocationPickerInputProps) => {
  const [list, setList] = useState<any>(null);
  const [location, setLocation] = useState<string>('');

  const handleSearchPlace = useCallback(async () => {
    Keyboard.dismiss();
    if (location.length > 3) {
      try {
        const response = await tomtomApi.get<TomTomResult<PlacesSearchGeo>>(
          `${location}.json`,
          {
            params: {
              key: 'xA6NMpC44OEmVh7sAVimkWd08NTU7ACs',
              limit: responseLimit || '5',
              language: 'pt-BR',
              idxSet: searchType || undefined,
            },
          },
        );

        const formated = response.data.results.map((item, index) => ({
          id: index,
          name: formatLocationName(item, nameFormatType),
          value: item,
        }));

        if (formated) {
          setList(formated);
        }
      } catch (error) {
        Toast.show({
          text1: 'Erro ao buscar localização.',
          text2: error.message,
          position: 'bottom',
          type: 'error',
        });
      }
    }
  }, [location, nameFormatType, responseLimit, searchType]);

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
          <RowGroup>
            <View
              style={{
                flex: 1,
              }}>
              <Input
                placeholder={placeholder}
                onChange={(value: string) => setLocation(value)}
              />
            </View>
            <View>
              <Button bgColor="green" onPress={() => handleSearchPlace()}>
                <Icon name="magnify" color="#FFF" size={24} />
              </Button>
            </View>
          </RowGroup>
          <FlatList
            data={list}
            style={{flex: 1, padding: 5}}
            contentContainerStyle={{
              padding: 5,
            }}
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({item}) => (
              <ListItem onPress={() => handleSelectItem(item)}>
                <Icon
                  name="map-marker-outline"
                  color={theme.colors.green}
                  size={24}
                />
                <Text.Paragraph
                  maxLines={2}
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
            {value || 'Pressione para buscar um lugar...'}
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
