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
                <RowGroup>
                  <Button
                    onPress={onClear}
                    textColor="white"
                    bgColor="green"
                    cornerRadius={{
                      bottomL: 12,
                      bottomR: 12,
                      topL: 0,
                      topR: 12,
                    }}>
                    Limpar
                  </Button>
                  <Button
                    onPress={() => handleFilter()}
                    textColor="white"
                    bgColor="blue"
                    cornerRadius={{
                      bottomL: 12,
                      bottomR: 12,
                      topL: 12,
                      topR: 0,
                    }}>
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
