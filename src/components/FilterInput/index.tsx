import React, {ReactElement} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

import {
  Modal,
  KeyboardAvoidingView,
  Content,
  ModalHeader,
  CloseButton,
  ModalContent,
  Actions,
} from './styles';
import Text from '../Text';
import RowGroup from '../RowGroup';
import Button from '../Button';

interface FilterInputProps {
  visible: boolean;
  onRequestClose(): void;
  onFilter(): void;
  onClear(): void;
  children: ReactElement;
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

function FilterInput({
  visible,
  onRequestClose,
  onFilter,
  children,
  onClear,
}: FilterInputProps) {
  function handleFilter() {
    onFilter();
    onRequestClose();
  }

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
                <Text.Title>Filtro</Text.Title>
                <CloseButton onPress={onRequestClose}>
                  <Icon name="close" size={24} color="#3dc77b" />
                </CloseButton>
              </ModalHeader>
              <ModalContent>{children}</ModalContent>
              <Actions>
                <RowGroup justify="flex-end">
                  <Button
                    onPress={onClear}
                    sizeMargin="0 1.6rem 0 0"
                    textColor="white"
                    bgColor="green">
                    Limpar
                  </Button>
                  <Button
                    onPress={() => handleFilter()}
                    textColor="white"
                    bgColor="blue">
                    Filtrar
                  </Button>
                </RowGroup>
              </Actions>
            </Content>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

export default FilterInput;
