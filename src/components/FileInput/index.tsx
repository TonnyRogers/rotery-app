import React, {useState} from 'react';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modal, StatusBar} from 'react-native';

import api from '../../services/api';

import {
  Container,
  SelectFilesButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from './styles';
import Button from '../Button';
import Text from '../Text';
import {theme} from '../../utils/theme';

interface FileInputProps {
  onSelect(data: []): any;
}

const FileInput: React.FC<FileInputProps> = ({onSelect, children}) => {
  const [fileSourceModalVisible, setFileSourceModalVisible] = useState(false);

  const options: Options = {
    width: 300,
    height: 400,
    cropping: true,
    mediaType: 'photo',
    compressImageQuality: 0.8,
    cropperToolbarTitle: 'Editar Foto',
    loadingLabelText: 'Carregando',
    avoidEmptySpaceAroundImage: true,
    forceJpg: true,
    cropperActiveWidgetColor: theme.colors.green,
    cropperStatusBarColor: theme.colors.appBackground,
    cropperTintColor: theme.colors.green,
    cropperToolbarWidgetColor: theme.colors.primaryText,
    cropperToolbarColor: theme.colors.appBackground,
    cropperCancelText: 'Cancelar',
    cropperChooseText: 'Pronto',
    hideBottomControls: true,
  };

  const saveImage = async (data: Image) => {
    const image = {
      size: data.size,
      name: data.filename || `${Date.now()}.jpg`,
      type: data.mime,
      uri: data.path,
    };

    const formData = new FormData();

    let fileResponse;

    if (image.uri) {
      formData.append('file', image);

      fileResponse = await api.post('/files', formData);

      const {id} = fileResponse.data;

      fileResponse.data = [fileResponse.data];

      if (!id) {
        return;
      }
    }

    const images = fileResponse?.data;

    setFileSourceModalVisible(false);
    onSelect(images);
  };

  async function pickImage(type: 'camera' | 'library') {
    if (type === 'library') {
      ImagePicker.openPicker(options).then((data) => saveImage(data));
    } else {
      ImagePicker.openCamera(options).then((data) => saveImage(data));
    }
  }

  return (
    <>
      <Container>
        <SelectFilesButton onPress={() => setFileSourceModalVisible(true)}>
          {children}
        </SelectFilesButton>
      </Container>
      <Modal
        visible={fileSourceModalVisible}
        transparent
        onRequestClose={() => {}}>
        <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Text.Title alignment="start">Enviar foto:</Text.Title>
              <Button
                onPress={() => setFileSourceModalVisible(false)}
                bgColor="greenTransparent"
                sizeBorderRadius={32}>
                <Icon name="close" size={24} color="#3dc77b" />
              </Button>
            </ModalHeader>
            <Button
              onPress={() => pickImage('library')}
              bgColor="white"
              sizeMargin="0.5rem 0">
              <Text>Biblioteca</Text>
            </Button>
            <Button
              onPress={() => pickImage('camera')}
              bgColor="white"
              sizeMargin="0.5rem 0">
              <Text>Câmera</Text>
            </Button>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default FileInput;
