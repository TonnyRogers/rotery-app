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
  ActivityList,
  Activity,
  ActivityName,
} from './styles';
import DateInput from '../DateInput';
import LocationPickerInput from '../LocationPickerInput';
import {
  LocationPickerInputSetItem,
  TomTomApiResponse,
  ProfileLocationJson,
  ItineraryActivityItemProps,
} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import Text from '../Text';
import RowGroup from '../RowGroup';
import Button from '../Button';

interface FilterInputProps {
  visible: boolean;
  activities: ItineraryActivityItemProps[];
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
  activities,
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

  function clearFilters() {
    setLocation('');
    setBeginDate(new Date());
    setEndDate(new Date());
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
                <Text.Paragraph>Atividades</Text.Paragraph>
                <ActivityList>
                  {activities.map((item, index) => (
                    <Activity key={index}>
                      <Icon name="menu" size={24} color="#FFF" />
                      <ActivityName>{item.activity.name}</ActivityName>
                    </Activity>
                  ))}
                </ActivityList>
              </ModalContent>
              <Actions>
                <RowGroup>
                  <Button
                    onPress={handleFilter}
                    textColor="white"
                    bgColor="blue"
                    cornerRadius={{
                      bottomL: 12,
                      bottomR: 12,
                      topL: 0,
                      topR: 12,
                    }}>
                    Filtrar
                  </Button>
                  <Button
                    onPress={clearFilters}
                    textColor="white"
                    bgColor="green"
                    cornerRadius={{
                      bottomL: 12,
                      bottomR: 12,
                      topL: 12,
                      topR: 0,
                    }}>
                    Limpar
                  </Button>
                </RowGroup>
              </Actions>
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
