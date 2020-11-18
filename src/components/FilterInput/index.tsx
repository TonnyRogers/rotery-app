import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {format} from 'date-fns';

import {getFeedFilteredRequest} from '../../store/modules/feed/actions';

import {
  Container,
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
import Input from '../Input';

interface FilterInputProps {
  visible: boolean;
  onRequestClose(): any;
  onFiltered(begin: string, end: string): void;
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
  const locationRef = useRef();

  function handleFilter() {
    const filter = {
      begin: format(beginDate, 'yyyy-MM-dd'),
      end: format(endDate, 'yyyy-MM-dd'),
    };

    dispatch(getFeedFilteredRequest(filter));
    onFiltered(filter.begin, filter.end);
    onRequestClose();
  }

  return (
    <Container>
      <Modal visible={visible} animationType="fade" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              <Input
                value={location}
                onChange={setLocation}
                ref={locationRef}
                label="Localidade"
              />
              <Actions>
                <FilterButton onPress={handleFilter}>
                  <FilterButtonText>Filtrar</FilterButtonText>
                </FilterButton>
              </Actions>
            </ModalContent>
          </Content>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};

export default FilterInput;
