import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, TextInput} from 'react-native';

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
}

const FilterInput: React.FC<FilterInputProps> = ({visible, onRequestClose}) => {
  const [location, setLocation] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const filterRef = useRef();
  const locationRef = useRef();
  return (
    <Container>
      <TextInput
        placeholder="clique aqui para pesquisar"
        value={filterValue}
        onChangeText={setFilterValue}
        ref={filterRef}
        onFocus={() => setFilterModalVisible(true)}
      />
      <Modal visible={visible} animationType="fade" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Content>
            <ModalHeader>
              <Title>Filtro</Title>
              <CloseButton onPress={() => onRequestClose()}>
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
                <FilterButton onPress={() => setFilterModalVisible(false)}>
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
