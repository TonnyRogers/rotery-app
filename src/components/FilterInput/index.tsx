import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';

import {getFeedFilteredRequest} from '../../store/modules/feed/actions';

import {
  Modal,
  KeyboardAvoidingView,
  Content,
  ModalHeader,
  Title,
  CloseButton,
  ModalContent,
  Actions,
  FilterButton,
  FilterButtonText,
} from './styles';
import DateInput from '../DateInput';
import LocationPickerInput from '../LocationPickerInput';
import {
  LocationPickerInputSetItem,
  TomTomApiResponse,
  ProfileLocationJson,
} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';

interface FilterInputProps {
  visible: boolean;
  onRequestClose(): void;
  onFiltered(filter: FilterReturnProps): void;
}

interface FilterReturnProps {
  begin: string;
  end: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

const FilterInput: React.FC<FilterInputProps> = ({
  visible,
  onRequestClose,
  onFiltered,
}) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [locationIsOpen, setLocationIsOpen] = useState(false);
  const locationJson = useRef<LocationPickerInputSetItem<TomTomApiResponse>>();

  function handleFilter() {
    let filter: FilterReturnProps = {
      begin: formatLocale(beginDate, 'YYYY-MM-DD'),
      end: formatLocale(endDate, 'YYYY-MM-DD'),
    };

    const jsonContent: ProfileLocationJson = {
      city: locationJson.current?.value.address.municipality,
      country: locationJson.current?.value.address.country,
      state: locationJson.current?.value.address.countrySubdivision,
    };

    if (locationJson.current) {
      filter.location = jsonContent;
    }

    dispatch(getFeedFilteredRequest(filter));
    onFiltered(filter);
    onRequestClose();
  }

  const handleSetLocation = (value: any) => {
    locationJson.current = value;
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Modal>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <SafeAreaView>
            <Content>
              <ModalHeader>
                <Title>Filtro</Title>
                <CloseButton onPress={onRequestClose}>
                  <Icon name="close" size={24} color="#3dc77b" />
                </CloseButton>
              </ModalHeader>
              <ModalContent>
                <DateInput
                  date={beginDate}
                  onChange={setBeginDate}
                  label="Inicio do Roteiro"
                />
                <DateInput
                  date={endDate}
                  onChange={setEndDate}
                  label="Fim do Roteiro"
                />
                <LocationPickerInput.Button
                  title="Localidade"
                  onPress={() => setLocationIsOpen(true)}
                  value={location}
                  error={undefined}
                />
                <Actions>
                  <FilterButton onPress={handleFilter}>
                    <FilterButtonText>Filtrar</FilterButtonText>
                  </FilterButton>
                </Actions>
              </ModalContent>
            </Content>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
      <LocationPickerInput
        nameFormatType="city"
        visible={locationIsOpen}
        placeholder="Digite a cidade para buscar"
        searchType="Geo"
        onSelectItem={(value: string) => setLocation(value)}
        onCloseRequest={() => setLocationIsOpen(false)}
        setLocationJson={(json) => handleSetLocation(json)}
      />
    </>
  );
};

export default FilterInput;
