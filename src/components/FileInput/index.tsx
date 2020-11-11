import React from 'react';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

import {Container, SelectFilesButton} from './styles';

interface FileInputProps {
  onSelect(data: []): any;
}

const FileInput: React.FC<FileInputProps> = ({onSelect, children}) => {
  function pickImage() {
    const options = {
      title: 'Fotos',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        privateDirectory: true,
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      // console.tron.log('Response = ', response);

      if (response.didCancel) {
        // console.tron.log('User cancelled photo picker');
      } else if (response.error) {
        // console.tron.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.tron.log('User tapped custom button: ', response.customButton);
      } else {
        // console.tron.log('Response = ', response);

        const image = {
          size: response.fileSize,
          name: response.fileName,
          type: response.type,
          uri: response.uri,
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

        onSelect(images);
      }
    });
  }

  return (
    <Container>
      <SelectFilesButton onPress={pickImage}>{children}</SelectFilesButton>
    </Container>
  );
};

export default FileInput;
